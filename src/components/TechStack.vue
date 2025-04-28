<template>
    <div class="stack-container">
        <div class="languages-container">
            <h1>Languages</h1>
            <ul>
            <li
            v-for="language in languages" :key="language">
            {{ language.name }}
        </li>
        </ul>
        </div>

        <div class="frameworks-container">
            <h1>Frameworks</h1>
            <ul>
                <li v-for="frameworks in framework" :key="frameworks">
                    {{ frameworks.name }}
                </li>
            </ul>
        </div>

        <div class="libraries-container">
            <h1>Libraries</h1>
            <ul>
                <li v-for="libraries in library" :key="libraries">
                    {{ libraries.name }}
                </li>
            </ul>
        </div>

    </div>

    
    </template>
    
    <script lang="ts">
        export default {
            data(){
                return {
                    languages: [
                        {name:'HTML'},
                        {name:'CSS'},
                        {name:'SCSS'},
                        {name:'Javascript'},
                        {name:'TypeScript'},
                    ],
                    framework: [
                        {name:'VueJS'},
                        {name:'Nuxt'},
                        {name:'Vite'},
                    ],
                    library: [
                        {name:'GSAP'},
                        {name:'Pinia'},
                        {name:'Vuetify'},
                    ]
                }
            },

    };
    </script>
    
    
    <style scoped>

    .stack-container{
        text-transform: uppercase;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 2rem; 
    }
    
    .stack-container h1{
        color: rgb(162, 162, 162);
        display: flex;
        justify-content: center;
    }

    .stack-container ul{
        list-style-type: none;
        color: #fff;
    }

    .stack-container li{
        color: #fff;
        border-bottom: 1px solid rgba(164, 158, 158, 0.5);
        transition: padding 0.4s ease-in-out,
                    background-color 0.4s ease-in-out;
        cursor: pointer;
    }

    .stack-container li:hover{
        padding: 20px;
        background-color: rgba(164, 158, 158, 0.2);
    }


    .languages-container{
        grid-column: span 2;
        justify-content: center;
    }
    
    .languages-container ul li{
        font-size: 2rem;
        font-weight: bold;
    }
    
    .frameworks-container ul li{
        font-size: 2rem;
        font-weight: bold;
    }

    .libraries-container ul li{
        font-size: 2rem;
        font-weight: bold;
    }

    </style>