import * as vueRouter from 'vue-router'; // 导入 Vue Router 的相关模块
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

import Main from "../views/main/Main.vue";
import Wallet from "../views/main/Wallet.vue";
import Market from "../views/main/Market.vue";

import Querymission from "../views/mission/Querymission.vue";
import Createmission from "../views/mission/Createmission.vue";

import CreateWallet from "../views/wallet/CreateWallet.vue";
import BondWallet from "../views/wallet/BondWallet.vue";
import Trade from "../views/wallet/Trade.vue";

import Page404 from "../views/errors/404.vue"

const routes = [
  {
    path: "/login",
    name: 'auth-login',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    path: "/register",
    name: 'auth-register',
    component: Register,
    meta: {
      auth: false
    }
  },
  {
    path: "/",
    component: Main,
    redirect: "/market",
    meta: {
      auth: true
    },
    children: [
      {
        path: "/wallet",
        component: Wallet,
      },
      {
        path: "/market",
        component: Market,
      },
      {
        path: "/querymission",
        component: Querymission,
      }
    ],
  },

  {
    path: "/create-wallet",
    component: CreateWallet,
  },
  {
    path: "/bond-wallet",
    component: BondWallet,
  },
  {
    path: "/trade",
    component: Trade,
  },
  {
    path: "/querymission",
    component: Querymission,
  },
  {
    path: "/createmission",
    component: Createmission,
  },
  {
    path: "/404",
    component: Page404,
  }
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default (app) => {
  app.router = router;

  app.use(router);
}