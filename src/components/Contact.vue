<template>
  <div class="form-container">
    <h1 class="title-form">"Du code, du design, de la création ? On en parle ?"</h1>
    <form ref="form" @submit.prevent="sendEmail">
    <label for="Name">Name</label>
    <input type="text" name="user_name" v-model="formData.name" placeholder="YOUR NAME" required aria-required="true" aria-label="Votre nom complet" />

    <label for="Email">Email</label>
    <input type="email" name="user_email" v-model="formData.email" placeholder="YOUR EMAIL" required aria-required="true" aria-label="Votre adresse email" />

    <label for="Message">Message</label>
    <textarea name="message" v-model="formData.message" placeholder="YOUR MESSAGE" required aria-required="true" aria-label="Votre message"></textarea>

    <input type="submit" value="SEND" :disabled="!formData.message.trim()" class="btn" aria-label="Envoyer message"/>
  </form>
  </div>

    </template>
    
    <script lang="ts">
    import { ref } from 'vue';
    import emailjs from 'emailjs-com';
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';
    
    export default {
      setup() {
        const formData = ref({
          name: '',
          email: '',
          message: '',
        });

        const sendEmail = () => {
      emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
{
        from_name: formData.value.name,
        from_email: formData.value.email,
        message: formData.value.message,
      },   import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(() => {
        toast.success('Message Envoyé ! Merci', {
          autoClose: 5000,
        }); 
      
        formData.value = { name: '', email: '', message: '' };
      })
      .catch(error => {
        console.error(error);
        toast.error("Erreur lors de l'envoi du message. Réessaye dans quelques secondes !", {
          autoClose: 5000,
        })
      });
    };

    return { formData, sendEmail};
  }
    }

    </script>
    
    
    
    <style scoped>
    .form-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
    }

    .title-form{
      margin-bottom: 10px;
      text-align: center;
      color: #fff;
    }

    form{
        max-width: 900px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        padding: 20px;
        justify-content: center;
    }

    form label{
        color: rgb(162,162,162);
        text-transform: uppercase;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 2px;
    }

    form input {
        border: 1px solid rgb(164, 158, 158);
        margin-bottom: 1rem;
        padding: 15px;
        border-radius: 10px;
    }

    form textarea{
        height: 150px;
        margin-bottom: 1rem;
        border-radius: 10px;
        padding: 10px;
    }

    .btn{
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.5rem;
        transition: all 1s ease-in-out;
        cursor: pointer;
        padding: 10px;
    }

    .btn:disabled{
        cursor: not-allowed;
        color: #fff;
    }

    @media (max-width: 385px){
      form input{
        font-size: 20px;
      }

      form textarea{
        font-size: 20px;
      }

      .title-form{
        display: none;
      }


    }
    </style>