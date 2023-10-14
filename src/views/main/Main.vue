<template>
  <v-app>
    <!-- 应用程序栏，背景颜色设置为灰黑色 -->
    <v-app-bar app class="ps-8 pe-8">
      
      <!-- 按钮组，包括测试字符按钮 -->
      <v-btn class="rounded-0" @click="routeTo('/market')">主页</v-btn>
      <v-btn class="rounded-0" @click="routeTo('/wallet')">我的钱包</v-btn>

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
                <v-btn rounded variant="text" @click="routeTo('/wallet')">钱包</v-btn>
                <v-btn rounded variant="text">登出</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>

    </v-app-bar>

    <!-- 主要内容区域 -->
    <v-main>
      <v-container class="pa-4">
        <router-view />
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
  