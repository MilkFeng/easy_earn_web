<template>
  <v-card variant="outlined" class="mb-2">
    <v-card-title>
      <p class="text-h5"># {{ nonce }}</p>
      <p class="text-mono text-caption">{{ address }}</p>
    </v-card-title>

    <v-card-text>
      <!-- 兼职任务信息内容 -->
      <p class="text-body-1 mb-2">{{ json }}</p>

    </v-card-text>

    <v-card-actions>
      <v-btn variant="text">详情</v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script setup>

import CardWithMonoText from './CardWithMonoText.vue';
import CircleWithLoadingAndResult from './CircleWithLoadingAndResult.vue';

import { getCurrentInstance, onMounted, onBeforeMount, ref } from "vue";

const props = defineProps({
  address: String,
  nonce: String,
  content: String,
});

const json = ref({});

function decode() {
  try {
    json.value = JSON.parse(props.content);
  } catch (err) {
    json.value = props.content;
  }
}

onMounted(() => {
  decode();
});



</script>