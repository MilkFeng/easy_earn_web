<template>
  <!-- 钱包信息列表，每个钱包以卡片形式列出 -->
  <v-row>

    <v-col cols="3">
      <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="routeTo('/create-wallet')">创建钱包</v-btn>
    </v-col>
    <v-col cols="3">
      <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="routeTo('/bond-wallet')">绑定钱包</v-btn>
    </v-col>
    <v-col cols="3">
      <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="routeTo('/trade')">交易</v-btn>
    </v-col>
    <v-col cols="3">
      <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="refresh()"
        :loading="state === 'loading'">刷新钱包</v-btn>
    </v-col>
  </v-row>

  <div v-if="state !== 'success'" style="display: block; text-align: center;" class="mt-10">
    <CircleWithLoadingAndResult :show="false" :state="state" />
    <CardWithMonoText v-if="state === 'error'" title="错误" :text="error" />
  </div>

  <v-row v-if="state === 'success'">
    <v-col cols="12" md="6" v-for="wallet in wallets" :key="wallet.id">
      <v-card class="my-0" variant="outlined">
        <v-card-title>
          <v-row justify="center" align="center">
            <v-card-title class="text-h4 my-4">{{ wallet.show ? wallet.balance : "**" }} ET</v-card-title>
            <v-spacer></v-spacer>
            <v-btn :icon="wallet.show ? 'mdi-eye' : 'mdi-eye-off'" class="center-content me-2" variant="text"
              density="compact" @click="wallet.show = wallet.show ^ 1"></v-btn>
            <v-btn icon="mdi-close" class="center-content me-2" variant="text" density="compact"
              @click="deleteWallet(wallet.id)"></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <!-- 钱包信息内容 -->
          <p class="text-mono">
            <span v-if="wallet.show">{{ wallet.address }}</span>
            <span v-else>{{ '*'.repeat(wallet.address.length - 6) + wallet.address.slice(-6) }}</span>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
  
<script setup>

import CircleWithLoadingAndResult from '../../components/CircleWithLoadingAndResult.vue'
import CardWithMonoText from '../../components/CardWithMonoText.vue';


import { getCurrentInstance, onMounted, ref } from "vue";
import { useAuth } from '@websanova/vue-auth/src/v3.js';
import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块

import { get_wallets, delete_wallet } from '../../function/http.js';


var axios = null;
const auth = useAuth();
const router = vueRouter.useRouter(); // 获取 Vue Router 实例

const wallets = ref([]);
const state = ref("loading");
const error = ref("");

onMounted(() => {
  axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
  refresh();
});

function refresh() {
  state.value = "loading";
  get_wallets(axios, data => {
    wallets.value = data.wallets;
    state.value = "success";
  }, msg => {
    state.value = "error";
    error.value = msg;
  });
}

function deleteWallet(id) {
  if(confirm("确定要删除吗？")) {
    delete_wallet(axios, wallets.value[id].address, data => {
      refresh();
    }, msg => {
      console.error(msg);
    });
  }
}

function routeTo(url) {
  router.push(url);
}
</script>