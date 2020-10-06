<template>
    <div class="empleadosAdmin bg-white" >
        <div v-if="!verproducto">
            <div class="row p-4 mx-auto">
                <div class="p-3">                
                    <button class="btn btn-info" @click="nuevoProducto=true, verproducto = false, nuevoP={}">
                    <b-icon-plus font-scale="3"></b-icon-plus><h2><strong>Nuevo Producto</strong></h2></button>
                </div>
                <div class="p-3">                
                    <button class="btn btn-info" @click="nuevoProducto=true, verproducto = false, nuevoP={}">
                    <b-icon-plus font-scale="3"></b-icon-plus><h2><strong>Tabla de colores</strong></h2></button>
                </div>
                <div class="p-3">                
                    <button class="btn btn-info" @click="nuevoProducto=true, verproducto = false, nuevoP={}">
                    <b-icon-plus font-scale="3"></b-icon-plus><h2><strong>Tabla de texturas</strong></h2></button>
                </div>
            </div>
            <h2 class=""><strong>Productos</strong></h2> 
            <br>      
            <div class="container p-4">
                <table class="table table-responsive-xl table-hover bg-white">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Modelo</th>
                            <th>Familia</th>
                            <th>Dimensiones</th>                            
                            <th>Opciones</th>                            
                        </tr>
                    </thead>
                    <tbody v-for="producto in productos" :key="producto.id_producto">
                        <tr >
                            <td>{{producto.id_producto}}</td>
                            <td>{{producto.modelo}}</td>
                            <td>{{producto.tipoProducto}}</td>
                            <td>{{'Alto: '+producto.alto+', Ancho: '+producto.ancho+', profundo: '+producto.profundo}}</td>
                            <td>                       
                                <button type="button" class="btn btn-primary" @click="verProduct(producto)"><b-icon-eye></b-icon-eye></button>
                                <button type="button" class="btn btn-warning"><b-icon icon="pencil-square"></b-icon></button>
                                <button type="button" class="btn btn-danger"><b-icon-trash></b-icon-trash></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>            
            <div class="col-md-8 mx-auto" v-if="verproducto">
                <br><br>
                <div class="card">
                    <h2 class="p-3"><strong>Informacion del Producto</strong></h2>
                    <div class="text-center">
                        <b-avatar :src="'http://localhost:7500'+fotografias[0].url"  size="8rem" method="post" v-if="fotografias.length>0"></b-avatar> 
                    </div>                       
                    <div class="card-header bg-white">                       
                        <h2 class="p-3"><strong>{{nuevoP.id_producto+'  '+nuevoP.tipoProducto}}</strong></h2>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Familia</label>
                                    <div class="form-control">{{nuevoP.tipoProducto}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Modelo</label>
                                    <div class="form-control">{{nuevoP.modelo}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Colores</label>
                                    <div class="form-control">{{nuevoP.colores}}</div>
                                </div>
                            </div>
                            <div class="col-md-6">                                
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Texturas</label>
                                    <div class="form-control">{{nuevoP.texturas}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputEmail1">imagenes</label>
                                    <div class="form-control">{{nuevoP.imagenes}}</div>
                                </div>
                                
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Dimensiones</label>
                                    <div class="form-control">{{nuevoP.dimensiones}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Descripcion</label>
                                    <div class="form-control">{{nuevoP.descripcion}}</div>
                                </div>
                                <div class="form-group text-center">
                                    <label for="exampleInputPassword1">Porcentaje de Venta</label>
                                    <div class="form-control">{{nuevoP.porcentajeParaVenta}}</div>
                                </div>
                            </div>
                        </div>                       
                    </div>
                    <div class="card-footer bg-white p-4">
                        <button class="btn btn-primary btn-block" @click="verproducto=false,nuevoP={},fotografias=[]"><h3><strong>Cerrar informacion producto</strong></h3></button>
                    </div>
                </div>
                <br><br>
            </div>                    
        <b-modal v-model="nuevoProducto"  centered hide-header hide-footer no-close-on-esc no-close-on-backdrop >
            <div class="p-5 bg-primary text-white text-center rounded">
                <h4>Registro de producto</h4>
            </div>
            <br>
            <form method="post" @submit.prevent="nuevoProduct()" enctype="multipart/form-data">
                <div class="form-group text-center">
                    <label class="text-danger">*</label><label> Proveedor</label>
                    <select class="form-control" v-model="nuevoP.id_empresaP" >
                        <option v-for="id in proveedores" :key="id.id_empresaP" v-bind:value="id.id_empresaP">{{id.nombre_empresaP}}</option>
                    </select>
                </div>
                <div class="row">
                    
                    <div class="col-md-6">
                         <div class="form-group text-center">
                            <label class="text-danger">*</label><label> Familia</label>
                            <input type="text" class="form-control" required v-model="nuevoP.tipoProducto">
                        </div>
                        <div class="form-group text-center">
                            <label class="text-danger">*</label><label>Modelo</label>
                            <input type="text" class="form-control" required  v-model="nuevoP.modelo">
                        </div>
                            <div class="text-center"><label class="text-danger">*</label>Medidas en centimetros</div>
                        <div class="form-row text-center">
                            <div class="col">
                                <label>Alto</label>
                                <input type="number" step="0.1" class="form-control" required v-model="nuevoP.alto">       
                            </div>
                            <div class="col">
                               <label>Ancho</label>
                                <input type="number" step="0.1" class="form-control" required v-model="nuevoP.ancho"> 
                            </div>
                            <div class="col">
                                <label>Profundo</label>
                                <input type="number" step="0.1" class="form-control" required v-model="nuevoP.profundo">
                            </div>                            
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="my-1 text-center">
                            <label> Colores</label>
                                <input type="text" disabled class="form-control" v-model="colores">
                            <!--<div class="input-group">
                                <input type="text"  class="form-control" v-model="colores">
                                <div class="input-group-prepend">
                                    <div class="btn btn-primary" @click="verColores=true" 
                                    data-toogle="collapse show" data-target="#colores" aria-controls="Colores" aria-expanded="false">
                                    <b-icon-plus></b-icon-plus></div>
                                </div>
                                <div class="verColores" v-if="verColores" >
                                    <ul class="list-group list-group-horizontal-md" v-for="color in Colores" :key="color.id_color">
                                        <li class="list-group-item" @click="alert('color')">{{color}}</li>
                                    </ul>
                                    <div class="btn btn-success" @click="verColores=false">cerrar paleta de colores</div>
                                </div>
                            </div> -->
                        </div>                        
                        <div class="form-group text-center p-2">
                            <label for="exampleInputEmail1">Texturas</label>
                            <input type="text" disabled class="form-control"  v-model="nuevoP.texturas">
                        </div>
                        <br>
                        <div class="form-group text-center">
                            <label class="text-danger">*</label><label>Porcentaje de venta</label>
                            <input type="number" step="0.1" class="form-control" min="3" max="200"  required v-model="nuevoP.porcentajeParaVenta">
                        </div>
                    </div>
                </div>
                <div class="form-group text-center">
                    <label class="text-danger">*</label><label>Descripcion</label>
                    <textarea class="form-control" rows="4" required v-model="nuevoP.descripcion"></textarea>
                </div>
                <div class="form-group text-center">
                    <label>Imagenes</label>
                    <b-form-file
                        multiple
                        :state="Boolean(file)"
                        placeholder=""
                        @change="tomarValor">
                    </b-form-file>
                </div>           
                <button class="btn btn-primary btn-block">Guardar Producto</button>                  
            </form>
            <br>
            <button class="btn btn-danger btn-block" @click="nuevoProducto=false, nuevoP={}">cancelar</button>
        </b-modal>
    </div>
</template>
<script>
import endPoint from '../../src/uri/uri.js'
export default {
    name:'inventarioAdmin',
    components:{
    },
    data(){
        return{
            uri:'',
            productos:[],
            nuevoProducto:false,
            verproducto:false,
            nuevoP:{},
            file:[],
            colores:[],
            Colores:['amarillo'],
            verColores:false,
            imagenes:[],
            fotografias:[],
            proveedores:[],
        }
    },
    created(){
        this.uri = endPoint.uri
        if (localStorage.getItem("token") == null ){
            this.$router.push('/iniciosesion')
        }
    },
    mounted(){
        this.verProductos()
        this.verProveedores()
    },
    methods:{
        tomarValor(event){
            this.file=event.target.files
        },
        verProductos(){
            this.axios.post(this.uri + '/api/productos/productos',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.productos=res.data.data
            })
            .catch(err=>{
                this.$swal(err.response.data.message)
            })
        },
         verProveedores(){
            this.axios.post(this.uri + '/api/proveedores/proveedores',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                console.log(res.data.data)
                this.proveedores=res.data.data
            })
            .catch(err=>{
                this.$swal(err.response.data.message)
            })
        },
        nuevoProduct(){ 
            let nuevo = {}
            nuevo = this.nuevoP
            console.log(nuevo)
            if(this.file.length>0){
                this.guardarFoto(this.file)
            }
            this.axios.post(this.uri + '/api/productos/nuevoProducto',{nuevo,headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{  
                this.nuevoProducto = false,
                this.nuevoP = {}
                this.verProductos()
                console.log(this.imagenes)
                setTimeout(() => {
                    if(this.imagenes.length>0){  
                        this.guardarUrlImgenProducto(this.imagenes,res.data.data.insertId) 
                    }  
                }, 1500);
                this.$swal({
                    icon: 'success',
                    title: 'Muy bien !!!',
                    text: res.data.message,
                }) 
                
                
            })
            .catch(err=>{
                console.log(err.response)
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
        verProduct(producto){
            this.verproducto = true
            this.nuevoP = producto  
            const idd={
                id_producto:producto.id_producto
            }
            this.axios.post(this.uri + '/api/productos/verFotosProducto',{idd,headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.fotografias = res.data.data 
                console.log(this.fotografias)
            })
            .catch(err=>{
                console.log(err.response.data.message)
            })
                 
        },
        guardarFoto(file){
            this.file=[]
            const formData = new FormData();
            for (const i of Object.keys(file)) {
                formData.append('files',file[i])
            }
            this.axios.post(this.uri + '/api/productos/guardarFotoProducto',formData)
            .then(res=>{
                for(let a = 0; a<=res.data.files.length-1; a++){
                    this.imagenes.push('/uploads/'+res.data.files[a].originalname)
                }
                this.$swal({
                    icon: 'success',
                    title: 'Muy bien !!!',
                    text: 'se an agregado las imagenes al servidor',
                })
            })
            .catch(err=>{  
                this.$swal({
                    icon: 'error',
                    title: 'Cuidado...',
                    text: err,
                })            
            })
        },
        guardarUrlImgenProducto(urls, id){
            let r  = 0           
            for (let a=0; a<=urls.length-1;a++){   
                const data = {
                    url:urls[a],
                    id:id
                }
                this.axios.post(this.uri + '/api/productos/guardarUrlImagenes',{data,headers:{Authorization:localStorage.getItem('token')}})
                .then(res=>{
                    this.imagenes=[]
                    r = r + 1
                    if(r==urls.length-1){
                        this.$swal({
                            icon: 'success',
                            title: 'Muy bien !!!',
                            text: res.data.message,
                        })
                    }
                })
                .catch(err=>{
                    r=0
                })            
                  
            }            
        },
    }      
}
</script>

<style>

</style>