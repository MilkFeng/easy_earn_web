<template>
  <v-app>

    <!-- 主要内容区域 -->
    <v-main>
      <!-- 兼职任务信息列表，每个任务以方块形式列出 -->
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="9">
            <v-select v-model="selectedWallet" :items="wallets" variant="outlined" label="请选择要查询的钱包" block
              :hide-details="true"></v-select>
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" @click="routeTo('/mission/create')" variant="tonal" size="large" block>创建任务</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="pa-4">
        <v-row v-if="state === 'success'">
          <v-col cols="12" md="6" sm="6" v-for="task in tasks" :key="(task.address, task.nonce)">
            <TaskCard :address="task.address" :nonce="task.nonce" :content="task.content"/>
          </v-col>
        </v-row>
        <div v-if="state !== 'success'" style="display: block; text-align: center;" class="mt-10">
          <CircleWithLoadingAndResult :show="false" :state="state" />
          <CardWithMonoText v-if="state === 'error'" title="错误" :text="error" />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
    
<script setup>

import CircleWithLoadingAndResult from '../../components/CircleWithLoadingAndResult.vue'
import CardWithMonoText from '../../components/CardWithMonoText.vue';
import TaskCard from '../../components/TaskCard.vue';

import { getCurrentInstance, onMounted, ref, watch } from "vue";
import { useAuth } from '@websanova/vue-auth/src/v3.js';
import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块

import { get_addresses, get_all_tasks_of } from '../../function/http.js';
import { decodeTaskContent } from '../../function/utils.js';

var axios = null;
const auth = useAuth();
const router = vueRouter.useRouter(); // 获取 Vue Router 实例

const selectedWallet = ref(null);
const wallets = ref([]);
const tasks = ref([]);

const state = ref("success");
const error = ref("");

onMounted(() => {
  axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
  refresh_address();
});

watch(selectedWallet, (newValue, oldValue) => {
  refresh_tasks();
});

function refresh_address() {
  get_addresses(axios, data => {
    wallets.value = data.addresses;
  }, msg => {
    console.error(msg);
  });
}

function refresh_tasks() {
  if(selectedWallet.value === null || selectedWallet.value === undefined) return;
  state.value = 'loading';
  get_all_tasks_of(axios, selectedWallet.value, data => {
    state.value = 'success';
    tasks.value = data.tasks;
  }, msg => {
    console.error(msg);
    state.value = 'error';
  })
}

function routeTo(url) {
  router.push(url);
}

</script>