<template>
    <div class="empleadosAdmin bg-white" >
        <div v-if="!verprove">
            <div class="row p-4">
            <div class="p-3">                
                <button class="btn btn-info" @click="nuevoProveedor=true, verprove = false,nuevoP={}"><b-icon-plus font-scale="3"></b-icon-plus><br>
                <h2><strong> Nuevo Provedor</strong></h2></button>
            </div>  
            <div class="p-3">                
                <button class="btn btn-info" @click="nuevoProveedor=true, verprove = false,nuevoP={}"><b-icon-plus font-scale="3"></b-icon-plus><br>
                <h2><strong> Nuevo Pedido</strong></h2></button>
            </div> 
            
        </div>
        <h2 class=""><strong>Proveedores</strong></h2> 
        <br>      
            <div class="container p-4">
                <table class="table table-responsive-xl table-hover bg-white">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>ciudad</th>
                            <th>Direccion</th>                            
                            <th>Opciones</th>                            
                        </tr>
                    </thead>
                    <tbody v-for="proveedor in proveedores" :key="proveedor.id_empresaP">
                        <tr >
                            <td>{{proveedor.id_empresaP}}</td>
                            <td>{{proveedor.nombre_empresaP}}</td>
                            <td>{{proveedor.ciudad_empresaP}}</td>
                            <td>{{proveedor.direccion_empresaP}}</td>
                            <td>                       
                                <button type="button" class="btn btn-primary" @click="verProveedor(proveedor)"><b-icon-eye></b-icon-eye></button>
                                <button type="button" class="btn btn-warning"><b-icon icon="pencil-square"></b-icon></button>
                                <button type="button" class="btn btn-danger"><b-icon-trash></b-icon-trash></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>            
            <div class="col-md-8 mx-auto" v-if="verprove">
                <br><br>
                <div class="card">
                    <h2 class="p-3"><strong>Informacion del Proveedor</strong></h2>
                    <div class="card-header bg-white">
                        <b-avatar src="https://placekitten.com/300/300" size="8rem"></b-avatar>
                        <h2 class="p-3"><strong>{{nuevoP.nombre_empresaP}}</strong></h2>

                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Nit</label>
                                    <div class="form-control">{{nuevoP.nit_empresaP}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Telefono</label>
                                    <div class="form-control">{{nuevoP.telefono_empresaP}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Direccion</label>
                                    <div class="form-control">{{nuevoP.direccion_empresaP}}</div>
                                </div>
                            </div>
                            <div class="col-md-6">                                
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">WhatsApp</label>
                                    <div class="form-control">{{nuevoP.whatsapp_empresaP}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputEmail1">Email</label>
                                    <div class="form-control">{{nuevoP.email_empresaP}}</div>
                                </div>
                                
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">ciudad</label>
                                    <div class="form-control">{{nuevoP.ciudad_empresaP}}</div>
                                </div>
                            </div>
                        </div>                       
                    </div>
                    <div class="card-footer bg-white p-4">
                        <button class="btn btn-primary btn-block" @click="verprove=false,nuevoP={}"><h3><strong>Cerrar informacion proveedor</strong></h3></button>
                    </div>
                </div>
                <br><br>
            </div>        
        <b-modal v-model="nuevoProveedor" centered hide-header hide-footer no-close-on-esc no-close-on-backdrop >
            <form method="post" @submit.prevent="nuevoProve()">
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Nit</label>
                    <input type="text" class="form-control" required v-model="nuevoP.nit_empresaP">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Nombre</label>
                    <input type="text" class="form-control" required  v-model="nuevoP.nombre_empresaP">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Telefono</label>
                    <input type="text" class="form-control" required v-model="nuevoP.telefono_empresaP">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">WhatsApp</label>
                    <input type="text" class="form-control" required v-model="nuevoP.whatsapp_empresaP">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" required v-model="nuevoP.email_empresaP">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Ciudad</label>
                    <input type="text" class="form-control" required v-model="nuevoP.ciudad_empresaP">
                </div>
                <div class="form-group text-center">
                    <label for="exampleInputPassword1">Direccion</label>
                    <input type="text" class="form-control" required v-model="nuevoP.direccion_empresaP">
                </div>
                <button class="btn btn-primary btn-block">Guardar Proveedor</button>                  
            </form>
            <br>
            <button class="btn btn-danger btn-block" @click="nuevoProveedor=false, nuevoP={}">cancelar</button>
        </b-modal>
    </div>
</template>
<script>
import endPoint from '../../src/uri/uri.js'
export default {
    name:'provedores',
    components:{
    },
    data(){
        return{
            uri:'',
            proveedores:[],
            nuevoProveedor:false,
            verprove:false,
            nuevoP:{},
        }
    },
    created(){
        this.uri = endPoint.uri
        if (localStorage.getItem("token") == null ){
            this.$router.push('/iniciosesion')
        }
    },
    mounted(){
        this.verProveedores()
    },
    methods:{
        verProveedores(){
            this.axios.post(this.uri + '/api/proveedores/proveedores',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.proveedores=res.data.data
            })
            .catch(err=>{
                this.$swal(err.response.data.message)
                console.log(err.response)
            })
        },
        nuevoProve(){
            const nuevo = this.nuevoP
            this.axios.post(this.uri + '/api/proveedores/nuevoProveedor',{nuevo,headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.nuevoProveedor = false,
                this.nuevoP = {}
                this.verProveedores()
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
        verProveedor(proveedor){
            this.verprove = true
            this.nuevoP = proveedor        
        },
    },
}
</script>

<style>

</style>