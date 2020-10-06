<template>
  <div class="barraAdmin sticky-top">
            <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-navbar-brand href="/almacen"><h2><strong>CRM agil</strong></h2></b-navbar-brand>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                    <ul class="navbar-nav ">
                        <li class="nav-item">
                            <a @click="FporRecibir=true"  
                            class="nav-link text-white btn">Facturas por recibir</a>
                        </li>                        
                        <li class="nav-item">
                            <a @click="salir"  class="nav-link text-white btn"><b-icon-door-closed variant="white"></b-icon-door-closed> SALIR</a>
                        </li> 
                    </ul>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <div v-if="FporRecibir">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th># Factura</th>
                    <th>Valor</th>
                    <th>Fecha compra</th>
                    <th>Empresa</th>                    
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="facturas in facturasPorRecibir" :key="facturas.index">
                    <td>{{facturas.IdFactCompra}}</td>
                    <td>{{facturas.valor}}</td>
                    <td>{{mostrarFecha(facturas.fechaCompra)}}</td>
                    <td>{{facturas.nombre_empresaP}}</td>              
                    <td><div class="btn btn-primary" @click="verFacturaUnicaPorRecibir(facturas)">ver</div></td>
                  </tr>
                </tbody>
              </table>
              
          </div>
          <div v-if="verFact">
            <b-modal v-model="verFact" size="xl" hide-footer hide-header no-close-on-esc>
              <div class="card">
                <div class="card-head bg-white text-center">
                  <h2 class="p-3" v-if="facturaPorRecibir[0]!=undefined">Factura # {{facturaPorRecibir[0].recibir.IdFactCompra}}</h2>
                  <h2 class="" v-if="facturaPorRecibir[0]!=undefined">Empresa Proveedora: {{facturaPorRecibir[0].recibir.nombre_empresaP}}</h2>
                  <h2 v-if="facturaPorRecibir[0]!=undefined">Fecha de compra: {{mostrarFecha(facturaPorRecibir[0].recibir.fechaCompra)}}</h2>
                  
                </div>
                <div class="card-body text-center">                  
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Modelo</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="productosPorRecibir in facturaPorRecibir" :key="productosPorRecibir.index">
                        <td v-if="!productosPorRecibir.ingresado">{{productosPorRecibir.tipoProducto}}</td>
                        <td v-if="!productosPorRecibir.ingresado">{{productosPorRecibir.cantidad}}</td>
                        <td v-if="!productosPorRecibir.ingresado">{{productosPorRecibir.modelo}}</td>
                        <td v-if="!productosPorRecibir.ingresado">
                          <div class="btn btn-primary" @click="validarIngreso(facturaPorRecibir[0].recibir,productosPorRecibir.id_producto)"
                          v-if="!productosPorRecibir.ingresado"><b-icon-check></b-icon-check>Validar ingreso</div>
                        <div class="btn btn-warning"><b-icon-exclamation-circle></b-icon-exclamation-circle>Reportar no llegada</div>
                        <div class="btn btn-success"><b-icon-x></b-icon-x>Cantidad incompleta</div>
                        <div class="btn btn-danger"><b-icon-x></b-icon-x>Reportar o Devolver</div></td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="btn btn-primary" v-if="agregados" @click="finalizarIngreso(facturaPorRecibir[0].recibir.IdFactCompra)">Finalizar el ingreso de la factura</div>
                </div>
                <div class="card-footer bg-white text-center" v-if="facturaPorRecibir[0]!=undefined"><h2 class="">Valor total: {{facturaPorRecibir[0].recibir.valor}}</h2></div>
              </div>
            </b-modal>
            
          </div>
        </div>
        
</template>

<script>
import endPoint from '../../src/uri/uri.js'
export default {
  name:'barraAlmacenista',
  components:{
  },
  data(){
    return {
      uri:'',
      FporRecibir:false,
      facturasPorRecibir:[],
      facturaPorRecibir:{},
      verFact:false,
      agregados:false,
    }
  },
  created(){
    this.uri = endPoint.uri
  },
  mounted(){
    this.verFacturasPorRecibir()
  },
  methods:{
    finalizarIngreso(IdFactCompra){
      let valores={
        IdFactCompra:IdFactCompra
      }
      this.axios.post(this.uri+'/api/facturasCompras/validarFacturaIngreso',{valores,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
        console.log('se a actualizado')
        this.verFacturasPorRecibir()
        this.verFact = false        
        })
      .catch(err=>{console.log(err.response)})

    },
    verFacturaUnicaPorRecibir(factura){
      console.log(factura)
      this.verFact = true
      let id={
        IdFactCompra:factura.IdFactCompra
      }
      this.axios.post(this.uri + '/api/facturasCompras/facturaUnicaPorRecibir',{id,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{console.log(res.data.factura)
        this.facturaPorRecibir = res.data.factura
        this.facturaPorRecibir[0].recibir = factura
        let sumador = 0
        for(let a = 0;a<=res.data.factura.length-1;a++){
          console.log(this.facturaPorRecibir[a].ingresado)
          if(this.facturaPorRecibir[a].ingresado == false){
            this.agregados = false
            sumador  = sumador + 1
          }
        }  
        if(sumador == 0){
          this.agregados = true
        }   
      })
      
      .catch(err=>{console.log(err.response)})
    },
    verFacturasPorRecibir(){
      this.axios.post(this.uri + '/api/facturasCompras/facturasPorRecibir',{headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
        this.facturasPorRecibir = res.data.productos
      })
      .catch(err=>{console.log(err.response)})
    },
    mostrarFecha(fecha){
      let dma = ''
      for(let a = 0; a <= 9;a++){
          dma = dma + fecha[a]
      }
      return dma
    },
    validarIngreso(factura,id_producto,){
      const valores ={
        IdFactCompra:factura.IdFactCompra,
        id_producto:id_producto
      }
      this.axios.post(this.uri+'/api/productos/validarIngresoBodega',{valores,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
        console.log('se a actualizado')
        this.verFacturaUnicaPorRecibir(factura)
        
        })
      .catch(err=>{console.log(err.response)})
    },
    salir() {
            localStorage.clear();
            this.$router.push("/iniciosesion");
        } 
  }
}


</script>

<style>

</style>