<template>
    <nav class="sidebar">
        <ul>
            <li v-for="section in sections" 
            :key="section.id"
            :class="{ active: isActive(section.id) }"
            @click="setActive(section.id)">
                {{ section.name }}
            </li>
        </ul>
        <p>&copy;Meunier Marc <br>All reserved rights</p>
    </nav>

</template>





<script lang="ts">
export default {
  name: 'Navigation',
  data() {
    return {
      activeSection: 'about',  // Section active par défaut
      // Tableau des sections de la sidebar
      sections: [
        { id: 'about', name: 'About' },
        { id: 'projects', name: 'Projects' },
        { id: 'skills', name: 'Tech Stack' },
        { id: 'contact', name: 'Contact' },
      ],
    };
  },
  methods: {
    setActive(sectionId) {
      this.activeSection = sectionId;
    },
    isActive(sectionId) {
      return this.activeSection === sectionId;
    },
  },
};
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
  padding: 0;
}

.sidebar li {
    margin-bottom: 25px;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: hover 0.4s ease-in-out;
  padding: 2px 15px;
  border-radius: 20px;

}

.sidebar li:hover{
  background-color: rgba(164, 158, 158, 0.081);
}

.sidebar ul li.active{
    color: #fff;
}


</style>
