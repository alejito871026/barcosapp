import axios from 'axios'
export default {
namespaced:true,
state: {
    estadoFinanciero:false,
    Bancos:false,
    totalBancos:0
  },
  getters: {

  }, 
  mutations:{
      actualizarBancos(state,val){
          state.Bancos=val
      },
      actualizarTotalBancos(state,val){
          state.totalBancos=val
      },
      actualizarEstadoFinanciero(state,val){
        state.estadoFinanciero=val
    }
  },
  actions:{
      
  }
}