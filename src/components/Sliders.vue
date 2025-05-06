<template>
  <div class="sliders-container">
    <!-- Sidebar (desktop only) -->
    <div class="sidebar" v-if="!isMobile">
      <Navigation :activeSection="currentSection" @updateActiveSection="goToSection" />
    </div>

    <!-- Desktop version -->
    <div v-if="!isMobile" class="slides-viewport" aria-live="polite">
      <div class="slides-wrapper" ref="slidesWrapper">
        <component
          v-for="(SlideComponent, index) in slides"
          :is="SlideComponent"
          :key="index"
          class="slide"
          :id="sections[index]"
          :aria-label="'Section ' + sections[index]"
          tabindex="0"
        />
      </div>
    </div>

    <!-- Mobile version -->
    <component v-else :is="Mobile" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import About from './About.vue';
import Projects from './Projects.vue';
import TechStack from './TechStack.vue';
import Contact from './Contact.vue';
import Navigation from './Navigation.vue';
import Mobile from './Mobile.vue';

const slidesWrapper = ref<HTMLElement | null>(null);
const slides = [About, Projects, TechStack, Contact];
const sections = ['About', 'Projects', 'TechStack', 'Contact'];
const currentSection = ref(sections[0]);
const isMobile = ref(false);

const goToSection = (sectionId: string) => {
  currentSection.value = sectionId;
  const el = document.getElementById(sectionId);
  if (el && slidesWrapper.value) {
    slidesWrapper.value.scrollTo({
      top: el.offsetTop,
      behavior: 'smooth',
    });
  }
};

const onScroll = () => {
  const scrollTop = slidesWrapper.value?.scrollTop || 0;
  const index = Math.round(scrollTop / window.innerHeight);
  currentSection.value = sections[index] || sections[0];
};

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;

  if (!isMobile.value && slidesWrapper.value) {
    slidesWrapper.value.addEventListener('scroll', onScroll);
  }
});

onBeforeUnmount(() => {
  slidesWrapper.value?.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.sliders-container {
  display: flex;
  height: 100vh;
  background-color: #242424;
}

.sidebar {
  width: 25%;
}

.slides-viewport {
  width: 75%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.slides-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}

.slide {
  scroll-snap-align: start;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
}

.slides-wrapper::-webkit-scrollbar {
  display: none;
}

.slides-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .slides-viewport {
    width: 100%;
  }
}
</style>