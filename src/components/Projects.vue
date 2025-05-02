<template>
    <div class="projects-container">
      <div
        class="project-item"
        v-for="(img, index) in images"
        :key="index"
      >
        <img :src="img.src" alt="image projet prototype" />
        <p>{{ img.description }}</p>

      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import mobileAppImage_TML from '../assets/photo_TML.png';
  import mobileAppImage_R from '../assets/photo_R.png'

  const images = ref([
  { src: mobileAppImage_TML, description: 'Description du projet 1' },
  { src: mobileAppImage_R, description: 'Description du projet 2' },
]);

  </script>
    
    

    <style scoped>

    .projects-container{
        height: 100vh;
        display: flex;
        justify-content: center;
        gap: 2rem;
    }

    .project-item{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .project-item img{
        width: 80%;
        max-width: 100%;
    }

    .project-item p {
  font-size: 1rem;
  color: #333;
}
    </style>