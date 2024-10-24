<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-logo">
        <img src="@/assets/login-logo.jpg" alt="Company Logo" />
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <form @submit.prevent="login" class="login-form">
        <div class="input-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <div class="forgot-password">
        <router-link to="/forgot-password">Forgot password</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  background-color: white;
  padding: 34px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

.login-logo img {
  width: 200px;
}

.login-form {
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

.login-button {
  background-color: #ec8448;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #d4733a;
}

.forgot-password {
  margin-top: 10px;
  text-align: left;
}

.forgot-password a {
  color: #462e1f;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}
</style>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const authStore = useAuthStore();

async function login() {
  try {
    await authStore.login(username.value, password.value);
  } catch (error) {
    errorMessage.value = "Invalid username or password";
  }
}
</script>
