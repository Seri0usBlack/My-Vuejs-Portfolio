<template>
  <form ref="form" @submit.prevent="sendEmail">
    <label>Name</label>
    <input type="text" name="user_name" v-model="formData.name" placeholder="VOTRE NOM" required />

    <label>Email</label>
    <input type="email" name="user_email" v-model="formData.email" placeholder="VOTRE E-MAIL" required />

    <label>Message</label>
    <textarea name="message" v-model="formData.message" placeholder="VOTRE MESSAGE" required></textarea>

    <input type="submit" value="SEND" :disabled="!formData.message.trim()" class="btn" />
  </form>
    </template>
    
    <script lang="ts">
    import { ref } from 'vue';
    import emailjs from 'emailjs-com';
    
    export default {
      setup() {
        const formData = ref({
          name: '',
          email: '',
          message: '',
        });

        const sendEmail = () => {
      emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, {
        from_name: formData.value.name,
        from_email: formData.value.email,
        message: formData.value.message,
      },   import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(() => {
        alert('Message envoyé !');
        formData.value = { name: '', email: '', message: '' };
      })
      .catch(error => {
        console.error(error);
        alert('Erreur lors de l’envoi');
      });
    };

    return { formData, sendEmail };
  }
    }

    </script>
    
    
    
    <style scoped>
    form{
        max-width: 800px;
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
    </style>