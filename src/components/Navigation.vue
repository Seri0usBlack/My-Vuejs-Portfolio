<template>
    <nav class="sidebar">
      <ul>
      <li
        v-for="section in sections"
        :key="section.id"
        :class="{ active: section.id === activeSection }"
      >
        {{ section.name }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Navigation',
  props: {
    activeSection: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sections: [
        { id: 'About', name: 'About' },
        { id: 'Projects', name: 'Projects' },
        { id: 'TechStack', name: 'Tech Stack' },
        { id: 'Contact', name: 'Contact' },
      ]
    }
  }
}
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
    background-color: rgba(164, 158, 158, 0.081);
}


</style>
