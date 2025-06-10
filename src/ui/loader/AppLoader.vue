<template>
  <div class="app-loader">
    <span class="loader" />
  </div>
</template>
  
  <script setup>
  </script>
  
  <style scoped lang="scss">
  .app-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  .loader {
    width: 3rem;
    height: 3rem;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: var(--app-blue);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>