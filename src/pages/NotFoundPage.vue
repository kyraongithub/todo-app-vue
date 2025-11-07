<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-slate-900 mb-4">404</h1>
      <p class="text-xl text-slate-600 mb-8">Page not found</p>
      <RouterLink
        to="/todos"
        class="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
      >
        Go back to Todos
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
