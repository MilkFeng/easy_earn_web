<template>
  <!-- 大的绿色勾图标 -->
  <v-icon v-if="state == 'success'" size="100" color="green">mdi-check-circle</v-icon>
  <v-icon v-if="state == 'error'" size="100" color="red">mdi-close-circle</v-icon>
  <v-progress-circular v-if="state == 'loading'" size="100" :width="7" color="primary" indeterminate></v-progress-circular>

  <h3 class="text-h6 mt-4 mb-8">{{ title }}</h3>
</template>


<script>
export default {
  props: {
    state: String,
    title: String,
  },
}
</script>