<template>
  <v-app>
    <v-container fluid fill-height class="centered-container">
      <v-main>
        <!-- 这里是你的路由视图 -->
        <router-view />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 居中容器样式 */
.centered-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 1200px;
}
</style>
