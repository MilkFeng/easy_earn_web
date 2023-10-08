<template>
  <v-app>
    <!-- 应用程序栏，背景颜色设置为灰黑色 -->
    <v-app-bar app color="grey darken-4">
      <!-- 头像，点击后链接到个人信息页面 -->
      <v-btn @click="goToProfile" class="ml-4 cursor-pointer p-0" style="border: 0; border-radius: 50%; width: 40px; height: 40px;">
        <v-avatar>
          <v-img
            src="https://randomuser.me/api/portraits/women/81.jpg"
            alt="User Avatar"
          ></v-img>
        </v-avatar>
      </v-btn>

      <!-- 按钮组，包括测试字符按钮 -->
      <v-btn-group class="ml-4">
        <v-btn class="rounded-0" flat color="grey darken-4" style="height: 48px;">
          测试按钮1
        </v-btn>
        <v-btn class="rounded-0" flat color="grey darken-4" style="height: 48px;">
          测试按钮2
        </v-btn>
        <v-btn class="rounded-0" flat color="grey darken-4" style="height: 48px;">
          测试按钮3
        </v-btn>
      </v-btn-group>

      <!-- 账户余额 -->
      <v-spacer></v-spacer>
      <div class="mr-4" style="color: white;">余额：{{ formattedBalance }}</div>

      <!-- 铃铛图标，点击后触发通知，鼠标悬停时改变颜色 -->
      <v-btn icon @click="openNotifications" @mouseenter="isBellHovered = true" @mouseleave="isBellHovered = false">
        <v-icon :color="isBellHovered ? 'blue' : 'white'">mdi-bell</v-icon>
      </v-btn>
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
                <v-btn color="primary">申请</v-btn>
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
    };
  },
  computed: {
    formattedBalance() {
      // 格式化账户余额为“余额：￥xx.xx”的形式
      return `￥${this.accountBalance.toFixed(2)}`;
    },
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
