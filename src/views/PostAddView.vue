<script>
  
  import router from "@/router";

  export default {
    data() {
      return {
        title: null,
        body: null,
      };
    },
    methods: {
      async onCreatePost() {
        
      let data = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
        title: this.title,
        body: this.body,
        userId: 1,
      }),
        headers: {
      'Content-type': 'application/json; charset=UTF-8',
      },
      })
      .then((response) => response.json());
      
      alert("Post "+ data.title+" is created");
      await router.push('/') 
  
      }
    }
  };

</script>

<template>

<form @submit.prevent="onCreatePost()">
  <div class="heading text-center font-bold text-2xl m-5 text-gray-800">Новый пост</div>
    <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      <input type="file" accept="image/*" class="title bg-gray-100 sec p-3 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Изображение">
    
      <input v-model="title" required class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Заголовок" type="text">
      <textarea v-model="body" required class="description bg-gray-100 mb-4 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="false" placeholder="Содержание"></textarea>
    
      <div class="buttons flex">
        <div class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"><button type="submit">Создать</button></div>
      </div>
  </div>
</form>
 
</template>