<template>
  <div class="stack-container">
    <div class="languages-container">
      <h1>Languages</h1>
      <ul>
        <li
          v-for="language in languages"
          :key="language.name"
          class="stack-item"
          @click="openInfo($event, language)"
        >
          {{ language.name }}
        </li>
      </ul>
    </div>

    <div class="frameworks-container">
      <h1>Frameworks</h1>
      <ul>
        <li
          v-for="fw in frameworks"
          :key="fw.name"
          class="stack-item"
          @click="openInfo($event, fw)"
        >
          {{ fw.name }}
        </li>
      </ul>
    </div>

    <div class="libraries-container">
      <h1>Libraries</h1>
      <ul>
        <li
          v-for="lib in libraries"
          :key="lib.name"
          class="stack-item"
          @click="openInfo($event, lib)"
        >
          {{ lib.name }}
        </li>
      </ul>
    </div>

    <!-- Info Box -->
    <div class="overlay" v-show="activeInfo" @click="closeInfo"></div>
    <div class="info-box" ref="infoBox" v-show="activeInfo">
      <div class="close-btn" @click="closeInfo">X</div>
      <div class="info-content">
        <h2>{{ activeInfo?.name }}</h2>
        <p>{{ activeInfo?.description }}</p>
      </div>
      <p class="drg">{{ activeInfo?.drag }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import Flip from 'gsap/Flip';
import Draggable from 'gsap/Draggable';

gsap.registerPlugin(Flip, Draggable);

const infoBox = ref<HTMLElement | null>(null);
const activeInfo = ref<{ name: string; description: string; drag: string } | null>(null);
const isAnimating = ref(false);

const languages = [
  { name: 'HTML', description: 'The standard language for structuring content on the web (headings, paragraphs, images, links, etc.).', drag: 'Maintiens le clique pour me déplacer' },
  { name: 'CSS', description: 'A styling language used to define the visual appearance of HTML elements (colors, fonts, layouts, etc.).', drag: 'Maintiens le clique pour me déplacer' },
  { name: 'SCSS', description: 'A CSS preprocessor that adds advanced features like variables, nesting, mixins, and functions to streamline styling.', drag: 'Maintiens le clique pour me déplacer' },
  { name: 'Javascript', description: 'A programming language that adds interactivity and dynamic behavior to web pages (animations, form validation, logic, etc.).', drag: 'Maintiens le clique pour me déplacer' },
  { name: 'TypeScript', description: 'A strongly typed superset of JavaScript that adds static typing, interfaces, and modern features to help catch errors early and improve code quality during development.', drag: 'Maintiens le clique pour me déplacer' },
];

const frameworks = [
  { name: 'VueJS', description: 'A progressive JavaScript framework for building user interfaces and single-page applications (SPAs).', drag: 'Maintiens le clique pour me déplacer' },
  { name: 'Nuxt', description: 'A Vue-based framework for building server-rendered, static, or hybrid web applications with ease and best practices built-in.', drag: 'Maintiens le clique pour me déplacer' },
  { name: 'Vite', description: 'A modern, lightning-fast build tool and development server for front-end projects, especially with frameworks like Vue.js and React.', drag: 'Maintiens le clique pour me déplacer' },
];

const libraries = [
  { name: 'GSAP', description: 'A powerful JavaScript library for creating high-performance, complex animations with smooth transitions.', drag: 'Maintiens le clique pour me déplacer' },
  { name: 'Pinia', description: 'The official state management library for Vue.js, designed to be simpler and more intuitive than Vuex.', drag: 'Maintiens le clique pour me déplacer' },
  { name: 'Vuetify', description: 'A Material Design component framework for Vue.js, providing ready-to-use UI components for responsive, modern web apps.', drag: 'Maintiens le clique pour me déplacer' },
];

const openInfo = (e: MouseEvent, item: { name: string; description: string; drag: string }) => {
  const box = infoBox.value;
  if (!box || isAnimating.value) return;

  const li = e.currentTarget as HTMLElement;
  const liRect = li.getBoundingClientRect();

  if (activeInfo.value) {
    closeInfo(() => openInfo(e, item));
    return;
  }

  const state = Flip.getState(box);
  activeInfo.value = item;

  nextTick(() => {
    Object.assign(box.style, {
      position: 'fixed',
      top: `${liRect.top}px`,
      left: `${liRect.left}px`,
      width: `${liRect.width}px`,
      height: `${liRect.height}px`,
      opacity: '1',
    });

    isAnimating.value = true;

    Flip.from(state, {
      duration: 1.5,
      ease: 'power2.inOut',
      absolute: true,
      onEnter: () => {
        gsap.to(box, {
          duration: 1,
          maxWidth: '620px',
          height: '320px',
          top: '20vh',
          left: '50%',
          x: '-50%',
          borderRadius: '15px',
          padding: '2rem',
          backgroundColor: '#1f1f1f',
          color: '#fff',
          onComplete: () => {
            isAnimating.value = false;
          },
        });
      },
    });
  });
};

const closeInfo = (eventOrCallback?: MouseEvent | (() => void)) => {
  const onClosed = typeof eventOrCallback === 'function' ? eventOrCallback : undefined;

  const box = infoBox.value;
  if (!box || isAnimating.value) return;

  isAnimating.value = true;

  gsap.to(box, {
    autoAlpha: 0,
    scale: 0.8,
    duration: 0.5,
    onComplete: () => {
      activeInfo.value = null;
      gsap.set(box, { clearProps: 'all' });
      isAnimating.value = false;
      if (onClosed) onClosed();
    },
  });
};

const handleClickOutside = (event: MouseEvent) => {
  const box = infoBox.value;
  const target = event.target as HTMLElement;

  if (
    box &&
    activeInfo.value &&
    !box.contains(target) &&
    !target.closest('.stack-item')
  ) {
    closeInfo();
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);

  Draggable.create(infoBox.value!, {
    bounds: "body",
    edgeResistance: 1,
    type: "x,y",
    inertia: true,

    onDragStart() {
      gsap.to(infoBox.value, {
        scaleX: 1.25,
        scaleY: 1.25,
        duration: 0.2,
        ease: "power1.out",
      });
    },

    onDragEnd() {
      gsap.to(infoBox.value, {
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        duration: 0.4,
        ease: "elastic.out(1.5, 0.4)",
      });
    },
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.stack-container {
  text-transform: uppercase;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 2rem;
}

.stack-container h1 {
  color: rgb(162, 162, 162);
  display: flex;
  justify-content: center;
}

.stack-container ul {
  list-style-type: none;
  color: #fff;
}

.stack-container li {
  color: #fff;
  border-bottom: 1px solid rgba(164, 158, 158, 0.5);
  margin: 5px;
  transition: all 0.4s ease-in-out;
  padding: 5px 15px;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
}

.stack-container li:hover {
  scale: 1.05;
  background-color: rgba(164, 158, 158, 0.2);
  border-radius: 20px;
}

.languages-container {
  grid-column: span 2;
  width: 100%;
  padding: 5px 15px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  z-index: 999;
}

.info-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 2rem;
}

.info-content h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.drg {
  font-size: 0.7rem;
  color: #aaa;
}

.info-box {
  position: fixed;
  z-index: 1000;
  background: #1f1f1f;
  color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  padding: 1rem;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
}

@media screen and (max-width: 768px) {
  .info-box {
    width: 90vw !important;
    max-width: 90vw !important;
    height: auto;
    padding: 1.5rem;
    font-size: 1rem;
  }

  .info-content h2 {
    font-size: 1.8rem;
  }
}

@media screen and (max-width: 430px) {
  .stack-container li {
    font-size: 1.5rem;
    padding: 5px 10px;
  }

  .stack-container h1 {
    font-size: 1.5rem;
  }

  .info-content h2 {
    font-size: 1.5rem;
  }

  .info-box {
    font-size: 0.9rem;
    padding: 1rem;
  }
}
</style>