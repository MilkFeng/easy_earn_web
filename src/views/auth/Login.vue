<template>
  <v-container class="center-content">
    <v-card class="mx-auto pa-12 pb-8" width="448" variant="outlined">
      <v-form ref="login_form">
        <div class="text-subtitle-1 text-medium-emphasis">用户名</div>

        <v-text-field :type="'username'" :rules="[rules.required, rules.counter, rules.username]" density="compact"
          placeholder="输入用户名" prepend-inner-icon="mdi-account-outline" variant="outlined"
          v-model="username"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">密码</div>

        <v-text-field :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" :type="visible ? 'text' : 'password'"
          :rules="[rules.required, rules.counter, rules.password]" density="compact" placeholder="输入密码"
          prepend-inner-icon="mdi-lock-outline" variant="outlined" v-model="password"
          @click:append-inner="visible = !visible"></v-text-field>

        <v-btn :loading="loading" :disabled="loading" block class="mb-3 mt-5" size="large" variant="tonal"
          @click="login()">
          登录
        </v-btn>
      </v-form>

      <v-card-text class="text-center">
        没有账号？
        <!-- <router-link to="/register" class="text-blue text-decoration-none"> -->
        <!-- 暂时在这个地方链接到主页 -->
        <router-link to="/register" class="text-decoration-none">
          现在注册 <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import { useAuth } from '@websanova/vue-auth/src/v3.js';
import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块

var axios = null;
const auth = useAuth();
const router = vueRouter.useRouter(); // 获取 Vue Router 实例

const username = ref("");
const password = ref("");
const visible = ref(false);
const loading = ref(false);
const rules = {
  required: value => !!value || '不能为空',
  counter: value => (value.length <= 30 && value.length > 3) || '太长或太短',
  username: value => /^[a-zA-Z0-9_]+$/.test(value) || '用户名只能包含数字、字母和下划线',
  password: value => /^[A-Za-z0-9!@#$%^&*()]+$/.test(value) || '密码只能包含数字、字母和!@#$%^&*()',
};

const login_form = ref(null);


onMounted(() => {
  axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
});

function login() {
  login_form.value.validate().then(valid => {
    if (valid.valid) {
      loading.value = true;

      auth.login({
        data: {
          username: username.value,
          password: password.value,
        },
      }).then(response => {
        console.log('成功响应:', response.data);

        // 存入 user 里面
        auth.user(response.data);

      }).catch(error => {
        console.error('发生错误:', error.response.data);
        loading.value = false;

        alert(error.response.data);
      });

      console.log("登录");
    }
  });
}

</script>
