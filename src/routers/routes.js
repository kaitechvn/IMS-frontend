import Login from "@/pages/Login.vue";
import PAGES from "@/constants/pages";
import NotFound from "@/components/NotFound.vue";
import ForgotPassword from "@/pages/ForgotPassword.vue";
import ResetPassword from "@/pages/ResetPassword.vue";
import { useAuthStore } from "@/stores/authStore";
import { createRouter, createWebHistory } from "vue-router";

const routes = [

  { path: PAGES.LOGIN, component: Login },
  { path: PAGES.FORGOT_PASSWORD, component: ForgotPassword},
  { path: PAGES.RESET_PASSWORD, component: ResetPassword},

  {
    path: "/:catchAll(.*)", 
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated &&
      to.path !== PAGES.LOGIN &&
      to.path !== PAGES.FORGOT_PASSWORD &&
      to.path != PAGES.RESET_PASSWORD) {

    next(PAGES.LOGIN); 
  } else {
    next(); 
  }
});


export default router;