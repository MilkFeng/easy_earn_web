<template>
  <v-container class="center-content">
    <v-card width="700px" variant="outlined">
      <v-stepper alt-labels v-model="step" :items="items" hide-actions
        style="box-shadow: none; background-color: transparent;">
        <!-- 页面一 -->
        <template v-slot:item.1>
          <v-text-area class="text-h6">开始进行交易，流程如下：</v-text-area>
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
          <v-text-area class="text-h6">转出钱包地址</v-text-area>
          <v-combobox :items="addresses" variant="outlined" class="mt-4 text-mono" autocomplete="off"></v-combobox>
          <v-text-area class="text-h6">转入钱包地址</v-text-area>
          <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-text-area class="text-h6">金额</v-text-area>
          <v-text-field v-model="walletAddress" prefix="$" variant="outlined" class="mt-4 text-mono"></v-text-field>
        </template>

        <template v-slot:item.3>
          <v-card variant="outlined" class="my-4 text-mono text-left">
            <v-card-title class="mb-3 mt-1 ms-0 me-1">交易详情</v-card-title>
            <v-card-item>交易序号：100</v-card-item>
            <v-card-item>转出钱包地址：11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c</v-card-item>
            <v-card-item>转入钱包地址：11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c</v-card-item>
            <v-card-item>交易金额：1000</v-card-item>
          </v-card>
          <v-alert class="my-4" type="warning">请仔细核对交易信息！</v-alert>
          <v-text-area class="text-h6">私钥</v-text-area>
          <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-btn @click="step += 1" width="128px" class="mt-4 mb-4" variant="tonal" block>签名</v-btn>
        </template>

        <template v-slot:item.4>
          <v-text-area class="text-h6">公钥</v-text-area>
          <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-btn @click="step += 1" width="128px" class="mt-4 mb-4" variant="tonal" block>启动交易</v-btn>
        </template>

        <template v-slot:item.5>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">
              <circle-with-loading-and-result state="loading" title="正在工作" />

              <v-card variant="outlined" class="my-4 text-mono text-left">
                <v-card-title class="mb-3 mt-1 ms-0 me-1">交易详情</v-card-title>
                <v-card-item>交易序号：100</v-card-item>
                <v-card-item>转出钱包地址：11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c</v-card-item>
                <v-card-item>转入钱包地址：11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c</v-card-item>
                <v-card-item>交易金额：1000</v-card-item>
              </v-card>

              <v-btn @click="routeTo('/wallet')" width="128px" class="mt-8 mb-4" variant="tonal" block>关闭</v-btn>
            </v-col>
          </v-row>
        </template>

        <v-stepper-actions @click:prev="step -= 1" @click:next="step += 1" v-if="step < 3" />
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
    items: ['交易', '交易双方地址及金额', '签名', '输入公钥', '完成'],
    addresses: ['11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c', '11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c', '11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c']
  }),

  methods: {
    routeTo(url) { this.$router.push(url); },
  },
};
</script>