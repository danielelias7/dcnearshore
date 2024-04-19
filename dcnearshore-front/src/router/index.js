import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/components/Login.vue'
import TaskList from '@/components/TaskList.vue'
import NewTask from '@/components/NewTask.vue'
import ShowTask from '@/components/ShowTask.vue'
import EditTask from '@/components/EditTask.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/task-list',
      name: 'task-list',
      component: TaskList
    },
    {
      path: '/new-task', 
      name: 'new-task',
      component: NewTask
    },
    {
      path: '/tasks/:id',
      name: 'show-task',
      component: ShowTask
    },
    {
      path: '/edit-task/:id',
      name: 'edit-task',
      component: EditTask
    }
  ]
})

export default router
