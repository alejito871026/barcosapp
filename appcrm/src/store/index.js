import Vue from 'vue'
import Vuex from 'vuex'
import Autenticacion from './Autenticacion'
import Actualizar from './actualizar'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Autenticacion,
    Actualizar
  }
})
