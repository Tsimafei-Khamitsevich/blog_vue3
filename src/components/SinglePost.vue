<script setup lang="ts">
  import { defineProps } from 'vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useCommentStore } from '../stores/comment'
  import SingleComment from '../components/PostComment.vue'
  
  defineProps(['post', 'photo'])

  const route = useRoute() 
  const { getPostComments } = storeToRefs(useCommentStore())
  const { fetchComments } = useCommentStore()
  const { onCreateComment } = useCommentStore()

  fetchComments(route.params.id)
  
</script>

<template>
  <img v-bind:src="photo[0].url">
  <br>
  <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{{ post[0].title }}</h1>
    {{ post[0].body }}
  <br>
  <section class="not-format">
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Обсуждение: <span> {{ getPostComments.length }}</span></h2>
    </div>
    
    <form class="mb-6" @submit.prevent="onCreateComment(route.params.id, body)">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <textarea v-model="body" id="comment" rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Напиши комментарий ... " required></textarea>
        </div>
        <div class="buttons flex">
          <div class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"><button type="submit">Отправить</button></div>
        </div>
    </form>
    
    <SingleComment :comments="getPostComments"></SingleComment>

  </section>
</template>