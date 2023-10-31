<template>
  <!-- 大的绿色勾图标 -->
  <v-icon v-if="state == 'success'" size="100" color="green">mdi-check-circle</v-icon>
  <v-icon v-if="state == 'error'" size="100" color="red">mdi-close-circle</v-icon>
  <v-progress-circular v-if="state == 'loading'" size="100" :width="7" color="primary"
    indeterminate></v-progress-circular>

  <h3 v-if="show" class="text-h6 mt-4 mb-8">{{ getTitle() }}</h3>
</template>


<script>
export default {
  props: {
    state: String,
    title: String,
    show: {
      type: Boolean,
      default: true, // 设置布尔变量的默认值为 true
    }
  },
  methods: {
    getTitle() {
      if(this.title) return this.title;
      else if (this.state === "loading") return "正在工作";
      else if (this.state === "success") return "成功"
      else return "失败";
    }
  }
}
</script>