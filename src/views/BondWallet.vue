<template>
  <v-container class="center-content">
    <v-stepper alt-labels v-model="step" :items="items" width="700px">
      <!-- 页面一 -->
      <template v-slot:item.1>
        <v-text-area class="text-h6">开始绑定钱包，流程如下：</v-text-area>
        <v-timeline side="end" class="mt-4">
          <v-timeline-item>
            <v-alert>用户输入钱包地址</v-alert>
          </v-timeline-item>
          <v-timeline-item>
            <v-alert>客户端向服务端发送绑定钱包的请求</v-alert>
          </v-timeline-item>
          <v-timeline-item>
            <v-alert>服务端在区块链中查找是否存在该钱包地址，同时判断账号是否已经绑定该钱包</v-alert>
          </v-timeline-item>
          <v-timeline-item>
            <v-alert>服务端将结果返回客户端</v-alert>
          </v-timeline-item>
        </v-timeline>
      </template>


      <!-- 页面2 -->
      <template v-slot:item.2>
        <v-text-area class="text-h6">输入钱包地址</v-text-area>
        <v-text-field v-model="walletAddress" variant="outlined" class="mt-4" style="font-family: 'Courier New', Courier, monospace;"></v-text-field>
      </template>

      <!-- 页面3 -->
      <template v-slot:item.3>
        <v-row justify="center" align="center">
          <v-col cols="12" class="text-center">
            <!-- 大的绿色勾图标 -->
            <v-icon size="100" color="green">mdi-check-circle</v-icon>
            <h3 class="text-h6 my-2">完成绑定</h3>

            <v-card style="font-family: 'Courier New', Courier, monospace;" variant="outlined" class="my-4 text-left">
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
    items: ['开始', ' 确认地址', '完成'],
    products: [
      {
        name: 'Product 1',
        price: 10,
        quantity: 2,
      },
      {
        name: 'Product 2',
        price: 15,
        quantity: 10,
      },

    ], disable: false,
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