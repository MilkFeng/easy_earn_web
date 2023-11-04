<template>
  <div v-if="state !== 'success'">
    <CircleWithLoadingAndResult :state="state" />
    <CardWithMonoText v-if="state === 'error'" title="错误" :text="error" />
  </div>
</template>

<script>

import CardWithMonoText from './CardWithMonoText.vue';
import CircleWithLoadingAndResult from './CircleWithLoadingAndResult.vue'


export default {
  components: {
    CardWithMonoText, CircleWithLoadingAndResult,
  },
  props: {
    state: String,
    error: String,
  },
};
</script>