<template>
  <v-app>
    <!-- 应用程序栏，背景颜色设置为灰黑色 -->
    <v-app-bar app class="ps-8 pe-8">

      <!-- 按钮组，包括测试字符按钮 -->
      <v-btn class="rounded-0" @click="routeTo('/market')">主页</v-btn>
      <v-btn class="rounded-0" @click="routeTo('/wallet')">我的钱包</v-btn>
      <v-btn class="rounded-0" @click="routeTo('/mission')">我的任务</v-btn>

      <v-spacer></v-spacer>

      <v-menu min-width="200px" rounded :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" size="small">
            <v-avatar image="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar image="https://randomuser.me/api/portraits/women/81.jpg" />
              <h3 class="my-1">{{ user.username }}</h3>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="routeTo('/wallet')">钱包</v-btn>
              <v-btn rounded variant="text" @click="logout()">登出</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>

    </v-app-bar>

    <!-- 主要内容区域 -->
    <v-main>
      <v-container class="pa-4">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script setup>

import { getCurrentInstance, onMounted, onBeforeMount, ref } from "vue";
import { useAuth } from '@websanova/vue-auth/src/v3.js';
import { useStore } from 'vuex';
import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块

const auth = useAuth();
const router = vueRouter.useRouter(); // 获取 Vue Router 实例

const user = ref({
  username: "null",
});


onBeforeMount(() => {
  auth.fetch().then(response => {
    console.log('成功响应:', response.data);
    auth.user(response.data);
    user.value = auth.user();
  }).catch(error => {
    console.log('发生错误:', error.response.data);
  });
});


function routeTo(url) {
  router.push(url);
};

function logout() {
  auth.logout({
    makeRequest: true,
    redirect: "/login",
  });
}
</script>