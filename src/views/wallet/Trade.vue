<template>
    <v-container class="center-content">
      <v-card width="700px" variant="outlined">
        <v-stepper alt-labels v-model="step" :items="items" hide-actions
          style="box-shadow: none; background-color: transparent;">
          <!-- 页面一 -->
          <template v-slot:item.1>
            <v-text-area class="text-h6">钱包地址</v-text-area>
            <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
            <v-text-area class="text-h6">金额</v-text-area>
            <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
          </template>
  
          <!-- 页面2 -->
          <template v-slot:item.2>
            <v-text-area class="text-h6">公钥</v-text-area>
            <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
            <v-text-area class="text-h6">私钥</v-text-area>
            <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
          </template>
  
          <!-- 页面3 -->
          <template v-slot:item.3>
            <v-row justify="center" align="center">
              <v-col cols="12" class="text-center">
  
                <circle-with-loading-and-result state="loading" title="正在工作" />
  
               
  
                <v-btn @click="routeTo('/wallet')" width="128px" class="mt-8 mb-4" variant="tonal" block>关闭</v-btn>
              </v-col>
            </v-row>
          </template>
  
          <v-stepper-actions @click:prev="step -= 1" @click:next="step += 1" v-if="step !== 3" />
        </v-stepper>
      </v-card>
    </v-container>
  </template>
      
  <script>
  
  import CardWithMonoText from '../../components/CardWithMonoText.vue';
  import CircleWithLoadingAndResult from '../../components/CircleWithLoadingAndResult.vue'
  
  export default {
    components: {
      'card-with-mono-text': CardWithMonoText,
      'circle-with-loading-and-result': CircleWithLoadingAndResult,
    },
    data: () => ({
      step: 1,
      items: ['输入钱包地址及金额', ' 输入公钥私钥', '完成'],
    }),
  
    methods: {
      routeTo(url) { this.$router.push(url); },
    },
  };
  </script>