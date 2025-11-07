import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../api/client';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);
  const loading = ref(false);
  const error = ref(null);

  // Computed
  const isAuthenticated = computed(() => !!token.value);

  // Actions
  const register = async (email, password, name) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
      });
      token.value = response.data.data.token;
      user.value = response.data.data.user;
      localStorage.setItem('token', token.value);
      return response.data.data;
    } catch (err) {
      error.value = err.response?.data?.errors[0].msg || 'Registration failed';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  const login = async (email, password) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      console.log(response);
      token.value = response.data.data.token;
      user.value = response.data.data.user;
      localStorage.setItem('token', token.value);
      return response.data.data;
    } catch (err) {
      error.value = err.response?.data?.errors[0].msg || 'Login failed';
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    error.value = null;
  };

  const updateUser = (userData) => {
    user.value = userData;
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    updateUser,
  };
});
