<template>
  <v-container class="center-content">
    <v-card width="700px" variant="outlined">
      <v-stepper alt-labels v-model="step" :items="items" hide-actions
        style="box-shadow: none; background-color: transparent;">
        <!-- 页面一 -->
        <template v-slot:item.1>
          <v-text-area class="text-h6">开始创建钱包，流程如下：</v-text-area>
          <v-timeline side="end" class="mt-4">
            <v-timeline-item>
              <v-alert>客户端生成密钥对（公钥和私钥）</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>客户端向服务端发送创建钱包的请求，并将公钥一并上传给服务端</v-alert>
            </v-timeline-item>
            <v-timeline-item>
              <v-alert>服务端与RChain区块链交互，在区块链中创建您的钱包，最后将钱包地址返回客户端并显示</v-alert>
            </v-timeline-item>
          </v-timeline>
          <v-alert class="my-4" type="warning">密钥对（公钥和私钥）是进行代币交易的基础，我们不会保存您的密钥，页面刷新后所有信息将被重置。请保管好您的密钥，不要随意传播给他人！</v-alert>
        </template>

        <!-- 页面二 -->
        <template v-slot:item.2>
          <v-text-area class="text-h6">

            <v-row class="mt-1 ms-1 me-1">
              <v-text-area>生成密钥对</v-text-area>
              <v-spacer></v-spacer>
              <v-btn icon="mdi-refresh" class="center-content" variant="text" density="compact"></v-btn>
            </v-row>
          </v-text-area>

          <v-container>

            <card-with-mono-text title="私钥" text="3d05b1e8cf4f3237c56176a626f2cb32d7b1c47ded625dcf7840c01b0f9ed050" />
            <card-with-mono-text title="公钥"
              text="0431cdf19efba3eb6cbf459905dff5a7437376e0b0099e799a948fe3ceaf4335c37ddf36ec9289c4ed72e6d4e9c0dc8b8ba79fbfab93c57c385afe7dcd3d811d60" />
          </v-container>
        </template>


        <!-- 页面三 -->
        <template v-slot:item.3>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">

              <circle-with-loading-and-result state="loading" title="正在工作" />


              <card-with-mono-text title="私钥" text="3d05b1e8cf4f3237c56176a626f2cb32d7b1c47ded625dcf7840c01b0f9ed050" />
              <card-with-mono-text title="公钥"
                text="0431cdf19efba3eb6cbf459905dff5a7437376e0b0099e799a948fe3ceaf4335c37ddf36ec9289c4ed72e6d4e9c0dc8b8ba79fbfab93c57c385afe7dcd3d811d60" />
              <card-with-mono-text title="钱包地址" text="11112gNSU4Ytt3b2TpAQnggARSidPpNxrNkWqFFg52aNe5t6sjCy2c" />

              <v-btn @click="routeTo('/wallet')" width="128px" class="mt-8 mb-4" variant="tonal" block>关闭</v-btn>
            </v-col>
          </v-row>
        </template>

        <v-stepper-actions @click:prev="step -= 1" @click:next="step += 1" v-if="step !== 3" />
      </v-stepper>
    </v-card>
  </v-container>
</template>
  
<script>
import CardWithMonoText from '../components/CardWithMonoText.vue';
import CircleWithLoadingAndResult from '../components/CircleWithLoadingAndResult.vue'

export default {
  components: {
    'card-with-mono-text': CardWithMonoText,
    'circle-with-loading-and-result': CircleWithLoadingAndResult,
  },
  data: () => ({
    step: 1,
    items: ['开始创建钱包', '生成密钥对', '完成'],
  }),

  methods: {
    routeTo(url) { this.$router.push(url); },
  },
};
</script>