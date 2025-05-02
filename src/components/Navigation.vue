<template>
    <nav class="sidebar" aria-label="Navigation principale">
      <ul>
      <li
        v-for="section in sections"
        :key="section.id"
        :class="{ active: section.id === activeSection }"
        @click="goToSection(section.id)"
        :aria-current="section.id === activeSection ? 'page' : null"
      >
        {{ section.name }}
      </li>
    </ul>
    <p>&copy; Serious Black <br> All reserved rights</p>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, defineEmits } from 'vue';

export default defineComponent({
  name: 'Navigation',
  props: {
    activeSection: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const sections = ref([
      { id: 'About', name: 'About' },
      { id: 'Projects', name: 'Projects' },
      { id: 'TechStack', name: 'Skills' },
      { id: 'Contact', name: 'Contact' },
    ]);

    const goToSection = (sectionId: string) => {
      // Utilisation de `emit` dans la Composition API
      emit('updateActiveSection', sectionId);
    };

    return {
      sections,
      goToSection
    };
  }
});
</script>

<style scoped>
.sidebar {
  width: 25%;
  background-color: #333;
  color: rgb(162, 162, 162);
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sidebar ul {
  list-style-type: none;
}

.sidebar li {
    margin-bottom: 25px;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: hover 0.4s ease-in-out;
  padding: 4px 15px;
  border-radius: 20px;
  text-align: center;
  letter-spacing: 2px;
  transition: all 0.3s ease;

}

.sidebar li:hover{
  background-color: rgba(164, 158, 158, 0.081);
}

.sidebar ul li.active{
    color: #fff;
    background-color: rgba(164, 158, 158, 0.081);
    transform: scale(1.2);
}


</style>
