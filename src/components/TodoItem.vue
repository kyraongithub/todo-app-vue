<template>
  <div class="bg-white rounded-lg shadow-md p-6 flex items-start gap-4">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="handleToggle"
      class="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
    />

    <div class="flex-1">
      <h3
        :class="[
          'text-lg font-semibold',
          todo.completed ? 'line-through text-slate-400' : 'text-slate-900',
        ]"
      >
        {{ todo.title }}
      </h3>

      <p v-if="todo.description" class="text-slate-600 text-sm mt-1">
        {{ todo.description }}
      </p>

      <p class="text-slate-400 text-xs mt-2">
        {{ formatDate(todo.createdAt) }}
      </p>
    </div>

    <button
      @click="handleDelete"
      class="px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
    >
      Delete
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const { todo } = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update', 'delete']);

const handleToggle = () => {
  emit('update', todo.id, { completed: !todo.completed });
};

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this todo?')) {
    emit('delete', todo.id);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};
</script>
