import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [],
    photos: [],
    post: null,
    photo: null,
    loading: false,
    error: null,
  }),
  
  actions: {
   
    async searchPosts(title){
      this.posts = await fetch(`https://jsonplaceholder.typicode.com/posts?title=${title}`)
      .then((response) => response.json())

      this.photos = await fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json()) 

      const selectedKeys = ['url', 'thumbnailUrl']
      let i = 0;
      while (i < this.posts.length) {
          this.data = Object.keys(this.photos[i]).reduce((acc, key) => {
            if (selectedKeys.includes(key)){
              acc[key] = this.photos[i][key]
            }
            return acc;
          }, {})
  
          this.posts[i] = Object.assign({}, this.posts[i], this.data);
          i++;
      }
    },

    async fetchPosts(title=null) {
      this.posts = []
      this.loading = true
      
      try {
        if(title === 'undefined' || title === null){
          this.posts = await fetch(`https://jsonplaceholder.typicode.com/posts`)
          .then((response) => response.json())
  
        }else{
          await axios.get(`https://jsonplaceholder.typicode.com/posts?title=${title}`)
          .then((response)=>{
          this.posts = response.data
          console.log(this.data)
        })
        }

        this.photos = await fetch('https://jsonplaceholder.typicode.com/photos')
        .then((response) => response.json())  
        
        const selectedKeys = ['url', 'thumbnailUrl']
        
        let i = 0;
        while (i < this.posts.length) {
            let data = Object.keys(this.photos[i]).reduce((acc, key) => {
              if (selectedKeys.includes(key)){
                acc[key] = this.photos[i][key]
              }
              return acc;
            }, {})
  
            this.posts[i] = Object.assign({}, this.posts[i], data);
            i++;
        }

      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async twoItemsInOne(){
      
    },
    async fetchPost(id) {
      this.post = null
      this.loading = true
      try {
        this.post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        this.photo = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .then((response) => response.json())  
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    
  }

})