<template>
    <div class="about-container">

        <div class="left-container">
            <img src="../assets/photo.png" class="photo">
        </div>
        <div class="right-container">
            <h1>Marc M.</h1>
            <h3><i>"Front-end builder & Pentester :<br> beau, rapide, sécurisé."</i></h3>
            <div class="social-media-container">
                <a href="https://github.com/Seri0usBlack"><ion-icon name="logo-github"></ion-icon></a>
                <a href="https://www.linkedin.com/in/marc-antoine-meunier-48736020a/"><ion-icon name="logo-linkedin"></ion-icon></a>
                <a :href="cv" download="CV_Marc.pdf"><button>Download my resume</button></a>
            </div>
        </div>
    </div>

    
    </template>
    
    <script lang="ts">
    export default {
        data() {
            return {
                // Implémenter cv download ici
            }
        
        },
    };
    
    </script>
    
    
    <style scoped>

    .about-container{
        height: 100vh;
        display: flex;
        align-items: center;
        width: 100%;
        margin-left: 10%;
    }

    .right-container{
        margin-left: 2%;
    }
    .right-container h1{
        color: rgb(162, 162, 162);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .right-container h3{
        color: rgb(126, 124, 124);
        margin-top: 5px;
    }

    .photo{
        max-width: 350px;
        border-radius: 100%;
        width: 100%;
    }

    .social-media-container{
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .social-media-container ion-icon{
        font-size: 1.8rem;
        color: #fff;
        transition: color 0.4s ease-in-out;
    }

    .social-media-container button{
        border-radius: 20px;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding: 4px;
        font-weight: bold;
        transition: background-color 0.4s ease-in-out;
        cursor: pointer;
        color: black;
    }

    .social-media-container button:hover{
        background-color: rgb(162,162,162);
    }

    .social-media-container ion-icon:hover{
        color: rgb(162,162,162);
    }

    @media (max-width: 1024px) {
  .about-container {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 0;
    text-align: center;
    padding: 2rem;
    gap: 1rem;
  }

  .left-container {
    margin-bottom: 1.5rem;
  }

  .photo {
    max-width: 250px;
  }

  .right-container {
    margin-left: 0;
  }

  .social-media-container {
    flex-direction: column;
    gap: 0.8rem;
  }

  .social-media-container button {
    width: 70%;
    padding: 8px;
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .photo {
    max-width: 180px;
  }

  .right-container h1 {
    font-size: 1.4rem;
  }

  .right-container h3 {
    font-size: 1rem;
  }

  .social-media-container ion-icon {
    font-size: 2.5rem;
  }

  .social-media-container button {
    width: 100%;
    font-size: 0.9rem;
    color: black;
  }
}
    
    </style>