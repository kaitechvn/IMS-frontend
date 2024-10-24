import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axiosInstance from '@/plugins/axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';
import PAGES from '@/constants/pages';
import { login, forgotPassword, resetPassword } from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  const userRole = ref(localStorage.getItem('userRole') || null);
  const router = useRouter();
  const isAuthenticated = computed(() => !!userRole.value);

  async function loginUser(username, password) {
    try {
      const response = await login(username, password);
      const accessToken = response.data.data.accessToken;

      localStorage.setItem('access_token', accessToken);

      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${accessToken}`;

      const decodedToken = jwtDecode(accessToken);

      userRole.value = decodedToken.role;
      localStorage.setItem('userRole', decodedToken.role);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async function forgotPass(email) {
    try {
      const response = await forgotPassword(email);
      successMessage.value = response.data.message;
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'An error occurred while sending the reset link';
    }
  }

  async function resetPass(token, newPassword) {
    try {
      const response = await resetPassword(token, newPassword);
      successMessage.value = response.data.message;
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'An error occurred while resetting the password';
    }
  }

  function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userRole');

    delete axiosInstance.defaults.headers.common['Authorization'];

    userRole.value = null;

    router.push('/login');
  }

  return {
    isAuthenticated,
    userRole,
    loginUser,
    logout,
    resetPass,
    forgotPass,
  };
});
