<template>
  <v-app>

    <!-- 主要内容区域 -->
    <v-main>
      <!-- 兼职任务信息列表，每个任务以方块形式列出 -->
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="9">
            <v-select v-model="selectedWallet" :items="[123]" variant="outlined" label="请选择要查询的钱包" block
              :hide-details="true"></v-select>
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" @click="routeTo('/createmission')" variant="tonal" block>创建任务</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="pa-4">
        <v-row justify="center">
          <v-col cols="12" md="3" sm="6" v-for="job in jobs" :key="job.id">
            <v-card variant="outlined" class="mb-2">
              <v-card-title>{{ job.title }}</v-card-title>
              <v-card-text>
                <!-- 兼职任务信息内容 -->
                <p>{{ job.description }}</p>
                <p>薪资: {{ job.salary }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn variant="tonal">申请</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
    
<script setup>

import { getCurrentInstance, onMounted, ref } from "vue";
import { useAuth } from '@websanova/vue-auth/src/v3.js';
import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块

var axios = null;
const auth = useAuth();
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

const selectedWallet = ref(null);
const wallet = ref([]);

onMounted(() => {
  axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
});

async function get_addresses() {
  return await axios.get('/user/get-wallets').then(res => {
    let now = -1;
    wallets.value = res.data.addresses.map(address => {
      now = now + 1;
      return {
        id: now,
        address: address,
        show: false,
        balance: "?"
      };
    });
  });
}

function routeTo(url) {
  router.push(url);
}

</script>