import { createWebHistory, createRouter } from "vue-router";
import About from "@/views/AboutPage.vue";
import SignUp from "@/views/SignupPage.vue";
import AlbumsPage from "@/views/AlbumsPage.vue";
import AlbumDetailsPage from "@/views/AlbumDetailsPage.vue";

const routes = [
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/signup",
    name: "SignUpPage",
    component: SignUp,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
