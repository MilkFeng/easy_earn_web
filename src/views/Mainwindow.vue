<template>
  <v-app>
    <!-- 应用程序栏，背景颜色设置为灰黑色 -->
    <v-app-bar app class="ps-8 pe-8">
      <!-- 头像，点击后链接到个人信息页面 -->

      <!-- <v-btn @click="goToProfile" size="large" class="mr-10">
        <v-avatar image="https://randomuser.me/api/portraits/women/81.jpg">
        </v-avatar>
        <v-spacer class="mr-3 ml-3">-</v-spacer>
        <v-text-area>2222222222</v-text-area>
      </v-btn> -->
      
      <!-- 按钮组，包括测试字符按钮 -->
      <v-btn class="rounded-0">测试按钮1</v-btn>
      <v-btn class="rounded-0">测试按钮2</v-btn>
      <v-btn class="rounded-0">测试按钮3</v-btn>

      <!-- 账户余额 -->
      <v-spacer></v-spacer>

      <v-menu min-width="200px" rounded :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" size="small">
            <v-avatar image="https://randomuser.me/api/portraits/women/81.jpg"/>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar image="https://randomuser.me/api/portraits/women/81.jpg"/>
              <h3 class="my-1">{{ user.username }}</h3>
              <h2 class="my-2">$ 300</h2>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text">我的账户</v-btn>
              <v-btn rounded variant="text">登出</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>

    </v-app-bar>

    <!-- 主要内容区域 -->
    <v-main>
      <!-- 兼职任务信息列表，每个任务以方块形式列出 -->
      <v-container>
        <v-row>
          <v-col cols="12" md="4" v-for="job in jobs" :key="job.id">
            <v-card class="mb-4">
              <v-card-title>{{ job.title }}</v-card-title>
              <v-card-text>
                <!-- 兼职任务信息内容 -->
                <p>{{ job.description }}</p>
                <p>薪资: {{ job.salary }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="blue">申请</v-btn>
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
          description: "这是兼职2的描述",
          salary: "80元/小时",
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
  },
};
</script>
