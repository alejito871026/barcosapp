import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios';

import PanelAdmin from '../views/PanelAdmin.vue'
import home from '../views/home.vue'
import iniciosesion from '../views/inicioSesion.vue'
import actualizarContrasena from '../views/actualizarContrasena.vue'
import almacen from '../views/almacen.vue'

import VueCryptojs from 'vue-cryptojs'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueRouter)
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons) 
Vue.use(VueSweetalert2);
Vue.use(VueCryptojs)
  const routes = [
  {
    path: '/',
    name: 'home',
    component:home
  },
  {
    path: '/dashboard',
    name: 'panelAdmin',
    component:PanelAdmin
  },
  {
    path: '/iniciosesion',
    name: 'iniciosesion',
    component:iniciosesion
  },
  {
    path: '/actualizarContrasena',
    name: 'actualizarContrasena',
    component:actualizarContrasena
  },
  {
    path: '/almacen',
    name: 'almacen',
    component:almacen
  }
]
const primeravez = localStorage.getItem("primeravez")
const token = localStorage.getItem("token")
if(token){
  axios.defaults.headers.common['Authorization'] = token;
}
if(primeravez){
  axios.defaults.headers.common['Authorization'] = primeravez;
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
