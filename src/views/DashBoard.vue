<template>
  <v-container class="center-content">
  <v-stepper v-model="step" :items="items">
    <!-- 页面一 -->
    <template v-slot:item.1>
      <h3 class="text-h6">开始</h3>
      <br>
        <div>
          <!-- 页面一的文本内容 -->
          <p>你现在正在创建一个钱包……………………</p>
          <p>……………………</p>
        </div>
    </template>

    <!-- 页面二 -->
    <template v-slot:item.2>
      <h3 class="text-h6">确认公钥和私钥</h3>
      <br>
      <v-sheet border>
        <!-- 列表显示数据信息 -->
        <v-table>
          <thead>
            <tr>
              <th>公钥</th>
              <th class="text-end">私钥</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td v-text="product.name"></td>
              <td class="text-end" v-text="product.quantity"></td>
            </tr>
          </tbody>
        </v-table>
      </v-sheet>
    </template>

    <!-- 页面三 -->
    <template v-slot:item.3>
      <h3 class="text-h6">确认钱包地址</h3>
      <br>

        <div>
          <!-- 页面三的文本内容 -->
          <p>确认钱包地址:......</p>
        </div>
      
    </template>

    <!-- 页面4 -->
    <template v-slot:item.4>
      <v-row justify="center" align="center">
        <v-col cols="12" class="text-center">
          <!-- 大的绿色勾图标 -->
          <v-icon size="100" color="green">mdi-check-circle</v-icon>
          <br>
          <h3 class="text-h6">完成创建</h3>
          <br>
            <div>
              <!-- 页面3的文本内容 -->
              <p class="text-center">你已完成创建流程</p>
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
    items: ['开始', '确认密钥对 ', ' 确认地址','完成'],
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