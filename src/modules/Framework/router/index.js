import { createRouter, createWebHistory } from 'vue-router'
import groupRouters from "@/modules/Groups/router";
import user from "@/modules/User/router"
import theory from "@/modules/Theory/router"
import task from "@/modules/Task/router"
const baseRoutes = [

]

const routes = baseRoutes.concat(groupRouters, user, theory, task);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
