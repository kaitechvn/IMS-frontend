<template>
    <footer class="footer">
      <p>© {{ currentYear }} VMO Academy. All Rights Reserved.</p>
    </footer>
  </template>
  
  <script setup>
  const currentYear = new Date().getFullYear();
  </script>
  
  <style scoped>
  .footer {
    background-color: #f8f9fa; 
    padding: 20px;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: 14px;
    color: #2d353d; 
  }
  </style>
  