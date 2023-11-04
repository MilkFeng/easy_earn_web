<template>
  <v-container class="center-content">
    <v-card width="700px" variant="outlined">
      <v-stepper alt-labels v-model="step" :items="['开始创建钱包', '生成密钥对', '完成']" hide-actions
        style="box-shadow: none; background-color: transparent;">
        <!-- 页面一 -->
        <template v-slot:item.1>
          <p class="text-h6">开始创建钱包，流程如下：</p>
          <v-timeline side="end" class="mt-4">
            <v-timeline-item>
              <v-alert>客户端生成密钥对（公钥和私钥）</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>客户端向服务端发送创建钱包的请求，并将公钥一并上传给服务端</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>服务端与RChain区块链交互，在区块链中创建您的钱包，最后将钱包地址返回客户端并显示</v-alert>
            </v-timeline-item>
          </v-timeline>
          <v-alert class="my-4" type="warning">密钥对（公钥和私钥）是进行代币交易的基础，我们不会保存您的密钥，页面刷新后所有信息将被重置。请保管好您的密钥，不要随意传播给他人！</v-alert>
        </template>

        <!-- 页面二 -->
        <template v-slot:item.2>
          <p class="text-h6">

            <v-row class="mt-1 ms-1 me-1">
              <p>生成密钥对</p>
              <v-spacer></v-spacer>
              <v-btn icon="mdi-refresh" class="center-content" variant="text" density="compact" @click="generateKey()"></v-btn>
            </v-row>
          </p>

          <v-container>
            <CardWithMonoText title="私钥" :text="key.privateKey" />
            <CardWithMonoText title="公钥" :text="key.publicKey" />
          </v-container>
          <v-btn @click="create(); step += 1" variant="tonal" block>创建</v-btn>
        </template>


        <!-- 页面三 -->
        <template v-slot:item.3>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">

              <CircleWithLoadingAndResult :state="state"/>

              <CardWithMonoText v-if="state === 'success'" title="私钥" :text="key.privateKey" />
              <CardWithMonoText v-if="state === 'success'" title="公钥" :text="key.publicKey" />
              <CardWithMonoText v-if="state === 'success'" title="钱包地址" :text="address" />
              <CardWithMonoText v-if="state === 'error'" title="错误" :text="error" />

            </v-col>
          </v-row>
          <v-row v-if="state !== 'loading'" justify="center" align="center" class="mt-8 mb-4">
            <v-col cols="6" class="text-center">
              <v-btn @click="routeTo({ path: '/wallet/bond', query: { address: address } })" variant="tonal" block>绑定钱包</v-btn>
            </v-col>
            <v-col cols="6" class="text-center">
              <v-btn @click="routeTo('/wallet')" variant="tonal" block>关闭</v-btn>
            </v-col>
          </v-row>
        </template>

        <v-stepper-actions @click:prev="step -= 1" @click:next="step += 1" v-if="step < 2" />
      </v-stepper>
    </v-card>
  </v-container>
</template>

<script setup>
import CardWithMonoText from '../../components/CardWithMonoText.vue';
import CircleWithLoadingAndResult from '../../components/CircleWithLoadingAndResult.vue'

import { getCurrentInstance, onMounted, onBeforeMount, ref } from "vue";
import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块

import { create_wallet } from '../../function/http.js';

import { ec } from 'elliptic';

const router = vueRouter.useRouter(); // 获取 Vue Router 实例
var axios = null;

const step = ref(1);
const key = ref({privateKey: "", publicKey: ""});
const address = ref("");
const state = ref("loading");
const error = ref("");

onMounted(() => {
  axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
  generateKey();
});

const create = () => {
  state.value = "loading";
  create_wallet(axios, key.value.publicKey, data => {
    address.value = data.address;
    state.value = "success";
  }, msg => {
    state.value = "error";
    error.value = msg;
  });
};

const generateKey = () => {
  const secp256k1 = new ec('secp256k1');
  const keyPair = secp256k1.genKeyPair();

  // 获取公钥和私钥，编码为十六进制字符串
  const publicKey = keyPair.getPublic('hex');
  const privateKey = keyPair.getPrivate('hex');

  key.value = {privateKey, publicKey};
};

const routeTo = (to) => {
  router.push(to);
};
</script>