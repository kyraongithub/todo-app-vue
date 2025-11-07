<template>
  <div class="min-h-screen bg-slate-50">
    <nav class="bg-white shadow-sm border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <RouterLink to="/" class="text-2xl font-bold text-blue-600">
            TodoApp
          </RouterLink>
          <div v-if="authStore.isAuthenticated" class="flex items-center gap-4">
            <RouterLink
              to="/profile"
              class="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Profile
            </RouterLink>
            <RouterLink
              to="/todos"
              class="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Todos
            </RouterLink>
            <button
              @click="handleLogout"
              class="px-4 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
