import Vue from 'vue';
import Router from 'vue-router';
// import LoginForm from './components/auth/LoginForm';
// import Produkty from './views/produkty';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'exact-link',
  linkExactActiveClass: 'active-link',
  scrollBehavior: '',
  routes: [
    // {
    //   path: '/',
    //   name: 'Produkty',
    //   component: Produkty,
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   // route level code-splitting
    //   // this generates a separate chunk (register.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "register" */ './components/auth/RegisterForm.vue'), // async download component
    //   // require('./views/register.vue') included in current component bundle
    // },
    {
      path: '/produkty',
      name: 'produkty',
      // route level code-splitting
      // this generates a separate chunk (produkty.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "produkty" */ './views/produkty.vue'), // async download component
      // require('./views/produkty.vue') included in current component bundle
    },
    {
      path: '/produkty/pridat',
      name: 'pridatProdukt',
      // route level code-splitting
      // this generates a separate chunk (pridatProdukty.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "pridatProdukty" */ './views/pridatProdukt.vue'), // async download component
      // require('./views/pridatProdukty.vue') included in current component bundle
    },
  ],
});
