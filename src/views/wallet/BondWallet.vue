<template>
  <v-container class="center-content">
    <v-card width="700px" variant="outlined">
      <v-stepper alt-labels v-model="step" :items="['开始', '确认地址', '完成']" hide-actions
        style="box-shadow: none; background-color: transparent;">
        <!-- 页面一 -->
        <template v-slot:item.1>
          <p class="text-h6">开始绑定钱包，流程如下：</p>
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
          <p class="text-h6">输入钱包地址</p>
          <v-text-field v-model="address" variant="outlined" class="mt-4 text-mono"></v-text-field>

          <v-btn @click="bond(); step += 1;" class="mt-8 mb-4" variant="tonal" block>绑定</v-btn>
        </template>

        <!-- 页面3 -->
        <template v-slot:item.3>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">

              <CircleWithLoadingAndResult :state="state"/>

              <CardWithMonoText v-if="state === 'success'" title="钱包地址" :text="address" />
              <CardWithMonoText v-if="state === 'error'" title="错误" :text="error" />

              <v-btn v-if="state !== 'loading'" @click="routeTo('/wallet')" class="mt-8 mb-4" variant="tonal" block>关闭</v-btn>
            </v-col>
          </v-row>
        </template>

        <v-stepper-actions @click:prev="step -= 1" @click:next="step += 1" v-if="step < 2" />
      </v-stepper>
    </v-card>
  </v-container>
</template>
    
<script setup>

import CardWithMonoText from '../../components/CardWithMonoText.vue';
import CircleWithLoadingAndResult from '../../components/CircleWithLoadingAndResult.vue'

import { getCurrentInstance, onMounted, onBeforeMount, ref } from "vue";
import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块

import { bond_wallet } from '../../function/http.js';

const router = vueRouter.useRouter(); // 获取 Vue Router 实例
var axios = null;

const step = ref(1);
const state = ref("loading");
const error = ref("");
const address = ref("");

onMounted(() => {
  axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
});

const routeTo = (url) => {
  router.push(url);
};

const bond = () => {
  state.value = "loading";
  bond_wallet(axios, address.value, data => {
    state.value = "success";
  }, msg => {
    error.value = msg;
    state.value = "error";
  });
}
</script>