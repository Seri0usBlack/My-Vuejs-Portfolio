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
            v-for="fw in framework"
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
            v-for="lib in library"
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
  import {nextTick, ref, onMounted, onBeforeUnmount } from 'vue';
  import gsap from 'gsap';
  import Flip from 'gsap/Flip';
  import Draggable from 'gsap/Draggable';
gsap.registerPlugin(Flip, Draggable);
  
      const infoBox = ref(null);
      const activeInfo = ref<{ name: string; description: string } | null>(null);
      const isAnimating = ref(false);
  
      const languages = [
        { name: 'HTML', description: 'Langage de balisage pour structurer le contenu web.', drag:'Maintiens le clique pour me déplacer' },
        { name: 'CSS', description: 'Langage de style pour mettre en forme le HTML.', drag:'Maintiens le clique pour me déplacer' },
        { name: 'SCSS', description: 'Préprocesseur CSS avec variables, mixins, etc.', drag:'Maintiens le clique pour me déplacer' },
        { name: 'Javascript', description: 'Langage de programmation côté client.', drag:'Maintiens le clique pour me déplacer' },
        { name: 'TypeScript', description: 'Superset de JS avec typage statique.', drag:'Maintiens le clique pour me déplacer' },
      ];
  
      const framework = [
        { name: 'VueJS', description: 'Framework JavaScript progressif pour construire des interfaces utilisateur.', drag:'Maintiens le clique pour me déplacer' },
        { name: 'Nuxt', description: 'Framework Vue pour créer des applications universelles (SSR).', drag:'Maintiens le clique pour me déplacer' },
        { name: 'Vite', description: 'Outil de build rapide pour projets front-end.', drag:'Maintiens le clique pour me déplacer' },
      ];
  
      const library = [
        { name: 'GSAP', description: 'Librairie d’animations ultra-performante pour le web.', drag:'Maintiens le clique pour me déplacer' },
        { name: 'Pinia', description: 'State management moderne pour Vue 3.', drag:'Maintiens le clique pour me déplacer' },
        { name: 'Vuetify', description: 'UI library avec Material Design pour Vue.', drag:'Maintiens le clique pour me déplacer' },
      ];
  
      const openInfo = (e: MouseEvent, item: { name: string; description: string }) => {
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
            display: 'block',
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
  
      const closeInfo = (onClosed?: () => void) => {
        const box = infoBox.value;
        if (!box || isAnimating.value) return;
  
        isAnimating.value = true;
  
        gsap.to(box, {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.3,
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

  Draggable.create(infoBox.value, {
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

    onClick() {
      event?.stopPropagation?.();
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

.info-content h2{
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
  display: none;
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
    width: 90vw!important;
    max-width: 90vw!important;
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