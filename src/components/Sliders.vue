<template>
    <div class="slider-container">
        <Navigation :active-index="activeIndex" :titles="slidesTitles" />
    

        <div class="slides-viewport">
            <div class="slides-wrapper" ref="slidesWrapper">
                <component v-for="(SlideComponent, index) in slides"
                :is="SlideComponent" :key="index" class="slide" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {ref, onMounted } from 'vue';
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
        const slidesTitles = ['About', 'Projects', 'Tech Stack', "Contact"];

        const animateSlide = (index) =>{
            gsap.to(slidesWrapper.value, {
                y: -index * window.innerHeight,
                duration: 1,
                ease: "power2.inOut"
            });
        };

        onMounted(() => {
            setInterval(() => {
                const nextIndex = (activeIndex.value + 1) % slides.length;
                activeIndex.value = nextIndex;
                animateSlide(nextIndex);
            }, 4000);
        });

        return { activeIndex, slidesWrapper, slides, slidesTitles};
    
    }
}

</script>


<style scoped>

.sliders-container {
  display: flex;
}

.slides-viewport {
  overflow: hidden;
  height: 100vh;
  width: 100%;
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