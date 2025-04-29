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
          <Mobile />
        </div>
</template>

<script lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import About from './About.vue';
import Projects from "./Projects.vue";
import TechStack from "./TechStack.vue";
import Contact from "./Contact.vue";
import Navigation from "./Navigation.vue";
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
    const activeIndex = ref(0);
    const slidesWrapper = ref(null);

    const slides = [About, Projects, TechStack, Contact];
    const sections = ['About', 'Projects', 'TechStack', 'Contact'];
    const currentSection = computed(() => sections[activeIndex.value]);

    const animateSlide = (index: number) => {
      gsap.to(slidesWrapper.value, {
        y: -index * window.innerHeight,
        duration: 1,
        ease: 'power2.inOut',
      });
    };

    const goToSection = (sectionId: string) => {
      const index = sections.indexOf(sectionId);
      if (index !== -1) {
        activeIndex.value = index;
        animateSlide(index);
      }
    };

    // Wheel scroll
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        const nextIndex = (activeIndex.value + 1) % sections.length;
        activeIndex.value = nextIndex;
        animateSlide(nextIndex);
      } else {
        const prevIndex = (activeIndex.value - 1 + sections.length) % sections.length;
        activeIndex.value = prevIndex;
        animateSlide(prevIndex);
      }
    };

    // Touch scroll (mobile)
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          const nextIndex = (activeIndex.value + 1) % sections.length;
          activeIndex.value = nextIndex;
          animateSlide(nextIndex);
        } else {
          const prevIndex = (activeIndex.value - 1 + sections.length) % sections.length;
          activeIndex.value = prevIndex;
          animateSlide(prevIndex);
        }
      }
    };


    onMounted(() => {
      window.addEventListener('wheel', handleWheel, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    });



    return {
      activeIndex,
      slidesWrapper,
      currentSection,
      slides,
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

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .slides-viewport {
    width: 100%;
  }
}
</style>