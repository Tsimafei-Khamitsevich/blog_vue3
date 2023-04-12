<script setup lang="ts">

  import { RouterLink } from 'vue-router'
  import { computed } from "vue";
  import { storeToRefs } from 'pinia'
  import { usePostStore } from '../stores/post'
  import '@/assets/tailwind.css';

  const { posts, loading, error } = storeToRefs(usePostStore())
  const { fetchPosts } = usePostStore()
  const { searchPosts } = usePostStore()

  fetchPosts()
  
  const slides = computed(() => {
    const slides = []
    for(let i = 0; i < posts.value.length; i += 2) {
      let double = [posts.value[i], posts.value[i+1]] 
      if(!posts.value[i+1]){
        double = [posts.value[i]]
      }
      slides.push(double)
    }
    return slides
  })

</script>

<template>
  <main>
    <p v-if="loading">Loading posts...</p>
    <p v-if="error">{{ error.message }}</p>
    <br>
    
    <section class="bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Блог</h2>
      </div>
      
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      
      <div class="flex items-center"> 
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input v-model="titleSearch" type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required>
        </div>
        <button @click="searchPosts(titleSearch)" type="submit" class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span class="sr-only">Поиск</span>
        </button>
        <button @click="fetchPosts()" type="submit" class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Все
        </button>
      </div>
      <br>

        <div v-for="(slide, index) in slides" :key="index">
        
          <div v-if="slide.length>1">
            <div class="grid gap-8 lg:grid-cols-2">

            <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <img class="rounded" v-bind:src="slide[0].thumbnailUrl" alt="" />
                <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><RouterLink :to="`/post/${slide[0].id}`">{{ slide[0].title }}</RouterLink></h2>

                <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{ slide[0].body }}</p>      
            </article>
            
            <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <img class="rounded" v-bind:src="slide[1].thumbnailUrl" alt="" />
                <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><RouterLink :to="`/post/${slide[1].id}`">{{ slide[1].title }}</RouterLink></h2>

                <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{ slide[1].body }}</p>      
            </article>
            </div>
          </div>

          <div v-if="slide.length<2">
            <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <img class="rounded" v-bind:src="slide[0].thumbnailUrl" alt="" />
                <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><RouterLink :to="`/post/${slide[0].id}`">{{ slide[0].title }}</RouterLink></h2>

                <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{ slide[0].body }}</p>      
            </article>
          </div>
          <br>
        </div>
          
      </div>            
  </section> 
  </main>
</template>