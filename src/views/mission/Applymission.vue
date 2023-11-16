<template>
    <v-container class="center-content">
        <v-card width="700px" variant="outlined">
            <v-stepper alt-labels v-model="step" :items="['任务信息', '签名', '输入公钥', '完成']" hide-actions
                style="box-shadow: none; background-color: transparent;">
                <!-- Page One -->
                <template v-slot:item.1>
                    <p class="text-h6">任务信息：</p>
                    <v-card variant="outlined" class="my-4 text-mono text-left">
                        <v-card-title class="mb-3 mt-1 ms-0 me-1">任务详情</v-card-title>
                        <v-card-item>任务名称：{{ name }}</v-card-item>
                        <v-card-item>任务内容：{{ description }}</v-card-item>
                        <v-card-item>酬金：{{ reward }} ET</v-card-item>
                    </v-card>
                    <p class="text-h6">选择钱包</p>
                    <v-select v-model="selectedWallet" :items="addresses" variant="outlined" class="mt-4 text-mono"
                        autocomplete="off"></v-select>
                    <v-btn @click="nextStep()" class="mt-4 mb-4" variant="tonal" block>下一步</v-btn>
                </template>

                <template v-slot:item.2>
                    <p class="text-h6">输入私钥</p>
                    <v-text-field v-model="privateKey" variant="outlined" class="mt-4 text-mono"></v-text-field>
                    <v-btn @click="sign(); step += 1" class="mt-4 mb-4" variant="tonal" block>签名</v-btn>
                    <div v-if="nonceState === 'error'" class="error-message">{{ nonceError }}</div>
                </template>

                <template v-slot:item.3>
                    <p class="text-h6">公钥</p>
                    <v-text-field v-model="publicKey" variant="outlined" class="mt-4 text-mono"></v-text-field>
                    <v-btn @click="submitTask()" class="mt-4 mb-4" variant="tonal" block>提交任务</v-btn>
                </template>

                <template v-slot:item.4>
                    <v-row justify="center" align="center">
                        <v-col cols="12" class="text-center">
                            <CircleWithLoadingAndResult :state="uploadState" title="正在工作" />

                            <CardWithMonoText v-if="uploadState === 'error'" title="错误" :text="uploadError" />

                            <v-card variant="outlined" class="my-4 text-mono text-left">
                                <v-card-title class="mb-3 mt-1 ms-0 me-1">任务详情</v-card-title>
                                <v-card-item>任务所在钱包地址：{{ address }}</v-card-item>
                                <v-card-item>任务序号：{{ nonce }}</v-card-item>
                                <v-card-item>任务内容：{{ content }}</v-card-item>
                                <v-card-item>任务哈希：{{ hash }}</v-card-item>
                                <v-card-item>签名：{{ sig }}</v-card-item>
                                <v-card-item>公钥：{{ publicKey }}</v-card-item>
                            </v-card>

                            <v-btn v-if="uploadState !== 'loading'" @click="routeTo('/mission')" class="mt-8 mb-4"
                                variant="tonal" block>关闭</v-btn>
                        </v-col>
                    </v-row>
                </template>

                <v-stepper-actions @click:prev="step -= 1" @click:next="step += 1" v-if="step < 2" />
            </v-stepper>
        </v-card>
    </v-container>
</template>
  
<script setup>
import NonceErrorCard from "../../components/NonceErrorCard.vue";
import CardWithMonoText from '../../components/CardWithMonoText.vue';
import CircleWithLoadingAndResult from '../../components/CircleWithLoadingAndResult.vue';

import { getCurrentInstance, onMounted, ref } from "vue";
import * as vueRouter from 'vue-router';

import { get_addresses, upload_task, get_task_nonce ,apply_task_upload} from '../../function/http.js';
import { sha256Hash, toByteArray, getBlake2Hash, signSecp256k1, uint8ArrayToHexString } from '../../function/utils.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const taskInfo = route.params.taskInfo;
var axios = null;
const step = ref(1);
const addresses = ref([]);
const selectedWallet = ref("");
const name = "默认任务名称";
const content = "默认任务内容";
const amount = 100;
const privateKey = ref("");
const publicKey = ref("");
const sig = ref("");
const nonce = ref(-1);
const nonceState = ref("loading");
const nonceError = ref("");
const uploadState = ref("loading");
const uploadError = ref("");
const hash = ref("");


const routeParams = route.params;
onMounted(() => {
    axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
    get_addresses(axios, data => {
        addresses.value = data.addresses;
    }, msg => {
        console.error(msg);
    });

    if (routeParams.taskInfo) {
        const { address, nonce, content, amount } = routeParams.taskInfo;
        selectedWallet.value = address;
        nonce.value = nonce;
        content.value = content;
        reward.value = amount;
    }
});

function routeTo(url) {
    router.push(url);
}

function sign() {
    const bytes = toByteArray([selectedWallet.value, nonce.value, hash.value]);
    const signHash = getBlake2Hash(bytes);
    const sigBytes = signSecp256k1(signHash, privateKey.value);
    sig.value = uint8ArrayToHexString(sigBytes);
}

function nextStep() {
    step.value++;
}

function submitTask() {
    uploadState.value = "loading";

    // Send task information form request
    const taskData = {
        address: selectedWallet.value,
        nonce: nonce.value,
        content: content.value,
        hash: hash.value,
        sig: sig.value,
        publicKey: publicKey.value, 
    };

    apply_task_upload(axios, taskData.address, taskData.nonce, taskData.content, taskData.hash, taskData.sig, taskData.publicKey,
        (data) => {
            uploadState.value = "success";
        },
        (msg) => {
            uploadState.value = "error";
            uploadError.value = msg;
        }
    );

}



</script>
