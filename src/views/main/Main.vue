<template>
  <v-app>
    <!-- 应用程序栏，背景颜色设置为灰黑色 -->
    <v-app-bar app class="ps-8 pe-8">

      <!-- 按钮组，包括测试字符按钮 -->
      <v-btn class="rounded-0" @click="routeTo('/market')">主页</v-btn>
      <v-btn class="rounded-0" @click="routeTo('/wallet')">我的钱包</v-btn>
      <v-btn class="rounded-0" @click="routeTo('/querymission')">我的任务</v-btn>

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
              <h2 class="my-2">$ 300</h2>
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

import { getCurrentInstance, onMounted, ref } from "vue";
import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块

var auth = null;
const router = vueRouter.useRouter(); // 获取 Vue Router 实例

const jobs = [
  {
    id: 1,
    title: "兼职1",
    description: "这是兼职1的描述",
    salary: "100元/小时",
  },
  {
    id: 2,
    title: "兼职2",
    description: "这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n",
    salary: "80元/小时",
  },
  {
    id: 3,
    title: "兼职1",
    description: "这是兼职1的描述",
    salary: "100元/小时",
  },
  {
    id: 4,
    title: "兼职1",
    description: "这是兼职1的描述",
    salary: "100元/小时",
  },
  {
    id: 4,
    title: "兼职1",
    description: "这是兼职1的描述",
    salary: "100元/小时",
  },
  {
    id: 4,
    title: "兼职1",
    description: "这是兼职1的描述",
    salary: "100元/小时",
  },
  {
    id: 4,
    title: "兼职1",
    description: "这是兼职1的描述",
    salary: "100元/小时",
  },
  {
    id: 4,
    title: "兼职1",
    description: "这是兼职1的描述",
    salary: "100元/小时",
  },

  // 可以添加更多兼职数据
];


const accountBalance = ref(1000); // 账户余额
const isBellHovered = ref(false); // 铃铛图标悬停状态
const user = ref({
  username: "jsoet",
});


onMounted(() => {
  auth = getCurrentInstance()?.appContext.config.globalProperties.$auth;
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