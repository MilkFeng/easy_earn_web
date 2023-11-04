<template>
    <v-app>
        <!-- 主要内容区域 -->
        <v-main>
            <!-- 兼职任务信息列表，每个任务以方块形式列出 -->
            <v-container>
                <v-card variant="outlined">
                    <v-card-title>404找不到网页</v-card-title>
                    <v-card-text>
                        <p>你访问的网页不存在</p>
                        
                    </v-card-text>
                    <v-card-actions>
                        <v-btn variant="text" to="/">返回主页</v-btn>
                        <v-btn variant="text" @click="back();">返回上一个页面</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块

const router = vueRouter.useRouter(); // 获取 Vue Router 实例

function back() {
    router.back();
}
</script>