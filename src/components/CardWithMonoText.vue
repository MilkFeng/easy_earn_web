<template>
  <v-card variant="outlined" class="my-4 text-mono text-left">
    <v-card-title class="mb-3">
      <v-row class="mt-1 ms-0 me-1">
        <p>{{ title }}</p>
        <v-spacer></v-spacer>
        <v-btn icon="mdi-content-copy" class="center-content copy-qb" variant="text" density="comfortable" size="small"
          @click="copyToClipboard()"></v-btn>
      </v-row>
    </v-card-title>
    <v-card-text>{{ text }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    text: String,
  },
  methods: {
    copyToClipboard() {
      this.$copyText(this.text)
        .then(() => {
          alert('已成功复制到剪切板！');
        })
        .catch(() => {
          alert('复制失败，请手动复制！');
        });
    }
  },
};
</script>