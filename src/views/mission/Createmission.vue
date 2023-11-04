<template>
  <v-container class="center-content">
    <v-card width="700px" variant="outlined">
      <v-stepper alt-labels v-model="step" :items="['创建任务', '任务信息', '签名', '输入公钥', '完成']" hide-actions
        style="box-shadow: none; background-color: transparent;">
        <!-- 页面一 -->
        <template v-slot:item.1>
          <p class="text-h6">开始创建任务，流程如下：</p>
          <v-timeline side="end" class="mt-4">
            <v-timeline-item>
              <v-alert>用户输入任务名称、任务内容、酬金</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>客户端对用户的输入信息进行哈希，同时用户选择钱包，表示任务放在该钱包名下</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>展示任务信息，用户输入私钥进行签名</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>用户输入公钥</v-alert>
            </v-timeline-item>
          </v-timeline>
        </template>

        <template v-slot:item.2>
          <p class="text-h6">任务名称</p>
          <v-text-field v-model="title" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <p class="text-h6">任务内容</p>
          <v-textarea v-model="text" variant="outlined" class="mt-4 text-mono" auto-grow></v-textarea>
          <p class="text-h6">酬金</p>
          <v-text-field v-model="amount" prefix="ET" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <p class="text-h6">选择钱包</p>
          <v-select v-model="address" :items="addresses" variant="outlined" class="mt-4 text-mono"
            autocomplete="off"></v-select>
          <v-btn @click="nonceStep(); step += 1;" class="mt-4 mb-4" variant="tonal" block>下一步</v-btn>
        </template>

        <template v-slot:item.3>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">

              <div v-if="nonceState === 'success'">
                <v-card variant="outlined" class="my-4 text-mono text-left">
                  <v-card-title class="mb-3 mt-1 ms-0 me-1">任务详情</v-card-title>
                  <v-card-item>任务所在钱包地址：{{ address }}</v-card-item>
                  <v-card-item>任务序号：{{ nonce }}</v-card-item>
                  <v-card-item>任务内容：{{ content }}</v-card-item>
                  <v-card-item>任务哈希：{{ hash }}</v-card-item>
                </v-card>
                <v-alert class="my-4 text-left" type="warning">请仔细核对任务信息！</v-alert>
                <p class="text-h6 text-left">私钥</p>
                <v-text-field v-model="privateKey" variant="outlined" class="mt-4 text-mono"></v-text-field>
                <v-btn @click="sign(); step += 1" class="mt-4 mb-4" variant="tonal" block>签名</v-btn>

              </div>

              <NonceErrorCard :state="nonceState" :error="nonceError"></NonceErrorCard>
              <v-row justify="center" align="center" class="mt-8 mb-4" v-if="nonceState === 'error'">
                <v-col cols="6" class="text-center">
                  <v-btn @click="step -= 1;" variant="tonal" block>上一步</v-btn>
                </v-col>
                <v-col cols="6" class="text-center">
                  <v-btn @click="routeTo('/mission');" variant="tonal" block>取消</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.4>
          <p class="text-h6">公钥</p>
          <v-text-field v-model="publicKey" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-btn @click="uploadStep(); step += 1" class="mt-4 mb-4" variant="tonal" block>创建任务</v-btn>
        </template>

        <template v-slot:item.5>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">
              <CircleWithLoadingAndResult :state="uploadState" title="正在工作" />

              <CardWithMonoText v-if="uploadState === 'error'" title="错误" :text="uploadError" />

              <v-card variant="outlined" class="my-4 text-mono text-left">
                <v-card-title class="mb-3 mt-1 ms-0 me-1">任务详情</v-card-title>
                <v-card-item>任务所在钱包地址：{{ address }}</v-card-item>
                <v-card-item>任务序号：{{ nonce }}</v-card-item>
                <v-card-item>任务内容：{{ content }}</v-card-item>
                <v-card-item>任务哈希：{{ hash }}</v-card-item>
                <v-card-item>签名：{{ sig }}</v-card-item>
                <v-card-item>公钥：{{ publicKey }}</v-card-item>
              </v-card>

              <v-btn v-if="uploadState !== 'loading'" @click="routeTo('/mission')" class="mt-8 mb-4" variant="tonal" block>关闭</v-btn>
            </v-col>
          </v-row>
        </template>

        <v-stepper-actions @click:prev="step -= 1" @click:next="step += 1" v-if="step < 2" />
      </v-stepper>
    </v-card>
  </v-container>
</template>
      
<script setup>

import NonceErrorCard from "../../components/NonceErrorCard.vue";
import CardWithMonoText from '../../components/CardWithMonoText.vue';
import CircleWithLoadingAndResult from '../../components/CircleWithLoadingAndResult.vue';

import { getCurrentInstance, onMounted, onBeforeMount, ref } from "vue";
import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块

import { get_addresses, upload_task, get_task_nonce } from '../../function/http.js';
import { sha256Hash, toByteArray, getBlake2Hash, signSecp256k1, uint8ArrayToHexString } from '../../function/utils.js';


const router = vueRouter.useRouter(); // 获取 Vue Router 实例
var axios = null;

const step = ref(1);
const addresses = ref([]);

const title = ref("");
const text = ref("");
const amount = ref(0);

const address = ref("");
const nonce = ref(-1);
const content = ref("");
const hash = ref("");

const privateKey = ref("");
const publicKey = ref("");
const sig = ref("");

const nonceState = ref("loading");
const nonceError = ref("");

const uploadState = ref("loading");
const uploadError = ref("");

onMounted(() => {
  axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;

  get_addresses(axios, data => {
    addresses.value = data.addresses;
  }, msg => {
    console.error(msg);
  });
});

function routeTo(url) {
  router.push(url);
}

function sign() {
  const bytes = toByteArray([address.value, nonce.value, hash.value]);
  const signHash = getBlake2Hash(bytes);
  const sigBytes = signSecp256k1(signHash, privateKey.value);
  sig.value = uint8ArrayToHexString(sigBytes);
}

function nonceStep() {
  nonceState.value = "loading";

  const _content = {
    version: "1.0",
    title: title.value,
    text: text.value,
    amount: amount.value
  };

  content.value = JSON.stringify(_content);
  hash.value = sha256Hash(content.value);

  get_task_nonce(axios, address.value, data => {
    nonceState.value = "success";
    nonce.value = data.nonce + 1;
  }, msg => {
    nonceState.value = "error";
    nonceError.value = msg;
  });
}


function uploadStep() {
  uploadState.value = "loading";
  upload_task(axios, address.value, nonce.value, content.value, hash.value, sig.value, publicKey.value, data => {
    uploadState.value = "success";
  }, msg => {
    uploadState.value = "error";
    uploadState.value = msg;
  })
}
</script>