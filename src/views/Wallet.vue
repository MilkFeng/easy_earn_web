<template>
  <v-app>
    <!-- 应用程序栏，背景颜色设置为灰黑色 -->
    <v-app-bar app class="ps-8 pe-8">

      <v-btn rounded variant="text" @click="routeTo('/mainwindow')">主页</v-btn>

      <!-- 账户余额 -->
      <v-spacer></v-spacer>

      <!-- 导航到钱包页面的图标按钮 -->
    </v-app-bar>

    <!-- 主要内容区域 -->
    <v-main>

      <!-- 钱包信息列表，每个钱包以卡片形式列出 -->
      <v-container>
        <v-row>

          <v-col cols="4">
            <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="routeTo('/create-wallet')">
              创建钱包
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="routeTo('/bond-wallet')">
              绑定钱包
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn class="mb-4 text-center" variant="tonal" block size="large">
              刷新钱包
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" v-for="wallet in wallets" :key="wallet.id">
            <v-card class="my-0" :class="getCardClass(wallet.id)" variant="outlined">
              <v-card-title>
                <v-row justify="center" align="center">
                  <v-card-title class="text-h4 my-4">{{ wallet.balance }}</v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn v-if="showFullAddress[wallet.id]" icon="mdi-content-copy" class="center-content me-2" variant="text" density="comfortable"
                    size="small"></v-btn>
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
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>
export default {
  data() {
    return {
      wallets: [
        {
          id: 1,
          name: "钱包名称1",
          address: "11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c",
          balance: "$ 100",
          visible: false,
        }, {
          id: 2,
          name: "钱包名称1",
          address: "11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c",
          balance: "$ 100",
          visible: false,
        }, {
          id: 3,
          name: "钱包名称1",
          address: "11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c",
          balance: "$ 100",
          visible: false,
        }, {
          id: 4,
          name: "钱包名称1",
          address: "11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c",
          balance: "$ 100",
          visible: false,
        }, {
          id: 5,
          name: "钱包名称1",
          address: "11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c",
          balance: "$ 100",
          visible: false,
        }, {
          id: 6,
          name: "钱包名称1",
          address: "11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c",
          balance: "$ 100",
          visible: false,
        },
        {
          id: 7,
          name: "钱包名称2",
          address: "11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c",
          balance: "$ 200",
          visible: false,
        },
        // 可以添加更多钱包数据
      ],
      showFullAddress: {}, // 记录是否显示全部地址的状态
      accountBalance: 1000, // 账户余额
      isBellHovered: false, // 铃铛图标悬停状态
      user: {
        username: "jsoet",
      },
      dialogVisible: false,
    };
  },
  methods: {
    toggleShowAddress(walletId) {
      // 切换是否显示全部地址的状态
      this.showFullAddress[walletId] = !this.showFullAddress[walletId];
    },
    getCardClass(walletId) {
      // 根据钱包的id生成不同的底色类
      const colors = ["blue-grey lighten-1", "grey lighten-1", "deep-purple lighten-1"];
      return colors[walletId % colors.length];
    },
    deleteWallet(walletId) {
      // 在此处添加删除钱包的逻辑
      // 可以根据 walletId 执行删除操作
    },
    formateAddress(address) {
      return address.replace(/(.{8})/g, '$1 ').trim();
    },
    routeTo(url) {
      this.$router.push(url);
    },

  },
}
</script>

<style scoped>
.rounded-btn {
  border-radius: 30px;
  /* 调整按钮为圆角 */
}
</style>