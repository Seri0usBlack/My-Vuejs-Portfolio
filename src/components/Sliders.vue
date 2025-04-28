<template>
    <div class="sliders-container">
        <div class="sidebar">
            <Navigation :activeSection="currentSection" @updateActiveSection="goToSection" />
        </div>
        
    

        <div class="slides-viewport">
            <div class="slides-wrapper" ref="slidesWrapper">
                <component v-for="(SlideComponent, index) in slides"
                :is="SlideComponent" :key="index" class="slide" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import About from './About.vue';
import Projects from "./Projects.vue";
import TechStack from "./TechStack.vue";
import Contact from "./Contact.vue";
import Navigation from "./Navigation.vue"

export default {
    components: {
        Navigation,
        About,
        Projects,
        TechStack,
        Contact
    },
    setup() {
        const activeIndex = ref(0);
        const slidesWrapper = ref(null);

        const slides = [About, Projects, TechStack, Contact];
        const sections = ['About', 'Projects', 'TechStack', 'Contact'];
        const currentSection = computed(() => sections[activeIndex.value]);

        const animateSlide = (index) => {
  gsap.to(slidesWrapper.value, {
    y: -index * window.innerHeight,
    duration: 1,
    ease: 'power2.inOut',
  });
};

const handleWheel = (event) => {
  if (event.deltaY > 0) {
    // Molette vers le bas
    const nextIndex = (activeIndex.value + 1) % sections.length;
    activeIndex.value = nextIndex;
    animateSlide(nextIndex);
  } else {
    // Molette vers le haut
    const prevIndex = (activeIndex.value - 1 + sections.length) % sections.length;
    activeIndex.value = prevIndex;
    animateSlide(prevIndex);
  }
};


const goToSection = (sectionId) => {
  const index = sections.indexOf(sectionId);
  if (index !== -1) {
    activeIndex.value = index;
    animateSlide(index);
  }
};

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleWheel);
});

 return { activeIndex, slidesWrapper, currentSection, slides, goToSection};
    
  }
}

</script>


<style scoped>

.sliders-container {
  display: flex;
  height: 100vh;
  background-color: #242424;
}

.sidebar{
    width: 25%;
}
.slides-viewport {
  overflow: hidden;
  width: 75%;
  height: 100vh;
  position: relative;
}

.slides-wrapper {
  display: flex;
  flex-direction: column;
}

.slide {
  height: 100vh;
  width: 100%;
}
</style>