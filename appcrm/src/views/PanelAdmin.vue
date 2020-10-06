<template>
    <div class="bg-light">
        <div class="barraAdmin sticky-top">
            <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-navbar-brand href="/dashboard"><h2><strong>CRM agil</strong></h2></b-navbar-brand>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                    <ul class="navbar-nav ">
                        <li class="nav-item">
                            <a @click="empleadmin=true,provedor=false,contable=false,inventario=false"  
                            class="nav-link text-white btn"><b-icon-person-check variant="primary" ></b-icon-person-check> EMPLEADOS</a>
                        </li>
                        <li class="nav-item">
                            <a @click="provedor=true,empleadmin=false,contable=false,inventario=false"  
                            class="nav-link text-white btn"><b-icon-briefcase variant="warning"></b-icon-briefcase> PROVEEDORES</a>
                        </li>
                        <li class="nav-item">
                            <a @click="contable=false,provedor=false,empleadmin=false,inventario=true"  
                            class="nav-link text-white btn"><b-icon-truck variant="success"></b-icon-truck> INVENTARIO</a>
                        </li>
                        <li class="nav-item">
                            <a @click="contable=true,provedor=false,empleadmin=false,inventario=false"  
                            class="nav-link text-white btn"><b-icon-clipboard-data variant="info"></b-icon-clipboard-data> CONTABILIDAD</a>
                        </li>
                        <li class="nav-item">
                            <a @click="empleadmin=true,provedor=false,contable=false,inventario=false" 
                            class="nav-link text-white btn"><b-icon-person-square variant="danger"></b-icon-person-square> CLIENTES</a>
                        </li>
                        <li class="nav-item">
                            <a @click="salir"  class="nav-link text-white btn"><b-icon-door-closed variant="white"></b-icon-door-closed> SALIR</a>
                        </li> 
                    </ul>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div> 
        <br>
        <div v-if="empleadmin">
            <empleadosAdmin/>
        </div>
        <div v-if="provedor">
            <provedores/>
        </div>
        <div v-if="inventario">
            <inventarios/>
        </div>
        <div v-if="contable">
            <modulo-contable/>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import inventarios from '../components/inventarioAdmin.vue'
import moduloContable from '../components/contabilidad.vue'
import empleadosAdmin from '../components/empleadosAdmin.vue'
import provedores from '../components/provedores.vue'

import endPoint from '../../src/uri/uri.js'
//import io from 'socket.io-client';
//const socket = io('http://localhost:7500')
export default {
    name:'PanelAdmin',
    components :{
        moduloContable,
        empleadosAdmin,
        provedores,
        inventarios
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
                    case 'ALMACENISTA':            
                    this.$router.push("/almacen"); 
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
        //socket.emit('usuarioActivo',this.usuario.id)
        //socket.on('actualizar',(data)=>{
           // this.item = data
            //setTimeout(() => {  
               // this.mostrarTodos()
            //}, 300);
        //})  
    },
    data(){
        return{
            contable:true,            
            empleadmin:false,
            provedor:false,
            inventario:false,
        }
    },
    computed:{
        ...mapState('Autenticacion',['usuario'])
    },
    methods:{
        ...mapMutations('Autenticacion',['estadoUsuario']),
        tachar(data){
            this.item.push(data)
            this.item=this.item.sort(function(a, b) {
                return a - b;
            }); 
            setTimeout(() => {
               this.mostrarTodos() 
            }, 500);      
        },
        salir() {
            localStorage.clear();
            this.$router.push("/iniciosesion");
        } 
    }
}
</script>
<style scoped>
#sidebar{
    
}
</style>