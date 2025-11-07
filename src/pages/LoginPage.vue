<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-slate-900 mb-8">Login</h1>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <p class="mt-6 text-center text-slate-600">
          Don't have an account?
          <RouterLink to="/register" class="text-blue-600 font-medium hover:text-blue-700">
            Register
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { RouterLink } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const error = ref('')

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form.value.email, form.value.password)
    router.push('/todos')
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}
</script>
