<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
   <header class="navbar">
    
    <nav class="bg-gray-50 dark:bg-gray-700">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center">
            <ul class="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                <li>
                  <RouterLink to="/" class="text-gray-900 dark:text-white hover:underline" aria-current="page">Посты</RouterLink>
                </li>
                <li>
                  <RouterLink to="/posts/add" class="text-gray-900 dark:text-white hover:underline">Создать пост</RouterLink>
                </li>
            </ul>
        </div>
    </div>
</nav>
</header> 

  <RouterView />
</template>

