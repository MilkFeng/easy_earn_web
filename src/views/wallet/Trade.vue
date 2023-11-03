<template>
  <v-container class="center-content">
    <v-card width="700px" variant="outlined">
      <v-stepper alt-labels v-model="step" :items="['交易', '交易双方地址及金额', '签名', '输入公钥', '完成']" hide-actions
        style="box-shadow: none; background-color: transparent;">
        <!-- 页面一 -->
        <template v-slot:item.1>
          <p class="text-h6">开始进行交易，流程如下：</p>
          <v-timeline side="end" class="mt-4">
            <v-timeline-item>
              <v-alert>客户端中用户选择转出钱包地址，输入转入钱包地址和金额。</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>客户端向服务端获取交易序号</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>用户输入私钥对交易双方地址、交易金额、交易序号进行签名</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>用户输入公钥，向服务端发送交易请求，同时将双方钱包地址、金额、交易序号、公钥、签名传给服务端。最终将结果返回给客户端</v-alert>
            </v-timeline-item>
          </v-timeline>
        </template>

        <template v-slot:item.2>
          <p class="text-h6">转出钱包地址</p>
          <v-select :items="addresses" v-model="from" variant="outlined" class="mt-4 text-mono"
            autocomplete="off"></v-select>
          <p class="text-h6">转入钱包地址</p>
          <v-combobox :items="addresses" v-model="to" variant="outlined" class="mt-4 text-mono"></v-combobox>
          <p class="text-h6">金额</p>
          <v-text-field v-model="amount" prefix="ET" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-btn @click="nonceStep(); step += 1;" class="mt-8 mb-4" variant="tonal" block>下一步</v-btn>
        </template>

        <template v-slot:item.3>

          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">

              <div v-if="nonceState === 'success'">
                <v-card variant="outlined" class="my-4 text-mono text-left">
                  <v-card-title class="mb-3 mt-1 ms-0 me-1">交易详情</v-card-title>
                  <v-card-item>交易序号：{{ nonce }}</v-card-item>
                  <v-card-item>转出钱包地址：{{ from }}</v-card-item>
                  <v-card-item>转入钱包地址：{{ to }}</v-card-item>
                  <v-card-item>交易金额：{{ amount }}</v-card-item>
                </v-card>
                <v-alert class="my-4 text-left" type="warning">请仔细核对交易信息！</v-alert>
                <p class="text-h6 text-left">私钥</p>
                <v-text-field v-model="privateKey" variant="outlined" class="mt-4 text-mono text-left"></v-text-field>
                <v-btn @click="sign(); step += 1" class="mt-4 mb-4" variant="tonal" block>签名</v-btn>
              </div>

              <div v-if="nonceState !== 'success'">
                <CircleWithLoadingAndResult :state="nonceState" />
                <CardWithMonoText v-if="nonceState === 'error'" title="错误" :text="nonceError" />

                <v-row justify="center" align="center" class="mt-8 mb-4" v-if="nonceState === 'error'">
                  <v-col cols="6" class="text-center">
                    <v-btn @click="step -= 1" variant="tonal" block>上一步</v-btn>
                  </v-col>
                  <v-col cols="6" class="text-center">
                    <v-btn @click="routeTo('/wallet')" variant="tonal" block>取消</v-btn>
                  </v-col>
                </v-row>

              </div>

            </v-col>
          </v-row>

        </template>

        <template v-slot:item.4>
          <p class="text-h6">公钥</p>
          <v-text-field v-model="publicKey" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-btn @click="transferStep(); step += 1" class="mt-4 mb-4" variant="tonal" block>启动交易</v-btn>
        </template>

        <template v-slot:item.5>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">
              <CircleWithLoadingAndResult :state="transferState" />

              <CardWithMonoText v-if="transferState === 'error'" title="错误" :text="transferError" />

              <v-card variant="outlined" class="my-4 text-mono text-left">
                <v-card-title class="mb-3 mt-1 ms-0 me-1">交易详情</v-card-title>
                <v-card-item>交易序号：{{ nonce }}</v-card-item>
                <v-card-item>转出钱包地址：{{ from }}</v-card-item>
                <v-card-item>转入钱包地址：{{ to }}</v-card-item>
                <v-card-item>交易金额：{{ amount }}</v-card-item>
                <v-card-item>签名信息：{{ sig }}</v-card-item>
                <v-card-item>公钥：{{ publicKey }}</v-card-item>
              </v-card>

              <v-btn v-if="transferState !== 'loading'" @click="routeTo('/wallet')" class="mt-8 mb-4" variant="tonal" block>关闭</v-btn>
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

import { get_addresses, get_nonce, transfer } from '../../function/http.js';
import { toByteArray, getBlake2Hash, signSecp256k1, uint8ArrayToHexString } from '../../function/utils.js';

const router = vueRouter.useRouter(); // 获取 Vue Router 实例
var axios = null;

const step = ref(1);
const addresses = ref([]);
const from = ref("");
const to = ref("");
const amount = ref(0);
const nonce = ref(-1);
const sig = ref("");
const privateKey = ref("");
const publicKey = ref("");

const nonceState = ref("loading");
const nonceError = ref("");

const transferState = ref("loading");
const transferError = ref("");

onMounted(() => {
  axios = getCurrentInstance()?.appContext.config.globalProperties.axios;
  get_addresses(axios, data => {
    addresses.value = data.addresses;
  }, msg => {});
});

function nonceStep() {
  nonceState.value = "loading";
  get_nonce(axios, from.value, data => {
    nonceState.value = "success";
    nonce.value = data.nonce + 1;
  }, msg => {
    nonceState.value = "error";
    nonceError.value = msg;
  });
}

function transferStep() {
  transferState.value = "loading";
  transfer(axios, parseInt(nonce.value), from.value, to.value, parseInt(amount.value), publicKey.value, sig.value,
    data => {
      transferState.value = "success";
    }, msg => {
      transferState.value = "error";
      transferError.value = msg;
    }
  );
}

function sign() {
  const bytes = toByteArray([from.value, to.value, parseInt(nonce.value), parseInt(amount.value)]);
  const hash = getBlake2Hash(bytes);
  const sigBytes = signSecp256k1(hash, privateKey.value);
  sig.value = uint8ArrayToHexString(sigBytes);
}

function routeTo(url) {
  router.push(url);
}

</script>