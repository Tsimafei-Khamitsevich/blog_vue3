import { createRouter, createWebHistory } from 'vue-router'
import PostsView from '../views/PostsView.vue'
import PostView from '../views/PostView.vue'
import PostAddView from '../views/PostAddView.vue'

const router = createRouter({
  history: createWebHistory(), 
  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostsView
    },
    { 
      path: '/post/:id',
      name: 'post', 
      component: PostView 
    },
    { 
      path: '/posts/add', 
      name: 'post_add', 
      component: PostAddView 
    },
  ]
})

export default router