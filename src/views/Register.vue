<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <!-- <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a> -->
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-text-field
        :append-inner-icon="visible2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Confirm your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible2 = !visible2"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Hint: Your password must be at least 8 digits and contain three of upper/lowercase letters, numbers, and special characters.
        </v-card-text>
      </v-card>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
      >
        REGISTER
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="/login"
          rel="noopener noreferrer"
          target="_blank"
        >
          Log in now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUsername: "",
      newPassword: "",
      confirmPassword: "",
      visible:false,
      visible2:false,
    };
  },
  methods: {
    register() {
      if (this.newPassword === this.confirmPassword) {
        // 在这里执行注册逻辑
        console.log("Register clicked");
      } else {
        alert("Passwords do not match. Please try again.");
      }
    },
    redirectToLogin() {
      // 在这里进行路由跳转到登录页面的逻辑
      this.$router.push("/login");
    },
  },
};
</script>

<style>
/* 自定义有颜色的框的样式 */
.custom-card {
  background-color: #e3f2fd; /* 设置框的背景颜色 */
  padding: 16px; /* 设置框的内边距 */
  border-radius: 8px; /* 设置框的圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加框的阴影效果 */
}

/* 设置卡片内容的高度和大小一致 */
.custom-card-content {
  height: 100%;
  width: 100%; /* 设置卡片的宽度为100%以填充容器 */
}
</style>
