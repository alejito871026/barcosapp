<template>
    <div class="empleadosAdmin bg-white" >
        <div v-if="!verEmpleado">
            <div class="row p-4">
            <div class="p-3">                
                <button class="btn btn-info" @click="nuevoEmpleado=true,verEmpleado=false,nuevo={}"><b-icon-plus font-scale="3"></b-icon-plus><br>
                <h2><strong> Nuevo Empleado</strong></h2></button>
            </div> 
            <div class="p-3">                
                <button class="btn btn-info" @click="empleadosInactivos()"><b-icon-plus font-scale="3"></b-icon-plus><br>
                <h2><strong> Empleados inactivos</strong></h2></button>
            </div> 
        </div>
        <h2 class=""><strong>Empleados</strong></h2> 
        <br>      
            <div class="container p-4">
                <table class="table table-responsive-xl table-hover bg-white">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>rol</th>
                            <th>Email</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody v-for="empleado in empleados" :key="empleado.id_empleado">
                        <tr >
                            <td>{{empleado.id_empleado}}</td>
                            <td>{{empleado.nombreE}}</td>
                            <td>{{empleado.apellidosE}}</td>
                            <td>{{empleado.rol}}</td>
                            <td>{{empleado.emailE}}</td>
                            <td>                       
                                <button type="button" class="btn btn-primary" @click="verEmple(empleado)"><b-icon-eye></b-icon-eye></button>
                                <button type="button" class="btn btn-warning"><b-icon icon="pencil-square"></b-icon></button>
                                <button type="button" class="btn btn-danger"><b-icon-trash></b-icon-trash></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-success btn-block" @click="verEmpleados(), btnCerrarInactivos=false" v-if="btnCerrarInactivos">Cerrar empleados inactivos</button>
            </div>
            </div>            
            <div class="col-md-8 mx-auto" v-if="verEmpleado">
                <br><br>
                <div class="card">
                    <h2 class="p-3"><strong>Informacion del empleado</strong></h2>
                    <div class="card-header bg-white">
                        <b-avatar src="https://placekitten.com/300/300" size="8rem"></b-avatar>
                        <h2 class="p-3"><strong>{{nuevo.nombreE+'  '+nuevo.apellidosE}}</strong></h2>

                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Cedula</label>
                                    <div class="form-control">{{nuevo.cedulaE}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Celular</label>
                                    <div class="form-control">{{nuevo.celularE}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Direccion</label>
                                    <div class="form-control">{{nuevo.direccionE}}</div>
                                </div>
                            </div>
                            <div class="col-md-6">                                
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Fecha de nacimiento</label>
                                    <div class="form-control">{{nuevo.fechaNacimientoE}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Rol</label>
                                    <div class="form-control">{{nuevo.rol}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputEmail1">Email</label>
                                    <div class="form-control">{{nuevo.emailE}}</div>
                                </div>
                            </div>
                        </div>                       
                    </div>
                    <div class="card-footer bg-white p-4">
                        <button class="btn btn-primary btn-block" @click="verEmpleado=false,nuevo={}"><h3><strong>Cerrar informacion empleado</strong></h3></button>
                    </div>
                </div>
                <br><br>
            </div>        
        <b-modal v-model="nuevoEmpleado" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop >
            <form method="post" @submit.prevent="nuevoEmp()">
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Cedula</label>
                    <input type="text" class="form-control" required v-model="nuevo.cedulaE">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Nombres</label>
                    <input type="text" class="form-control" required  v-model="nuevo.nombreE">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Apellidos</label>
                    <input type="text" class="form-control" required v-model="nuevo.apellidosE">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Celular</label>
                    <input type="text" class="form-control" required v-model="nuevo.celularE">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Direccion</label>
                    <input type="text" class="form-control" required v-model="nuevo.direccionE">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Fecha de nacimiento</label>
                    <input type="date" class="form-control" required v-model="nuevo.fechaNacimientoE">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Rol</label>
                    <select class="form-control" v-model="nuevo.rol" >
                        <option v-for="rol in roles" :key="rol">{{rol}}</option>
                    </select>
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" required v-model="nuevo.emailE">
                </div>
                <button class="btn btn-primary btn-block">Guardar empleado</button>                  
            </form>
            <br>
            <button class="btn btn-danger btn-block" @click="nuevoEmpleado=false, nuevo={}">cancelar</button>
        </b-modal>
    </div>
</template>

<script>
import endPoint from '../../src/uri/uri.js'
//import io from 'socket.io-client';
//const socket = io('http://localhost:7500')
export default {
    name:'empleadosAdmin',
    components:{
    },
    data(){
        return{
            uri:'',
            empleados:[],
            listado:true,
            nuevoEmpleado:false,
            verEmpleado:false,
            roles:['ADMIN','ALMACENISTA','VENDEDOR'],
            nuevo:{},
            btnCerrarInactivos:false,
            //activos:[]
            
        }
    },
    created(){
        this.uri = endPoint.uri
        if (localStorage.getItem("token") == null ){
            this.$router.push('/iniciosesion')
        }
    },
    mounted(){
        this.verEmpleados()
        //socket.on('actualizar',(data)=>{
            //console.log(data)
           // console.log(activos.length)
            //for(let a=0;a<=activos.length;a++){
                //if(this.activos[a].id==data){
                  //  return
                //}else{
                 //   this.activos.push(data)
                //} 
            //}
            //console.log(this.activos)
            //if(this.activos.length-1>=0){
               // this.ponerActivos()
            //}            
        //}) 
    },
    methods:{
        ponerActivos(){
            console.log(this.activos)
            for(let a = 0; a<=this.empleados.length-1; a++){
                console.log('actualizando empleados '+ a)
                for(let b = 0; b <= this.activos.length-1; b++){
                    console.log(b)
                    if(this.empleados[a].id==this.activos[b]){
                        this.empelados[a].activiti=true
                    }
                }
                
            }
        },
        verEmpleados(){
            this.axios.post(this.uri + '/api/empleados/empleados',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.empleados=res.data.data
            })
            .catch(err=>{
                this.$swal(err.response.data.message)
            })
        },
        nuevoEmp(){
            const nuevo = this.nuevo
            nuevo.contrasenaE ='CRMagil2020'
            console.log(nuevo)
            this.axios.post(this.uri + '/api/empleados/agregarEmpleado',{nuevo,headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.nuevoEmpleado = false,
                this.nuevo = {}
                this.verEmpleados()
                this.$swal({
                    icon: 'success',
                    title: 'Muy bien !!!',
                    text: res.data.message,
                })
            })
            .catch(err=>{  
                if(err.response.data.data.errr=='ER_DUP_ENTRY'){
                    this.$swal({
                        icon: 'error',
                        title: 'Cuidado...',
                        text:'El siguiente campo ya se encuentra registrado '+ err.response.data.data.mess,
                    })
                    return
                }else{
                    this.$swal({
                        icon: 'error',
                        title: 'Cuidado...',
                        text:'Error sin determinar '+ err.response,
                    })
                }
                
            })
        },
        verEmple(empleado){
            this.verEmpleado = true
            this.nuevo = empleado
            this.listado = false            
        },
        empleadosInactivos(){
            this.axios.post(this.uri + '/api/empleados/empleadosInactivos',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.empleados=res.data.data 
                this.btnCerrarInactivos = true 
            })
            .catch(err=>{
                this.$swal(err.response.data.message)
            })            
        },
        recuperarContrasena(){
            const data = {
                cedula : this.cedula,
                email:this.email
            }
            this.axios.post(this.uri+'/api/empleados/recuperarContrasena',data)
            .then(res=>{
                this.$swal({
                icon: 'success',
                title: 'Bien',
                text: res.data.message,
                })
                this.modal=false
            })
            .catch(err=>{
                this.$swal({
                icon: 'error',
                title: 'Algo falla',
                text: err.response.data.message
                })        
            })
        }
    },
}
</script>

<style>

</style>