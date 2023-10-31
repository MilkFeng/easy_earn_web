<template>
    <v-app>
  
      <!-- 主要内容区域 -->
      <v-main>
        <!-- 兼职任务信息列表，每个任务以方块形式列出 -->
        <v-container>
          <v-row>
            <v-col cols="10">
              <v-combobox
                v-model="selectedWallet"
                :items="wallets"
                label="请选择要查询的钱包"
              ></v-combobox>
            </v-col>
            <v-col cols="2">
              <v-btn color="primary" @click="routeTo('/createmission')">创建任务</v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="pa-4">
          <v-row justify="center">
            <v-col cols="12" md="3" sm="6" v-for="job in jobs" :key="job.id">
              <v-card variant="outlined" class="mb-2">
                <v-card-title>{{ job.title }}</v-card-title>
                <v-card-text>
                  <!-- 兼职任务信息内容 -->
                  <p>{{ job.description }}</p>
                  <p>薪资: {{ job.salary }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn variant="tonal">申请</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
    
  <script>
  export default {
    data() {
      return {
         selectedWallet: null,
         wallets: ['钱包1', '钱包2', '钱包3'],
     
        jobs: [
          {
            id: 1,
            title: "兼职1",
            description: "这是兼职1的描述",
            salary: "100元/小时",
          },
          {
            id: 2,
            title: "兼职2",
            description: "这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n这是兼职2的描述\n",
            salary: "80元/小时",
          },
          {
            id: 3,
            title: "兼职1",
            description: "这是兼职1的描述",
            salary: "100元/小时",
          },
          {
            id: 4,
            title: "兼职1",
            description: "这是兼职1的描述",
            salary: "100元/小时",
          },
          {
            id: 4,
            title: "兼职1",
            description: "这是兼职1的描述",
            salary: "100元/小时",
          },
          {
            id: 4,
            title: "兼职1",
            description: "这是兼职1的描述",
            salary: "100元/小时",
          },
          {
            id: 4,
            title: "兼职1",
            description: "这是兼职1的描述",
            salary: "100元/小时",
          },
          {
            id: 4,
            title: "兼职1",
            description: "这是兼职1的描述",
            salary: "100元/小时",
          },
  
          // 可以添加更多兼职数据
        ],
        
        accountBalance: 1000, // 账户余额
        isBellHovered: false, // 铃铛图标悬停状态
        user: {
          username: "jsoet",
        },
      };
    },
    methods: {
      openNotifications() {
        // 打开通知
        // 可以添加你的通知逻辑
      },
      goToProfile() {
        // 点击头像后，链接到个人信息页面
        this.$router.push("/profile"); // 使用 Vue Router 的编程式导航
      },
      routeTo(url) {
        this.$router.push(url);
      }
    },
  };
  </script>