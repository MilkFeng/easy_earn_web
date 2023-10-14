<template>
  <v-container class="center-content">
    <v-card width="700px" variant="outlined">
      <v-stepper alt-labels v-model="step" :items="items" hide-actions
        style="box-shadow: none; background-color: transparent;">
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
          <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
        </template>

        <!-- 页面3 -->
        <template v-slot:item.3>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">

              <circle-with-loading-and-result state="loading" title="正在工作" />

              <card-with-mono-text title="钱包地址" text="11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c" />

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
    items: ['开始', ' 确认地址', '完成'],
  }),

  methods: {
    routeTo(url) { this.$router.push(url); },
  },
};
</script>