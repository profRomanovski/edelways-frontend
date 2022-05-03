import { createRouter, createWebHistory } from 'vue-router'
import groupRouters from "@/modules/Groups/router";

const baseRoutes = [

]

const routes = baseRoutes.concat(groupRouters);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
