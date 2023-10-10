<template>
  <v-container class="center-content">
    <v-stepper v-model="step" :items="items" min-width="500px">
      <!-- 页面一 -->
      <template v-slot:item.1>
        <h3 class="text-h6">开始</h3>
        <br>
        <div>
          <!-- 页面一的文本内容 -->
          <p>你现在正在绑定一个钱包……………………</p>
          <p>……………………</p>
        </div>
      </template>


      <!-- 页面2 -->
      <template v-slot:item.2>
        <v-row justify="center" align="center">
          <v-col cols="12" class="text-center">
            <h3 class="text-h6">输入钱包地址</h3>
            <br>

            <br>
            <!-- 可编辑的文本框 -->
            <v-text-field v-model="walletAddress" label="钱包地址" outlined></v-text-field>
          </v-col>
        </v-row>
      </template>

      <!-- 页面3 -->
      <template v-slot:item.3>
        <v-row justify="center" align="center">
          <v-col cols="12" class="text-center">
            <!-- 大的绿色勾图标 -->
            <v-icon size="100" color="green">mdi-check-circle</v-icon>
            <br>
            <h3 class="text-h6">完成绑定</h3>
            <br>

            <div>
              <!-- 页面3的文本内容 -->
              <p class="text-center">你已完成绑定流程</p>
            </div>
            <br>
            <v-btn @click="routeTo('/wallet')" width="128px">关闭</v-btn>
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