<template>
  <div>
    <barraAlmacenista/>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import endPoint from '../../src/uri/uri.js'
import barraAlmacenista from '../components/barraAlmacenista.vue'
//import io from 'socket.io-client';
//const socket = io('http://localhost:7500')
export default {
    name:'almacen',
    components:{
        barraAlmacenista
    },
    created(){
        this.uri = endPoint.uri
        if (localStorage.getItem("token") == null ){
            this.$router.push('/iniciosesion')
        }else{
            this.axios.get(this.uri+'/api/login/usuario', {headers:{Authorization:localStorage.getItem('token')}})
            .then(res => {
                this.estadoUsuario(res.data.user)
                switch (res.data.user.rol) { 
                    case 'ADMIN':            
                    this.$router.push("/dashboard"); 
                    break;         
                    default:
                    return
                    break;
                }
            })
            .catch(err => {
                localStorage.clear()
                this.$router.push('/iniciosesion')
            });
        }        
    },
    mounted(){
        console.log(this.usuario)
        //socket.emit('usuarioActivo',this.usuario.id)
    },
    computed:{
        ...mapState('Autenticacion',['usuario'])
    },
    methods:{
        ...mapMutations('Autenticacion',['estadoUsuario']),
    },
}
</script>

<style>

</style>