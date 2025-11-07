<template>
  <form @submit.prevent="handleCreateTodo" class="space-y-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <input
        v-model="form.title"
        type="text"
        required
        placeholder="Add a new todo..."
        class="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        :disabled="loading"
        class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
      >
        {{ loading ? 'Adding...' : 'Add Todo' }}
      </button>
    </div>

    <textarea
      v-model="form.description"
      placeholder="Add description (optional)"
      rows="2"
      class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
    ></textarea>

    <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
      {{ error }}
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todos'

const emit = defineEmits(['todo-created'])
const todoStore = useTodoStore()

const form = ref({
  title: '',
  description: ''
})
const loading = ref(false)
const error = ref('')

const handleCreateTodo = async () => {
  if (!form.value.title.trim()) return

  loading.value = true
  error.value = ''

  try {
    const todo = await todoStore.createTodo(
      form.value.title,
      form.value.description
    )
    emit('todo-created', todo)
    form.value = { title: '', description: '' }
  } catch (err) {
    error.value = 'Failed to create todo'
  } finally {
    loading.value = false
  }
}
</script>
