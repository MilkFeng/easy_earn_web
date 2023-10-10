<template>
  <v-container class="center-content">
    <v-stepper alt-labels v-model="step" :items="items" width="700px">
      <!-- 页面一 -->
      <template v-slot:item.1>
        <v-text-area class="text-h6">开始创建钱包，流程如下：</v-text-area>
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
        <v-text-area class="text-h6">

          <v-row class="mt-1 ms-1 me-1">
            <v-text-area>生成密钥对</v-text-area>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-refresh" class="center-content" variant="text" density="compact"></v-btn>
          </v-row>
        </v-text-area>

        <v-container>

          <v-card variant="outlined" class="my-4 text-mono">
            <v-card-title class="mb-3">
              <v-row class="mt-1 ms-0 me-1">
                <v-text-area>私钥</v-text-area>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-content-copy" class="center-content" variant="text" density="comfortable"
                  size="small"></v-btn>
              </v-row>
            </v-card-title>
            <v-card-text>
              3d05b1e8cf4f3237c56176a626f2cb32d7b1c47ded625dcf7840c01b0f9ed050
            </v-card-text>
          </v-card>

          <v-card variant="outlined" class="my-4 text-mono">
            <v-card-title class="mb-3">
              <v-row class="mt-1 ms-0 me-1">
                <v-text-area>公钥</v-text-area>
                <v-spacer></v-spacer>
                <v-btn icon="mdi-content-copy" class="center-content" variant="text" density="comfortable"
                  size="small"></v-btn>
              </v-row>
            </v-card-title>
            <v-card-text>
              0431cdf19efba3eb6cbf459905dff5a7437376e0b0099e799a948fe3ceaf4335c37ddf36ec9289c4ed72e6d4e9c0dc8b8ba79fbfab93c57c385afe7dcd3d811d60
            </v-card-text>
          </v-card>
        </v-container>
      </template>




      <!-- 页面三 -->
      <template v-slot:item.3>
        <v-row justify="center" align="center">
          <v-col cols="12" class="text-center">
            <!-- 大的绿色勾图标 -->
            <v-icon size="100" color="green">mdi-check-circle</v-icon>
            <h3 class="text-h6 my-2">完成创建</h3>
            <!-- 大的红色叉号 -->
            <!-- <v-icon size="100" color="red">mdi-close-circle</v-icon>
            <h3 class="text-h6 my-2">出现错误</h3> -->

            <v-card variant="outlined" class="my-4 text-left text-mono">
              <v-card-title class="mb-3">
                <v-row class="mt-1 ms-0 me-1">
                  <v-text-area>私钥</v-text-area>
                  <v-spacer></v-spacer>
                  <v-btn icon="mdi-content-copy" class="center-content" variant="text" density="comfortable"
                    size="small"></v-btn>
                </v-row>
              </v-card-title>
              <v-card-text>
                3d05b1e8cf4f3237c56176a626f2cb32d7b1c47ded625dcf7840c01b0f9ed050
              </v-card-text>
            </v-card>

            <v-card variant="outlined" class="my-4 text-left text-mono">
              <v-card-title class="mb-3">
                <v-row class="mt-1 ms-0 me-1">
                  <v-text-area>公钥</v-text-area>
                  <v-spacer></v-spacer>
                  <v-btn icon="mdi-content-copy" class="center-content" variant="text" density="comfortable"
                    size="small"></v-btn>
                </v-row>
              </v-card-title>
              <v-card-text>
                0431cdf19efba3eb6cbf459905dff5a7437376e0b0099e799a948fe3ceaf4335c37ddf36ec9289c4ed72e6d4e9c0dc8b8ba79fbfab93c57c385afe7dcd3d811d60
              </v-card-text>
            </v-card>

            <v-card variant="outlined" class="my-4 text-left text-mono">
              <v-card-title class="mb-3">
                <v-row class="mt-1 ms-0 me-1">
                  <v-text-area>钱包地址</v-text-area>
                  <v-spacer></v-spacer>
                  <v-btn icon="mdi-content-copy" class="center-content" variant="text" density="comfortable"
                    size="small"></v-btn>
                </v-row>
              </v-card-title>
              <v-card-text>
                11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c
              </v-card-text>
            </v-card>
            <v-btn @click="routeTo('/wallet')" width="128px" class="mt-8 mb-4" variant="tonal" block>关闭</v-btn>
          </v-col>
        </v-row>
      </template>


    </v-stepper>
  </v-container>
</template>
  
<script>
export default {
  data: () => ({
    step: 1,
    items: ['开始创建钱包', '生成密钥对', '确认钱包地址'],
    disable: false,
  }),

  methods: {

    routeTo(url) {
      this.$router.push(url);
    },

    prev() { this.step = this.step - 1; },
    next() { this.step = this.step + 1; }

  },
};
</script>