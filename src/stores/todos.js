import { defineStore } from "pinia"
import { ref } from "vue"
import api from "../api/client"

export const useTodoStore = defineStore("todos", () => {
  // State
  const todos = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Actions
  const fetchTodos = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get("/todos")
      todos.value = response.data.data || []
    } catch (err) {
      error.value = "Failed to fetch todos"
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const createTodo = async (title, description) => {
    error.value = null
    try {
      const response = await api.post("/todos", {
        title,
        description,
        completed: false,
      })
      todos.value.push(response.data.data)
      return response.data.data
    } catch (err) {
      error.value = "Failed to create todo"
      throw error.value
    }
  }

  const updateTodo = async (id, updates) => {
    error.value = null
    try {
      const response = await api.patch(`/todos/${id}`, updates)
      const index = todos.value.findIndex((t) => t.id === id)
      if (index !== -1) {
        todos.value[index] = response.data.data
      }
      return response.data.data
    } catch (err) {
      error.value = "Failed to update todo"
      throw error.value
    }
  }

  const deleteTodo = async (id) => {
    error.value = null
    try {
      await api.delete(`/todos/${id}`)
      todos.value = todos.value.filter((t) => t.id !== id)
    } catch (err) {
      error.value = "Failed to delete todo"
      throw error.value
    }
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  }
})
