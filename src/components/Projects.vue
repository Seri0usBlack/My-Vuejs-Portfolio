<template>
    <div class="projects-container">
      <div
        class="project-item"
        v-for="(img, index) in images"
        :key="index"
      >
      <div class="media-wrapper" @click="openInfo_projects($event, img)" style="cursor: pointer;">
        <img :src="img.src" alt="image projet prototype"/>
        <img :src="img.src2" class="img_item2" style="border-radius: 20px;" />
        <div class="media-wrapper-description">
          <p>{{img.wrapper_description}}</p>
          <span class="material-icons">north_east</span>
        </div>

      </div>



      </div>
        <div class="overlay_projects" 
        v-show="activeInfo_projects" 
        @click="closeInfo_projects">
        </div>

      <div class="info-box-projects" 
      ref="infoBox_projects" 
      v-show="activeInfo_projects">
          <div class="close-btn" @click="closeInfo_projects">X</div>

          <div class="info-projects-content">
            <h1 class="title_projects">{{ activeInfo_projects?.title }}</h1>
            <img :src="activeInfo_projects?.src" alt="project preview"  />

            <div class="description_projects">
              <p><span>Type:</span> {{ activeInfo_projects?.type }}</p>
              <p><span>Context:</span> {{ activeInfo_projects?.context }}</p>
              <p><span>Technologies:</span> {{ activeInfo_projects?.technologies }}</p>
              <p><span>Description:</span> {{ activeInfo_projects?.description }}</p>
            </div>
          </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { nextTick, ref, onMounted, onBeforeUnmount } from 'vue';
  import mobileAppImage_TML from '../assets/photo_TML.png';
  import mobileAppImage_TML_2 from '../assets/photo_TML_2.png';
  import mobileAppImage_R from '../assets/photo_R.png';
  import mobileAppImage_R_2 from '../assets/photo_R_2.png';
  import gsap from 'gsap';
  import Flip from 'gsap/Flip';
  import Draggable from 'gsap/Draggable';
  
  gsap.registerPlugin(Flip, Draggable);
  
  interface Project {
    src: string;
    src2: string;
    title: string;
    type: string;
    technologies: string;
    context: string;
    description: string;
    wrapper_description: string;
  }
  
  const infoBox_projects = ref<HTMLElement | null>(null);
  

  const activeInfo_projects = ref<Project | null>(null);
  const isAnimating_projects = ref(false);
  
  const images = ref<Project[]>([
    {
      src: mobileAppImage_TML,
      src2: mobileAppImage_TML_2,
      wrapper_description: 'Check it out !',
      description: 'This project demonstrates my front-end development abilities through a responsive and visually enhanced web page',
      title: 'Taxi Martin Lucas',
      type: 'Personal project',
      technologies: 'HTML - CSS - JavaScript - GSAP',
      context: "A modern redesign of a local taxi company's website",
    },
    {
      src: mobileAppImage_R,
      src2: mobileAppImage_R_2,
      wrapper_description: 'Check it out !',
      description: 'Redesign of the homepage of a luxury watch brand, focusing on a sleek, modern design that highlights the iconic watches.',
      title: 'Rolex',
      type: 'Personal project',
      technologies: 'HTML - CSS - JavaScript - GSAP',
      context: 'Modern redesign of a luxury watch brand homepage',
    },
  ]);
  
  const openInfo_projects = (e: MouseEvent, item: Project) => {
    const box_projects = infoBox_projects.value;
    if (!box_projects || isAnimating_projects.value) return;
  
    const prjcts = e.currentTarget as HTMLElement;
    const prjctsRect = prjcts.getBoundingClientRect();
  
    if (activeInfo_projects.value) {
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
  
  const closeInfo_projects = (eventOrCallback?: MouseEvent | (() => void)) => {
  const onClosed = typeof eventOrCallback === 'function' ? eventOrCallback : undefined;
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
  
    if (infoBox_projects.value) {
      Draggable.create(infoBox_projects.value, {
        bounds: 'body',
        edgeResistance: 1,
        type: 'x,y',
        inertia: true,
  
        onDragStart() {
          gsap.to(infoBox_projects.value, {
            scaleX: 1.25,
            scaleY: 1.25,
            duration: 0.2,
            ease: 'power1.out',
          });
        },
  
        onDragEnd() {
          gsap.to(infoBox_projects.value, {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'elastic.out(1.5, 0.4)',
          });
        },
  
        onClick: () => {},
      });
    }
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


    .media-wrapper{
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 7px;
      padding-bottom: 10px;
      background-color: rgba(162, 162, 162,0.2);
      border-radius: 20px;
      overflow: hidden;
    }

    .media-wrapper img{
        max-width: 100%;
        border-radius: 10px;
        display: block;
        transition: all 0.7s ease-in-out;
    }

    .media-wrapper .img_item2 {
      position: absolute;
      width: 100%;
      padding: 7px;
      top: 0;
      left: 0;
      opacity: 0;
    }

    .media-wrapper:hover .img_item {
    opacity: 0;
  }

  .media-wrapper:hover .img_item2 {
    opacity: 1;
  }
    .media-wrapper-description{
      margin-left: 10px;
      margin-top: 10px;
      display: flex;
      color: #fff;
    }

    .media-wrapper-description span{
      padding-left: 7px;
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
  }

  .info-projects-content h1{
    margin-bottom: 10px;
    font-weight: bold;
    text-transform: uppercase;
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

.description_projects{
  margin-top: 1rem;
}
.description_projects span{
  font-weight: bold;
  color: rgb(162, 162, 162);
  font-size: 1.2rem;
}

.description_projects p{
  padding: 5px;
}

@media (max-width: 431px) {

  .projects-container {
    flex-direction: column;
    padding: 1rem;
    align-items: center;
    justify-content: flex-start;
  }

  .media_wrapper :hover .img_item{
    opacity: 1;
  }

  .media-wrapper :hover .img_item2{
    opacity: 0;
  }
  .media-wrapper img{
    width: 100%;
  }
  
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