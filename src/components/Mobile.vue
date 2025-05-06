<template>
  <div class="mobile-scroll-wrapper" ref="scrollWrapper">
    <component
      v-for="(SlideComponent, index) in slides"
      :is="SlideComponent"
      :key="index"
      class="mobile-slide"
      :id="sections[index]"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import About from './About.vue';
import Projects from './Projects.vue';
import TechStack from './TechStack.vue';
import Contact from './Contact.vue';

const scrollWrapper = ref<HTMLElement | null>(null);
const slides = [About, Projects, TechStack, Contact];
const sections = ['About', 'Projects', 'TechStack', 'Contact'];


const onScroll = () => {
};

onMounted(() => {
  if (scrollWrapper.value) {
    scrollWrapper.value.addEventListener('scroll', onScroll);
  }
});

onBeforeUnmount(() => {
  if (scrollWrapper.value) {
    scrollWrapper.value.removeEventListener('scroll', onScroll);
  }
});
</script>

<style scoped>
.mobile-scroll-wrapper {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.mobile-slide {
  height: 100vh !important;
  scroll-snap-align: start;
  flex-shrink: 0;
}
</style>