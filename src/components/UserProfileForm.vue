<template>
  <div>
    <div v-if="saveStatus" :class="[
      'p-4 rounded-lg mb-6 text-sm font-medium',
      saveStatus === 'saving' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
    ]">
      {{ saveStatus === 'saving' ? 'Saving...' : 'Saved!' }}
    </div>

    <form class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">
          Full Name
        </label>
        <input
          v-model="profile.name"
          type="text"
          @input="debouncedSave"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>
        <input
          v-model="profile.email"
          type="email"
          @input="debouncedSave"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700 mb-2">
          Profile Picture URL
        </label>
        <input
          v-model="profile.profilePicture"
          type="url"
          @input="debouncedSave"
          class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://..."
        />
      </div>

      <div v-if="profile.profilePicture" class="flex justify-center">
        <img
          :src="profile.profilePicture"
          :alt="profile.name"
          class="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
        />
      </div>

      <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../api/client'

const authStore = useAuthStore()
const profile = ref({
  name: '',
  email: '',
  profilePicture: ''
})
const saveStatus = ref('')
const error = ref('')
let saveTimeout

// Debounce function: saves 2 seconds after user stops typing
const debouncedSave = () => {
  saveStatus.value = ''
  clearTimeout(saveTimeout)

  saveTimeout = setTimeout(async () => {
    await saveProfile()
  }, 2000)
}

const saveProfile = async () => {
  if (!profile.value.name || !profile.value.email) {
    error.value = 'Name and email are required'
    return
  }

  saveStatus.value = 'saving'
  error.value = ''

  try {
    const response = await api.patch('/auth/profile', {
      name: profile.value.name,
      email: profile.value.email,
      profilePicture: profile.value.profilePicture
    })

    // Update store with new user data
    authStore.updateUser(response.data.data)

    saveStatus.value = 'saved'
    setTimeout(() => {
      saveStatus.value = ''
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save profile'
    saveStatus.value = ''
  }
}

onMounted(() => {
  // Load current user data
  if (authStore.user) {
    profile.value = {
      name: authStore.user.name || '',
      email: authStore.user.email || '',
      profilePicture: authStore.user.profilePicture || ''
    }
  }
})
</script>
