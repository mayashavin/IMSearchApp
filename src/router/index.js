import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/view/HomeView'
import MovieView from '@/view/MovieView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, {
      path: '/movie/:id',
      name: 'movie',
      component: MovieView,
      props: true
    }, {
      path: '*',
      component: HomeView
    }
  ]
})
