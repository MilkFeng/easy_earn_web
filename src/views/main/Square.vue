<template>
    <v-main>
        <v-container class="pa-4">
            <v-row>
                <v-col cols="3">
                    <v-btn class="mb-4 text-center" variant="tonal" block size="large" @click="refreshTasks"
                        :loading="state === 'loading'">刷新任务</v-btn>
                </v-col>
            </v-row>

            <div v-if="state !== 'success'" style="display: block; text-align: center;" class="mt-10">
                <CircleWithLoadingAndResult :show="false" :state="state" />
                <CardWithMonoText v-if="state === 'error'" title="错误" :text="error" />
            </div>

            <v-row v-if="state === 'success'">
                <v-col cols="12" md="6" sm="6" v-for="task in tasks" :key="(task.address, task.nonce)">
                    <v-card variant="outlined" class="mb-2">
                        <TaskCard :address="task.address" :nonce="task.nonce" :content="task.content" />
                        <v-card-actions>
                            <v-btn @click="applyForTask(task)" variant="text">申请</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
  
<script setup>
import CircleWithLoadingAndResult from '../../components/CircleWithLoadingAndResult.vue'
import CardWithMonoText from '../../components/CardWithMonoText.vue';
import { getCurrentInstance, onMounted, ref } from "vue";
import { useAuth } from '@websanova/vue-auth/src/v3.js';
import * as vueRouter from 'vue-router';
import { get_tasks } from '../../function/http.js';
import TaskCard from '../../components/TaskCard.vue';
var axios = null;
const router = vueRouter.useRouter();

const tasks = ref([]);
const state = ref("loading");
const error = ref("");

onMounted(() => {
    axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
    refreshTasks();
});



function refreshTasks() {
    state.value = "loading";
    get_tasks(axios, data => {
        tasks.value = data.tasks;
        state.value = "success";
    }, msg => {
        state.value = "error";
        error.value = msg;
    });
}

function applyForTask(task) {
    // 在点击申请按钮时将任务信息传递给申请页面
    router.push({ path: '/mission/apply', params: { taskInfo: task } });
}
</script>
  