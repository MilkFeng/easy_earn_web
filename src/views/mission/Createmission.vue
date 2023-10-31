<template>
  <v-container class="center-content">
    <v-card width="700px" variant="outlined">
      <v-stepper alt-labels v-model="step" :items="items" hide-actions
        style="box-shadow: none; background-color: transparent;">
        <!-- 页面一 -->
        <template v-slot:item.1>
          <v-text-area class="text-h6">开始创建任务，流程如下：</v-text-area>
          <v-timeline side="end" class="mt-4">
            <v-timeline-item>
              <v-alert>输入任务名称、任务内容、酬金</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>生成哈希,选择钱包</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>展示任务信息，输入私钥进行签名</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>输入公钥</v-alert>
            </v-timeline-item>
          </v-timeline>
        </template>

        <template v-slot:item.2>
          <v-text-area class="text-h6">任务名称</v-text-area>
          <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-text-area class="text-h6">任务内容</v-text-area>
          <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-text-area class="text-h6">酬金</v-text-area>
          <v-text-field v-model="walletAddress" prefix="$" variant="outlined" class="mt-4 text-mono"></v-text-field>
        </template>

        <template v-slot:item.3>
          <v-text-area class="text-h6">生成哈希</v-text-area>
          <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-text-area class="text-h6">选择钱包</v-text-area>
          <v-combobox :items="addresses" variant="outlined" class="mt-4 text-mono" autocomplete="off"></v-combobox>
        </template>

        <template v-slot:item.4>
          <v-card variant="outlined" class="my-4 text-mono text-left">
            <v-card-title class="mb-3 mt-1 ms-0 me-1">任务详情</v-card-title>
            <v-card-item>任务序号：100</v-card-item>
            <v-card-item>任务名称：任务1</v-card-item>
            <v-card-item>任务内容：任务内容1</v-card-item>
            <v-card-item>酬金：1000</v-card-item>
          </v-card>
          <v-alert class="my-4" type="warning">请仔细核对任务信息！</v-alert>
          <v-text-area class="text-h6">私钥</v-text-area>
          <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-btn @click="step += 1" width="128px" class="mt-4 mb-4" variant="tonal" block>签名</v-btn>
        </template>

        <template v-slot:item.5>
          <v-text-area class="text-h6">公钥</v-text-area>
          <v-text-field v-model="walletAddress" variant="outlined" class="mt-4 text-mono"></v-text-field>
          <v-btn @click="step += 1" width="128px" class="mt-4 mb-4" variant="tonal" block>创建任务</v-btn>
        </template>

        <template v-slot:item.6>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">
              <circle-with-loading-and-result state="loading" title="正在工作" />

              <v-card variant="outlined" class="my-4 text-mono text-left">
                <v-card-title class="mb-3 mt-1 ms-0 me-1">任务详情</v-card-title>
                <v-card-item>任务序号：100</v-card-item>
                <v-card-item>任务名称：任务1</v-card-item>
                <v-card-item>任务内容：任务内容1</v-card-item>
                <v-card-item>酬金：1000</v-card-item>
              </v-card>

              <v-btn @click="routeTo('/wallet')" width="128px" class="mt-8 mb-4" variant="tonal" block>关闭</v-btn>
            </v-col>
          </v-row>
        </template>

        <v-stepper-actions @click:prev="step -= 1" @click:next="step += 1" v-if="step < 4" />
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
    items: ['创建任务', '任务信息', '生成哈希，选择钱包', '输入私钥','输入公钥', '完成'],
    addresses: ['11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c', '11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c', '11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c']
  }),

  methods: {
    routeTo(url) { this.$router.push(url); },
  },
};
</script>