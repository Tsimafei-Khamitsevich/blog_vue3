import { defineStore } from 'pinia'
import PostType  from '../types/post'
import PhotoType  from '../types/photo'


export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [],
    photos: [],
    post: {} as PostType,
    photo: {} as PhotoType,
    loading: false,
    error: String,
    resoursePath: 'https://jsonplaceholder.typicode.com/'
  }),
  
  actions: {
    async searchPosts(title: string){
      const postsPath = this.resoursePath + 'posts' + '?'
      try {
        // request resourses
        this.posts = await fetch(postsPath + new URLSearchParams({
        title: title,
        }))
        .then((response) => response.json())

        const photosPath = this.resoursePath + 'photos'
        this.photos = await fetch(photosPath)
        .then((response) => response.json()) 
        
        // unite posts and photos objects
        const selectedKeys = ['url', 'thumbnailUrl']
        let i = 0;
        while (i < this.posts.length) {
            const data: object = Object.keys(this.photos[i]).reduce((acc: any, key: string) => {
              if (selectedKeys.includes(key)){
                acc[key] = this.photos[i][key] as string;
              }
              return acc;
            }, {})
            this.posts[i] = Object.assign({}, this.posts[i], data);
            i++;
        }
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchPosts() {
      this.posts = []
      this.loading = true

      const postsPath = this.resoursePath + 'posts'
      const photosPath = this.resoursePath + 'photos'
      try {
        // request resourses
        this.posts = await fetch(postsPath)
        .then((response) => response.json())

        this.photos = await fetch(photosPath)
        .then((response) => response.json())  
        
        // unite posts and photos objects
        const selectedKeys = ['url', 'thumbnailUrl']
        
        let i = 0;
        while (i < this.posts.length) {
            const data = Object.keys(this.photos[i]).reduce((acc: any, key: string) => {
              if (selectedKeys.includes(key)){
                acc[key] = this.photos[i][key]
              }
              return acc;
            }, {})
  
            this.posts[i] = Object.assign({}, this.posts[i], data);
            i++;
        }

      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchPost(id:string) {
      this.loading = true
      
      const postsPath = this.resoursePath + 'posts' + '?' 
      const photosPath = this.resoursePath + 'photos' + '?'

      try {
        this.post = await fetch(postsPath + new URLSearchParams({
          id: id,
        }))
        .then((response) => response.json())

        this.photo = await fetch(photosPath + new URLSearchParams({
          id: id,
        }))
        .then((response) => response.json())  

      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    
  }

})