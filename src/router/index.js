import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomePage.vue";
import SignUp from "@/views/SignupPage.vue";
import AlbumsPage from "@/views/AlbumsPage.vue";
import AlbumDetailsPage from "@/views/AlbumDetailsPage.vue";
import LoginPage from "@/views/Login.vue";
import { Auth } from "aws-amplify";

const routes = [
  { path: "/", name: "Home", component: Home },

  {
    path: "/signup",
    name: "SignUpPage",
    component: SignUp,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/album/:id",
    name: "AlbumDetailPage",
    component: AlbumDetailsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/albums",
    name: "AlbumsPage",
    component: AlbumsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async function(to, from, next) {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const isAuthenticated = await Auth.currentUserInfo();

  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
