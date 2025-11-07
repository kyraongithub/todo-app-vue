<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-slate-900 mb-8">My Profile</h1>

    <div class="bg-white rounded-lg shadow-md p-8">
      <UserProfileForm />
    </div>
  </div>
</template>

<script setup>
import UserProfileForm from '../components/UserProfileForm.vue'
</script>
