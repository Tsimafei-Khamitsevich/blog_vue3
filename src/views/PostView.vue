<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { usePostStore } from '../stores/post'
  import SinglePost from '../components/SinglePost.vue'

  const route = useRoute() 
  const { post, loading, error, photo } = storeToRefs(usePostStore())
  const { fetchPost } = usePostStore()

  fetchPost(route.params.id)
</script>

<template>
  <div>
    <p v-if="loading">Loading post...</p>
    <p v-if="error">{{ error.message }}</p>
    <div v-if="post">
      <br>
      <div class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">

        <div class="bg-slate-100 bg-opacity-50 rounded mx-auto">
        <SinglePost :post="post" :photo="photo" ></SinglePost>
      </div>
    </div>
  </div>
  </div> 
</template>