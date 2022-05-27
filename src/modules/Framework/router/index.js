import { createRouter, createWebHistory } from 'vue-router'
import groupRouters from "@/modules/Groups/router";
import user from "@/modules/User/router"
import theory from "@/modules/Theory/router"
const baseRoutes = [

]

const routes = baseRoutes.concat(groupRouters, user, theory);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
