<template>
  <!-- 钱包信息列表，每个钱包以卡片形式列出 -->
  <v-row>

    <v-col cols="3">
      <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="routeTo('/create-wallet')">
        创建钱包
      </v-btn>
    </v-col>
    <v-col cols="3">
      <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="routeTo('/bond-wallet')">
        绑定钱包
      </v-btn>
    </v-col>
    <v-col cols="3">
      <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="routeTo('/trade')">
        交易
      </v-btn>
    </v-col>
    <v-col cols="3">
      <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="refresh()">
        刷新钱包
      </v-btn>
    </v-col>
  </v-row>

  <div v-if="state !== 'success'" style="display: block; text-align: center;" class="mt-10">
    <CircleWithLoadingAndResult :show="false" :state="state"/>
    <CardWithMonoText v-if="state === 'error'" title="错误" :text="error" />
  </div>

  <v-row v-if="state === 'success'">
    <v-col cols="12" md="6" v-for="wallet in wallets" :key="wallet.id">
      <v-card class="my-0" variant="outlined">
        <v-card-title>
          <v-row justify="center" align="center">
            <v-card-title class="text-h4 my-4">{{ wallet.balance }} ET</v-card-title>
            <v-spacer></v-spacer>
            <v-btn :icon="wallet.show ? 'mdi-eye' : 'mdi-eye-off'" class="center-content me-2"
              variant="text" density="compact" @click="wallet.show = wallet.show ^ 1"></v-btn>
            <v-btn icon="mdi-close" class="center-content me-2" variant="text" density="compact"></v-btn>
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
  get_wallets().then(_ => {
    state.value = "success";
  }).catch(err => {
    state.value = "error";
    error.value = err.response.data.msg;
  });
}

async function get_wallets() {
  await get_addresses();
  await get_balances();
}

async function get_addresses() {
  return await axios.get('/user/get-wallets').then(res => {
    let now = 0;
    wallets.value = res.data.addresses.map(address => {
      now = now + 1;
      return {
        id: now,
        address: address,
        show: false,
        balance: "?"
      };
    });
  });
}

async function get_balances() {
  let addresses = wallets.value.map(wallet => wallet.address);
  await axios.post('/wallet/balance', {
    addresses: addresses,
  }).then(res => {
    for(let i = 0; i < addresses.length; i++) {
      wallets.value[i].balance = res.data.balance[i];
    }
  });
}

function toggleShowAddress(walletId) {
  // 切换是否显示全部地址的状态
  showFullAddress.value[walletId] = !showFullAddress.value[walletId];
}

function deleteWallet(walletId) {
  // 在此处添加删除钱包的逻辑
  // 可以根据 walletId 执行删除操作
}

function routeTo(url) {
  router.push(url);
}
</script>