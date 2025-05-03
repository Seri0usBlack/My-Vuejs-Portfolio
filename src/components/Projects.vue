<template>
    <div class="projects-container">
      <div
        class="project-item"
        v-for="(img, index) in images"
        :key="index"
      >
        <img :src="img.src" alt="image projet prototype" @click="openInfo_projects($event, img)" class="img_item"/>
        <p>{{ img.description }}</p>

      </div>
      <div class="overlay_projects" v-show="activeInfo_projects" @click="closeInfo_projects"></div>
      <div class="info-box-projects" ref="infoBox_projects" v-show="activeInfo_projects">
          <div class="close-btn" @click="closeInfo_projects">X</div>
          <div class="info-projects-content">
            <img :src="activeInfo_projects?.src" alt="project preview"  />
            <p>{{ activeInfo_projects?.description }}</p>
          </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import {nextTick, ref, onMounted, onBeforeUnmount } from 'vue';
  import mobileAppImage_TML from '../assets/photo_TML.png';
  import mobileAppImage_R from '../assets/photo_R.png'
  import gsap from 'gsap';
  import Flip from 'gsap/Flip';
  import Draggable from 'gsap/Draggable';
gsap.registerPlugin(Flip, Draggable);

  const infoBox_projects = ref(null);
  const activeInfo_projects = ref<{ src: string; description: string} | null>(null);
  const isAnimating_projects = ref(false);

  const images = ref([
  { src: mobileAppImage_TML, description: 'Description du projet 1' },
  { src: mobileAppImage_R, description: 'Description du projet 2' },
]);

const openInfo_projects = (e: MouseEvent, item: { src: string; description: string}) =>{
  const box_projects = infoBox_projects.value;
  if (!box_projects || isAnimating_projects.value) return;

  const prjcts = e.currentTarget as HTMLElement;
  const prjctsRect = prjcts.getBoundingClientRect();

  if (activeInfo_projects.value){
    closeInfo_projects(() => openInfo_projects(e, item));
    return;
  }

  const state = Flip.getState(box_projects);
  activeInfo_projects.value = item;

  nextTick(() => {
    Object.assign(box_projects.style, {
      position: 'fixed',
            top: `${prjctsRect.top}px`,
            left: `${prjctsRect.left}px`,
            width: `${prjctsRect.width}px`,
            height: `${prjctsRect.height}px`,
            display: 'block',
            opacity: '1',
          });

          isAnimating_projects.value = true;

          Flip.from(state, {
            duration: 1.5,
            ease: 'power2.inOut',
            absolute: true,
            onEnter: () => {
              gsap.to(box_projects, {
                duration: 1,
                maxWidth: '620px',
                height: 'auto',
                top: '5vh',
                left: '50%',
                x: '-50%',
                borderRadius: '15px',
                padding: '2rem',
                backgroundColor: '#1f1f1f',
                color: '#fff',
                onComplete: () => {
                  isAnimating_projects.value = false;
                },
              });
            },
          });
        });
      };

      const closeInfo_projects = (onClosed?: () => void) =>{
        const box_projects = infoBox_projects.value;
        if (!box_projects || isAnimating_projects.value) return;

        isAnimating_projects.value = true;

        gsap.to(box_projects, {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.5,
          onComplete: () => {
            activeInfo_projects.value = null;
            gsap.set(box_projects, { clearProps: 'all' });
            isAnimating_projects.value = false;
            if (onClosed) onClosed();
          },
        });
      };

      const handleClickOutside_projects = (event: MouseEvent) => {
        const box_projects = infoBox_projects.value;
        const target = event.target as HTMLElement;
  
        if (
          box_projects &&
          activeInfo_projects.value &&
          !box_projects.contains(target) &&
          !target.closest('.project-item')
        ) {
          closeInfo_projects();
        }
      };

      onMounted(() => {
        window.addEventListener('click', handleClickOutside_projects);

        Draggable.create(infoBox_projects.value, {
          bounds: "body",
          edgeResistance: 1,
          type: "x,y",
          inertia: true,
    
    onDragStart() {
      gsap.to(infoBox_projects.value, {
        scaleX: 1.25,
        scaleY: 1.25,
        duration: 0.2,
        ease: "power1.out",
      });
    },
    
    onDragEnd() {
      gsap.to(infoBox_projects.value, {
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
        window.removeEventListener('click', handleClickOutside_projects);
      });

  </script>
    
    

    <style scoped>

    .projects-container{
        height: 100vh;
        display: flex;
        justify-content: center;
        gap: 2rem;
    }

    .project-item{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .project-item img{
        width: 80%;
        max-width: 100%;
    }

    .project-item p {
  font-size: 1rem;
  color: #333;
}
  .overlay_projects {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    z-index: 999;
  }

  .info-box-projects {
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


  .info-projects-content {
    display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 2rem;
  }

.info-projects-content img {
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 1rem;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
}

.info-box-projects {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE/Edge */
}

.info-box-projects::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

@media (max-width: 430px) {
  
  .info-box-projects {
    width: 90vw !important;
    height: auto !important;
    top: 5vh !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    padding: 1rem !important;
    border-radius: 10px !important;
  }

  .info-projects-content img {
    width: 100%;
  }
}
    </style>