import { createRouter, createWebHistory } from 'vue-router'
import ComplaintBook from '@/views/complaintBook/ComplaintBook.vue'
import NotFound from '@/views/pageNotFound/PageNotFound.vue'

const routes = [
  {
    path: '/complaintBook/:codsuc(codsuc=\\d+)',
    name: 'complaintBookWithBranch',
    component: ComplaintBook,
    props: route => ({
      codsuc: route.params.codsuc.split('=')[1]
    })
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router