<template>
  <div class="sliders-container">
    <div class="sidebar" v-if="!isMobile">
      <Navigation :activeSection="currentSection" @updateActiveSection="goToSection" />
    </div>

    <!-- Scroll vertical natif avec snapping fluide -->
    <div  class="slides-viewport" aria-live="polite">
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
    <!-- <Mobile v-else /> -->
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import About from './About.vue';
import Projects from './Projects.vue';
import TechStack from './TechStack.vue';
import Contact from './Contact.vue';
import Navigation from './Navigation.vue';
import Mobile from './Mobile.vue';

export default {
  components: {
    Navigation,
    About,
    Projects,
    TechStack,
    Contact,
    Mobile,
  },

  setup() {
    const slidesWrapper = ref(null);
    const isMobile = computed(() => window.innerWidth <= 768);

    const slides = [About, Projects, TechStack, Contact];
    const sections = ['About', 'Projects', 'TechStack', 'Contact'];
    const currentSection = ref(sections[0]);

    const goToSection = (sectionId: string) => {
      currentSection.value = sectionId;
      const el = document.getElementById(sectionId);
      if (el) {
        slidesWrapper.value?.scrollTo({
  top: el.offsetTop,
  behavior: 'smooth',
});
      }
    };

    onMounted(() => {
  
      const onScroll = () => {
        const scrollTop = slidesWrapper.value?.scrollTop || 0;
        const index = Math.round(scrollTop / window.innerHeight);
        currentSection.value = sections[index];
      };
      slidesWrapper.value?.addEventListener('scroll', onScroll);
    });

    return {
      slidesWrapper,
      slides,
      isMobile,
      sections,
      currentSection,
      goToSection,
    };
  },
};
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
  overflow: hidden;
  width: 75%;
  height: 100vh;
  position: relative;
}


.slides-wrapper {
  overflow-y: scroll;
  height: 100vh;
}

.slide {
  scroll-snap-align: start;
  height: 100vh;
  width: 100%;
}

.slides-wrapper::-webkit-scrollbar {
  display: none;
}
.slides-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .slides-viewport {
    width: 100%;
  }
}
</style>