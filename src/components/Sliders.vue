<template>
    <About />
    <Projects />
    <TechStack />
    <Contact />

</template>

<script lang="ts">
import About from './About.vue';
import Projects from "./Projects.vue";
import TechStack from "./TechStack.vue";
import Contact from "./Contact.vue";

export default {
    name:"Sliders",
    components: {
        About,
        Projects,
        TechStack,
        Contact,

    }
}

</script>


<style scoped>

</style>