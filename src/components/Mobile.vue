<template>
  <div class="mobile-scroll-wrapper">
    <component v-for="(SlideComponent, index) in slides"
               :is="SlideComponent"
               :key="index"
               class="mobile-slide" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import About from './About.vue';
import Projects from './Projects.vue';
import TechStack from './TechStack.vue';
import Contact from './Contact.vue';

export default defineComponent({
  name: 'Mobile',
  data() {
    return {
      slides: [About, Projects, TechStack, Contact],
    };
  },
});
</script>

<style scoped>
.mobile-scroll-wrapper {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
  width: 100%;
}

.mobile-slide{
  height: 100vh;
}
</style>