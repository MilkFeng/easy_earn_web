<template>
  <v-container class="center-content">
    <v-card class="mx-auto pa-12 pb-8" width="448" variant="outlined">
      <v-form ref="register_form">
        <div class="text-subtitle-1 text-medium-emphasis">用户名</div>

        <v-text-field :type="'username'" :rules="[rules.required, rules.counter, rules.username]" density="compact"
          placeholder="输入用户名" prepend-inner-icon="mdi-account-outline" variant="outlined"
          v-model="username"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">密码</div>

        <v-text-field :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" :type="visible ? 'text' : 'password'"
          :rules="[rules.required, rules.counter, rules.password]" density="compact" placeholder="输入密码"
          prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
          v-model="password"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">确认密码</div>

        <v-text-field :append-inner-icon="visible2 ? 'mdi-eye' : 'mdi-eye-off'" :type="visible2 ? 'text' : 'password'"
          :rules="[rules.required, rules.confirm_password]" density="compact" placeholder="再次输入密码"
          prepend-inner-icon="mdi-lock-check-outline" variant="outlined" @click:append-inner="visible2 = !visible2"
          v-model="confirm_password"></v-text-field>

        <v-btn :loading="loading" :disabled="loading" block class="mb-3 mt-5" size="large" variant="tonal"
          @click="register">
          注册
        </v-btn>
      </v-form>


      <v-card-text class="text-center">
        已有账号？
        <router-link class="text-decoration-none" to="/login">
          现在登录 <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";

// 使用 ref 来声明响应式变量
const axios = ref(null);
const base_url = ref("");

const username = ref("");
const password = ref("");
const confirm_password = ref("");
const loading = ref(false);
const visible = ref(false);
const visible2 = ref(false);
const rules = {
  required: value => !!value || '不能为空',
  counter: value => (value.length <= 30 && value.length > 3) || '太长或太短',
  username: value => /^[a-zA-Z0-9_]+$/.test(value) || '用户名只能包含数字、字母和下划线',
  password: value => /^[A-Za-z0-9!@#$%^&*()]+$/.test(value) || '密码只能包含数字、字母和!@#$%^&*()',
  confirm_password: value => value === password.value || '两次密码不一致'
};

const register_form = ref(null);

onMounted(() => {
  const { proxy } = getCurrentInstance();
  axios.value = getCurrentInstance()?.appContext.config.globalProperties.$axios;
});

function register() {
  register_form.value.validate().then(valid => {
    if (valid.valid) {
      loading.value = true;

      axios.value.post("/user/register", {
        username: username.value,
        password: password.value,
      }).then(response => {
        console.log('成功响应:', response.data);
        loading.value = false;
      }).catch(error => {
        console.log('发生错误:', error);
        loading.value = false;
      });
    }
  });
}

</script>

<style>
/* 自定义有颜色的框的样式 */
.custom-card {
  background-color: #e3f2fd;
  /* 设置框的背景颜色 */
  padding: 16px;
  /* 设置框的内边距 */
  border-radius: 8px;
  /* 设置框的圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* 添加框的阴影效果 */
}

/* 设置卡片内容的高度和大小一致 */
.custom-card-content {
  height: 100%;
  width: 100%;
  /* 设置卡片的宽度为100%以填充容器 */
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 使内容占据整个视窗高度 */
}
</style>
