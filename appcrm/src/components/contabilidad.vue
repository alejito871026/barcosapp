<template>
  <div>
      <div id="conta">         
          <cajas/>
          <br>
          <compras/>
          <br>
          <ventas/>
      </div>
  </div>
</template>

<script>
import compras from './compras.vue'
import cajas from './cajas.vue'
import ventas from './ventas.vue'
import {mapState, mapActions} from 'vuex'
export default {
name:'moduloContable',
    components:{
        compras,
        cajas,
        ventas
    },
    computed:{
        ...mapState('Autenticacion',['usuario'])
    },
    methods:{

    },
}
</script>

<style>
    #conta{        
    }
</style>