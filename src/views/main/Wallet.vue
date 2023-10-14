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
      <v-btn class="mb-4 text-center" variant="tonal" block size="large">
        刷新钱包
      </v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="6" v-for="wallet in wallets" :key="wallet.id">
      <v-card class="my-0" :class="getCardClass(wallet.id)" variant="outlined">
        <v-card-title>
          <v-row justify="center" align="center">
            <v-card-title class="text-h4 my-4">{{ wallet.balance }}</v-card-title>
            <v-spacer></v-spacer>
            <v-btn v-if="showFullAddress[wallet.id]" icon="mdi-content-copy" class="center-content me-2" variant="text"
              density="comfortable" size="small"></v-btn>
            <v-btn :icon="showFullAddress[wallet.id] ? 'mdi-eye' : 'mdi-eye-off'" class="center-content me-2"
              variant="text" density="compact" @click="toggleShowAddress(wallet.id)"></v-btn>
            <v-btn icon="mdi-close" class="center-content me-2" variant="text" density="compact"></v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <!-- 钱包信息内容 -->
          <p class="text-mono">
            <span v-if="showFullAddress[wallet.id]">{{ formateAddress(wallet.address) }}</span>
            <span v-else>{{ '******** '.repeat(6) + wallet.address.slice(-6) }}</span>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
  
<script setup>

import { getCurrentInstance, onMounted, ref } from "vue";

const wallets = [
  {
    id: 1,
    name: "钱包名称1",
    address: "11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c",
    balance: "100 ET",
    visible: false,
  }
];

for (var i = 1; i <= 5; ++i) {
  wallets.push(...wallets);
}

const showFullAddress = ref({});
const accountBalance = ref(1000);
const isBellHovered = ref(false);
const user = {
  username: "jsoet",
};
const dialogVisible = ref(false);
const activeNames = ref([]);

const router = ref(null);

onMounted(() => {
  router.value = getCurrentInstance().proxy.$router;
});

function toggleShowAddress(walletId) {
  // 切换是否显示全部地址的状态
  showFullAddress.value[walletId] = !showFullAddress.value[walletId];
}

function getCardClass(walletId) {
  // 根据钱包的id生成不同的底色类
  const colors = ["blue-grey lighten-1", "grey lighten-1", "deep-purple lighten-1"];
  return colors[walletId % colors.length];
}

function deleteWallet(walletId) {
  // 在此处添加删除钱包的逻辑
  // 可以根据 walletId 执行删除操作
}

function formateAddress(address) {
  // return address.replace(/(.{8})/g, '$1 ').trim();
  return address.replace(' ', '');
}

function routeTo(url) {
  console.log(router.value)
  router.value.push(url);
}
</script>