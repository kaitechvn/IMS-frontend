<template>
    <div class="reset-container">
      <div class="reset-card">
        <div class="reset-logo">
          <img src="@/assets/login-logo.jpg" alt="Company Logo" />
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
        <form @submit.prevent="submitResetPassword" class="reset-form">
          <div class="input-group">
            <label for="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              v-model="newPassword"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div class="input-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              v-model="confirmPassword"
              placeholder="Confirm your new password"
              required
            />
          </div>
          <button type="submit" class="reset-button">Reset Password</button>
        </form>
      </div>
    </div>
  </template>
  
  <style scoped>
  .reset-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .reset-card {
    background-color: white;
    padding: 34px;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
  }
  
  .reset-logo img {
    width: 200px;
  }
  
  .reset-form {
    display: flex;
    flex-direction: column;
  }
  
  .input-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .input-group label {
    font-size: 14px;
    color: #333;
    margin-bottom: 5px;
    display: block;
  }
  
  .input-group input {
    width: 94.5%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .error-message {
    color: red;
    margin-bottom: 15px;
    font-size: 14px;
  }
  
  .success-message {
    color: green;
    margin-bottom: 15px;
    font-size: 14px;
  }
  
  .reset-button {
    background-color: #ec8448;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .reset-button:hover {
    background-color: #d4733a;
  }
  </style>
  
  <script setup>
  import { ref } from "vue";
  import { useAuthStore } from "@/stores/authStore";
  import { useRoute, useRouter } from "vue-router";
  import PAGES from "@/constants/pages";
  
  const newPassword = ref("");
  const confirmPassword = ref("");
  const errorMessage = ref("");
  const successMessage = ref("");
  const authStore = useAuthStore();
  const route = useRoute();
  const router = useRouter();
  
  async function submitResetPassword() {
    if (newPassword.value !== confirmPassword.value) {
      errorMessage.value = "Passwords do not match";
      return;
    }
  
    try {
      const token = route.query.token; 
      await authStore.resetPassword(token, newPassword.value);
      successMessage.value = "Password reset successfully!";
      setTimeout(() => router.push(PAGES.LOGIN), 2000); 
    } catch (error) {
      errorMessage.value = "Failed to reset password. Please try again.";
    }
  }
  </script>
  