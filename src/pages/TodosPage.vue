<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-slate-900 mb-8">My Todos</h1>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <CreateTodoForm @todo-created="handleTodoCreated" />
    </div>

    <div v-if="todoStore.loading" class="text-center py-12">
      <p class="text-slate-600">Loading todos...</p>
    </div>

    <div v-else-if="todoStore.todos.length === 0" class="text-center py-12 bg-white rounded-lg shadow-md">
      <p class="text-slate-600 text-lg">No todos yet. Create one to get started!</p>
    </div>

    <div v-else class="space-y-4">
      <TodoItem
        v-for="todo in todoStore.todos"
        :key="todo.id"
        :todo="todo"
        @update="handleUpdateTodo"
        @delete="handleDeleteTodo"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTodoStore } from '../stores/todos'
import CreateTodoForm from '../components/CreateTodoForm.vue'
import TodoItem from '../components/TodoItem.vue'

const todoStore = useTodoStore()

onMounted(() => {
  todoStore.fetchTodos()
})

const handleTodoCreated = (todo) => {
  // Store already updated, just need to trigger UI refresh
  console.log('Todo created:', todo)
}

const handleUpdateTodo = async (id, updates) => {
  await todoStore.updateTodo(id, updates)
}

const handleDeleteTodo = async (id) => {
  await todoStore.deleteTodo(id)
}
</script>
