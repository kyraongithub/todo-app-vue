import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/auth"
import LoginPage from "../pages/LoginPage.vue"
import RegisterPage from "../pages/RegisterPage.vue"
import TodosPage from "../pages/TodosPage.vue"
import ProfilePage from "../pages/ProfilePage.vue"
import NotFoundPage from "../pages/NotFoundPage.vue"

const routes = [
  {
    path: "/login",
    component: LoginPage,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    component: RegisterPage,
    meta: { requiresGuest: true },
  },
  {
    path: "/todos",
    component: TodosPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    component: ProfilePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login")
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next("/todos")
  } else {
    next()
  }
})

export default router
