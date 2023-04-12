import { defineStore } from 'pinia'

export const useCommentStore = defineStore({
  id: 'comment',
  state: () => ({
    comments: [],
    photos: [],
  }),
  getters: {
    getPostComments: (state) => {
      return state.comments
    }
  },
  actions: {
    async fetchComments(id: String) {
        try {
          // fetch comments and photos
          this.comments = await fetch(`https://jsonplaceholder.typicode.com/post/${id}/comments`)
          .then((response) => response.json())
          this.photos = await fetch('https://jsonplaceholder.typicode.com/photos')
          .then((response) => response.json())
          
          // merge comments and photos
          let i = 0;
          while (i < this.comments.length) {
              this.comments[i] = Object.assign({}, this.comments[i], this.photos[i]);
              i++;
          }
        } catch (error: any) {
          console.log(error)
        }
    },
    async onCreateComment(id: String, body: String) {
      
      // !!! comment will be fetched but not displayed
      try {

        const data : Array<{}> = await fetch('https://jsonplaceholder.typicode.com/comments', {
          method: 'POST',
          body: JSON.stringify({
          email: 'Анонимный',
          body: body,
          postId: id,
        }),
          headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json());
        
        console.log(data)
        //this.comments.push(data)
        alert('Ваш комментарий успешно добавлен!')
      } catch (error: any) {
        console.log(error)
      }
  },
  }
})