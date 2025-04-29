<template>
    <div class="swipe-hint" v-if="isMobile">
      <p>Swipe to navigate</p>
      <ion-icon name="caret-down-outline"></ion-icon>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  export default {
    setup() {
      const isMobile = ref(false);
  
      const checkIfMobile = () => {
        isMobile.value = window.innerWidth <= 768;
      };
  
      onMounted(() => {
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
      });
  
      onBeforeUnmount(() => {
        window.removeEventListener('resize', checkIfMobile);
      });
  
      return {
        isMobile,
      };
    },
  };
  </script>
  
  <style scoped>
  .swipe-hint {
    opacity: 0.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(162, 162, 162);
    padding: 10px 20px;
    font-size: 15px;
    z-index: 10;
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
  0%, 100% {
    transform: translate(-50%, -40%);
  }
  50% {
    transform: translate(-50%, -60%);
  }
}
  </style>