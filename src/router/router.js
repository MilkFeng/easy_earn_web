import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Mainwindow from "../views/Mainwindow.vue";
import DashBoard from "../views/DashBoard.vue";
import Wallet from "../views/Wallet.vue";


const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/mainwindow",
    component: Mainwindow,
  },
  {
    path: "/wallet",
    component: Wallet,
  },
  {
    path: "/dashboard",
    component: DashBoard,
  },

];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;
