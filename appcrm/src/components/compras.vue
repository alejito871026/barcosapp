<template>
  <div>
    <h3><strong>Compras</strong></h3>     
    <button class="btn btn-info" v-if="!relacionarFac" @click="relacionarFactura()">Relacionar Factura de compra</button>
    <br><br>
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <h2><strong>Facturas por cancelar</strong></h2>
                    <h2 class="card-text"></h2>
                    <button class="btn btn-success" @click="verFacturasComprasCredito = true" v-if="!verFacturasComprasCredito"> Ver </button>
                    <div v-if="verFacturasComprasCredito">
                      <table class="table table-hover" >
                        <thead>
                          <tr>
                            <th># Factura</th>
                            <th>Fecha compra</th>
                            <th>Empresa</th>
                            <th>Fecha limite de pago</th>
                            <th>Valor</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="compCredito in comprasCreditoPorPagar" :key="compCredito.id_compras">
                            <td>{{compCredito.IdFactCompra}}</td>
                            <td>{{mostrarFecha(compCredito.fechaCompra)}}</td>
                            <td>{{compCredito.nombre_empresaP}}</td>
                            <td>{{mostrarFecha(compCredito.fechaMaxPago)}}</td>
                            <td>{{compCredito.valor}}</td>                            
                            <td><div class="btn btn-primary" @click="verCompra(compCredito.IdFactCompra)"><b-icon-eye></b-icon-eye>Ver</div><div class="btn btn-warning"><b-icon-plus></b-icon-plus>Abonar</div><div class="btn btn-success"><b-icon-box-arrow-right></b-icon-box-arrow-right> Cancelar</div></td>
                          </tr>
                        </tbody>
                      </table>
                      <button class="btn btn-success" @click="verFacturasComprasCredito = false"> Cerrar</button>
                    </div>
                </div>
            </div>           
        </div>
        <br><br>
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <h2><strong>Facturas canceladas</strong></h2>
                    <h2 class="card-text"></h2>
                    <button class="btn btn-success" @click="verFacturasCanceladas = true" v-if="!verFacturasCanceladas"> Ver </button>
                    <div v-if="verFacturasCanceladas">
                      <table class="table table-hover" >
                        <thead>
                          <tr>
                            <th># Factura</th>
                            <th>Fecha compra</th>
                            <th>Empresa</th>
                            <!--<th>Fecha limite fecha limite de pago</th>-->
                            <th>Valor</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="compContado in comprasCanceladas" :key="compContado.id_compras">
                            <td>{{compContado.IdFactCompra}}</td>
                            <td>{{mostrarFecha(compContado.fechaCompra)}}</td>
                            <td>{{compContado.nombre_empresaP}}</td>
                            <td>{{compContado.valor}}</td>
                            <!--<td v-if="compContado.fechaMaxPago">{{mostrarFecha(compContado.fechaMaxPago)}}</td>-->
                            <td><div class="btn btn-primary" @click="verCompra(compContado.IdFactCompra)"><b-icon-eye></b-icon-eye> Ver</div></td>
                          </tr>
                        </tbody>
                      </table>
                      <button class="btn btn-success" @click="verFacturasCanceladas = false"> Cerrar</button>
                    </div>
                </div>
            </div>           
        </div>
    <div v-if="relacionarFac">
      <b-modal v-model="relacionarFac" fade centered hide-footer hide-header hide-header-close size="xl">
        <div class="float-right">{{fecha}}</div>
        <br>
          <div class="text-left">
              <form method="post" @submit.prevent="guardarFacturaCompra()" class="p-4">
                <div class="form-group row ">
                  <label class="col-sm-2 col-form-label">Fecha de compra </label>
                  <div class="col-sm-4">
                    <input type="date" class="form-control" v-model="facturaCompra.fechaCompra">
                  </div>
                </div>
                <div class="form-group row ">
                  <label class="col-sm-2 col-form-label"># Factura</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" v-model="facturaCompra.codigoFactura">
                  </div>
                  <label class="col-sm-2 col-form-label">Proveedor</label>
                  <div class="col-sm-4">
                    <select class="form-control" v-model="facturaCompra.id_empresaP" @change="verProductosProveedor()">
                        <option v-for="id in proveedores" :key="id.id_empresaP" v-bind:value="id.id_empresaP">{{id.nombre_empresaP}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label">Tipo de pago</label>
                  <div class="col-sm-4">
                    <select class="form-control" v-model="facturaCompra.tipoPago" @change="tipoPagos()" >
                        <option v-for="tpago in tipoPago" :key="tpago.index">{{tpago}}</option>
                    </select>
                  </div>
                  <label class="col-sm-2 col-form-label" v-if="fechaFin">Fecha limite de pago</label>
                  <div class="col-sm-4" v-if="fechaFin">
                    <input type="date" class="form-control" v-model="facturaCompra.fechaMaxPago">
                  </div>                  
                </div>
                <div class="container" v-if="contado">
                  <label class="col-sm-2 col-form-label" >Medio de pago</label>
                  <select class="form-control" v-model="facturaCompra.formaPago" @change="formaPagos()" >
                        <option v-for="forma in formaPago" :key="forma.index">{{forma}}</option>
                    </select>
                    <div v-if="tf" class="row">
                      <div class="col-md-4">
                        <label class=" col-form-label"> Seleccione el banco </label>
                        <select class="form-control" v-model="transfer.id_banco" @change="x(transfer.id_banco)" >
                          <option v-for="banco in bancos" :key="banco.index" v-bind:value="banco.id_banco">{{banco.nombreBanco}}
                          </option>

                        </select>
                      </div>
                      <div class="col-md-4">
                        <label class=" col-form-label"> Digite el # de transferencia</label>
                        <input type="number" name="" id="" class="form-control" v-model="transfer.codTrans">
                      </div>
                      <div class="col-md-4">
                        <label class=" col-form-label">Fecha de la transferencia</label>
                        <input type="date" name="" id="" class="form-control" v-model="transfer.fechaTrans">
                      </div>                        
                    </div>
                    <div v-if="efect" class="p-2">El movimiento efectivo se generara automaticamente al guardar la factura</div>
                </div>  
                <br>              
                <table class="table table-hover text-center">
                  <thead class="thead-dark">
                    <tr>
                      <th>Producto</th>
                      <th>Modelo</th>
                      <th>cantidad</th>
                      <th>Precio und</th>
                      <th>Precio total</th>
                      <th>opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select class="form-control" v-model="prod.producto" @change="modelos(prod.producto)">
                          <option v-for="producto in productosProveedor" :key="producto.id_producto">{{producto.tipoProducto}}</option>
                        </select>
                    </td>
                      <td>
                        <select class="form-control" v-model="prod.modelo" >
                          <option v-for="modelo in modelosProductosProveedor" :key="modelo.id_producto" v-bind:value="modelo.id_producto">{{modelo.modelo}}</option>
                        </select>
                      </td>
                      <td><input type="number" class="form-control" v-model="prod.cantidad"></td>
                      <td><input type="number" class="form-control" v-model="prod.precio"></td>
                      <td v-if="prod.precio"><div class="form-control">{{prod.precio * prod.cantidad}}</div></td>
                      <td v-if="prod.precio"><div class="btn badge badge-pill badge-info" @click="nuevaFila(prod.modelo,prod.precio,prod.cantidad)">agregar nuevo item</div></td>
                    </tr>                                                
                    <tr v-for="p,index in facturaCompra.productos">
                      <td>{{p.producto}}</td>
                      <td>{{p.modelo}}</td>
                      <td>{{p.cantidad}}</td>
                      <td>{{p.precio}}</td>
                      <td>{{p.precio * p.cantidad}}</td>
                      <td><div class="btn btn-danger" @click="restar(facturaCompra.productos[index].precio,facturaCompra.productos[index].cantidad),facturaCompra.productos.splice(index,1)"><b-icon-trash></b-icon-trash></div></td>                                        
                    </tr>
                  </tbody>
                  <div class="float-right">total: {{total}}</div> 
                </table>
                <div class="form-group row">
                  <label class="col-sm-4 col-form-label">Escribe tu codigo</label>
                  <div class="col-sm-8">
                    <input class="form-control" v-model="facturaCompra.codigo">
                  </div>
                </div>
                  <button class="btn btn-primary col-lg-6" v-if="facturaCompra.productos.length > 0 && prod.producto == '' || facturaCompra.productos.length > 0  && prod.producto == undefined" >Guardar</button>
                  <div class="btn btn-danger col-lg-6"  @click="relacionarFac = false">Cerrar</div>
              </form>    
          </div>
      </b-modal>
    </div>
    <b-modal v-model="nuevoProducto"  centered hide-header hide-footer no-close-on-esc no-close-on-backdrop >
        <div class="p-5 bg-primary text-white text-center rounded">
            <h4>Registro de producto</h4>
        </div>
        <br>
        <form method="post" @submit.prevent="nuevoProduct()" enctype="multipart/form-data">
          <div class="form-group text-center">
            <label class="text-danger">*</label><label> Familia</label>
            <input type="text" class="form-control" required v-model="nuevoP.tipoProducto">
          </div>
          <div class="form-group text-center">
              <label class="text-danger p-2">*</label><label>Modelo</label>
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
          <div class="form-group text-center">
              <label class="text-danger">*</label><label>Descripcion</label>
              <textarea class="form-control" rows="4" required v-model="nuevoP.descripcion"></textarea>
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
import {mapState,mapMutations} from 'vuex'
export default {
 name:'compras',
  data(){
    return {
      relacionarFac:false,
      facturaCompra:{
        productos:[],
      },
      proveedores:[],
      uri:'',
      fecha:'',
      tipoPago:['Contado','Credito'],
      productosProveedor:[],
      fechaFin:false,
      prod:{},
      modelosProductosProveedor:[],
      nuevoProducto:false,
      nuevoP:{},
      total:0,
      recibos:[],
      verFacturasCanceladas:true,
      verFacturasComprasCredito:true,
      compras:[],
      comprasCanceladas:[],
      comprasCreditoPorPagar:[],
      contado:false,
      formaPago:['Transferencia bancaria','Efectivo'],
      tf:false,
      efect:false,
      bancos:[],
      transfer:{},
      mEfectivo:{},
      montoActualBanco:0,
      idfacturacompra:'',
      montoEstadoFinanciero:0,
      }
  },
  computed:{
      ...mapState('Autenticacion',['usuario']),
      ...mapState('Actualizar',['Bancos','totalBancos'])
  },
  created(){
    this.uri = endPoint.uri
    this.fechas();
    
  },
  mounted(){    
    this.verFacturasPorPagar()
    this.verFacturasCanceladass()
    this.verCaja()
  },
  methods:{
    ...mapMutations('Actualizar',['actualizarBancos','actualizarEstadoFinanciero']),
  verCompra(id){
    console.log(id)
  },
  verCompraEfectivo(id){
    console.log(id)
  },
  verCaja(){
    this.axios.post(this.uri+'/api/contabilidad/verCaja',{headers:{Authorization:localStorage.getItem('token')}})
    .then(res=>{
        this.montoEstadoFinanciero=parseInt(res.data.valores[0].capEfect)
    })
    .catch(err=>{
        console.log(err.response)
    })            
  },
    x(id){
      console.log(id)
      let mab = this.bancos.filter(total => total.id_banco == id)
      this.montoActualBanco = mab[0].monto
    },
  
    sumaPagosBancos(){},
    verBancos(){
      this.dineroTotalEnBancos = 0          
            this.axios.post(this.uri+'/api/bancos/verBancos',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.bancos=res.data.data
            })
            .catch(err=>{
                this.$swal(err.response.data.message)
            })
    },
    fechas(){
      let fecha = new Date()
      let dia = fecha.getDate()
      let mes = fecha.getMonth()+1
      let ano = fecha.getFullYear()
      this.fecha = ano +'-'+mes+'-'+dia
    },
    verFacturasPorPagar(){
      this.axios.post(this.uri + '/api/facturasCompras/verFacturasPorPagar',{headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{    
        this.comprasCreditoPorPagar = res.data.comprasProductos
          })
          .catch(err=>{
              console.log(err)
          })
    },
    verFacturasCanceladass(){
      this.axios.post(this.uri + '/api/facturasCompras/verFacturasCanceladas',{headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
        this.compras = res.data.comprasProductos        
        this.comprasCanceladas = res.data.comprasProductos
          })
          .catch(err=>{
              console.log(err)
          })
    },
    relacionarFactura(){
      this.relacionarFac = true,
      this.verProveedores()
      this.facturaCompra = {} 
      this.facturaCompra.productos=[]
      //this.verRecibosDeCaja()
    },
    nuevaFila(modelo,p_precio,p_cantidad){
        console.log(modelo)
        let valorLinea = p_precio * p_cantidad
        if(this.prod.producto==undefined){
          alert('no debe estar vacio')
          return this.$swal({
              icon: 'warning',
              title: 'Cuidado !!!',
              text: 'el item ya se encuentra registrado',
          })
        }else{
          const result = this.facturaCompra.productos.filter(modeloo => modeloo.modelo == modelo);
          if(result.length>0){
            alert('ya existe el item')
            return
          }else{
            console.log(result)
            this.total  = this.total + valorLinea
            this.facturaCompra.productos.push(this.prod)
            this.prod = {}
            console.log(this.facturaCompra.productos)
            
            this.prod.length = this.prod.length + 1
            console.log('nuevafila')
          }
        }
    },
    restar(p_precio,p_cantidad){
      console.log(p_precio,p_cantidad)
      console.log(p_precio * p_cantidad)
      let valorLinea = p_precio * p_cantidad
      this.total  = this.total - valorLinea
    },
    guardarFacturaCompra(){
      if(this.facturaCompra.codigoFactura==undefined || this.facturaCompra.productos == undefined){
          const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
              onOpen: (toast) => {
                  toast.addEventListener('mouseenter', this.$swal.stopTimer)
                  toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
          })
          Toast.fire({
            icon: 'error',
            title: 'Ningun campo puede estar vacio'
          })
        return
      }else{
        if(this.facturaCompra.codigo!=this.usuario.codigo){
          return this.$swal({
              icon: 'error',
              title: 'Cuidado !!!',
              text: 'El codigo es erroneo',
          })
        }else{
          console.log(this.facturaCompra.codigoFactura)
          this.idfacturacompra = this.facturaCompra.codigoFactura
          let factura = this.facturaCompra  
          factura.valor = this.total 
          if(factura.tipoPago=='Contado'){
            factura.estado = true
          } 
          if(factura.tipoPago=='Credito'){
            factura.estado = false
          }  
          this.axios.post(this.uri + '/api/facturasCompras/guardarFactCompra',{factura,headers:{Authorization:localStorage.getItem('token')}})
          .then(res=>{            
            if(factura.tipoPago=='Credito'){
              this.guardarProductosCompra(factura,1)
              this.verFacturasPorPagar()
            this.relacionarFac = false
            this.facturaCompra = {} 
            this.facturaCompra.productos=[]
          } 
            if(factura.formaPago=='Efectivo'){   
              this.guardarProductosCompra(factura,2)           
              this.mEfectivo.fechaMovimiento = this.fecha
              this.mEfectivo.id_tipoMovimiento = 2
              this.mEfectivo.cod_movimiento = 2
              this.mEfectivo.monto = this.total
              this.mEfectivo.id_empleado = this.usuario.id
              this.mEfectivo.relacionado = true
              this.verFacturasCanceladass()
              this.guardarMovimientoEfectivo(this.mEfectivo)
            }            
            if(factura.formaPago =='Transferencia bancaria'){
              this.guardarProductosCompra(factura,2)
              this.transfer.monto = this.total
              this.transfer.id_empleado = this.usuario.id
              this.transfer.id_tipoMovimiento = 2
              this.transfer.cod_movimiento = 2
              this.transfer.relacionada = true
              this.verFacturasCanceladass()
              this.guardarTransaccion(this.transfer)
            }
          })
          .catch(err=>{
              this.$swal(err.response.data.message)
          })
        }
      }
    },
    guardarTransaccion(transferencia){
      this.axios.post(this.uri + '/api/contabilidad/guardarMovBanco',{transferencia,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
          this.$swal({
            icon: 'success',
            title: 'Muy bien!!!',
            text: 'se a guardado el movimiento efectivo',
          })
          let nuevoValor=0
          this.total = 0
          this.relacionarFac = false          
          nuevoValor= this.montoActualBanco-parseInt(transferencia.monto)
          this.disminuirMontoBanco(transferencia.id_banco,nuevoValor)
          this.movBancosCompra(this.facturaCompra.codigoFactura,transferencia.codTrans)
          this.facturaCompra = {} 
          this.facturaCompra.productos=[]
          this.mov
        })
        .catch(err=>{
            this.$swal(err.response.data.message)
        })
    },
    movBancosCompra(IdFactCompra,codTransaccion){
      let ids={
        IdFactCompra:IdFactCompra,
        codTransaccion:codTransaccion
      }
      this.axios.post(this.uri + '/api/bancos/movBancosCompras',{ids,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
        this.actualizarBancos(true)
      })
      .catch(err=>{console.log('hubo un error')})
    },
    
    disminuirMontoBanco(id,monto){
      let valor={
        id:id,
        monto:monto
      }
      this.axios.post(this.uri + '/api/bancos/disminuirMontoBanco',{valor,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
        console.log('se a disminuido el monto en el banco')
      })
      .catch(err=>{console.log('hubo un error')})
    },
    guardarMovimientoEfectivo(transferencia){
      this.axios.post(this.uri + '/api/contabilidad/guardarMovEfectivo',{transferencia,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
          this.$swal({
            icon: 'success',
            title: 'Muy bien!!!',
            text: 'se a guardado el movimiento efectivo',
          })
          this.movEfectivoCompra(this.facturaCompra.codigoFactura,res.data.data.insertId)
          console.log(this.montoEstadoFinanciero)
          console.log(transferencia.monto)
          this.total = 0
          let montoo = this.montoEstadoFinanciero - transferencia.monto
          console.log('este es el monto',montoo)
          this.actualizarMontoEfectivo(montoo)
          this.relacionarFac = false
          this.facturaCompra = {} 
          this.facturaCompra.productos=[]
        })
        .catch(err=>{
            this.$swal(err.response.data.message)
        })
    },
    actualizarMontoEfectivo(monto){
      let valor={
        monto:monto
      }
      this.axios.post(this.uri + '/api/contabilidad/actualizarMontoEfectivo',{valor,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
        console.log('se a actualizado el monto en efectivo')
        this.actualizarEstadoFinanciero(true)
      })
      .catch(err=>{console.log('hubo un error')})
    },
    movEfectivoCompra(IdFactCompra,id_movimiento){
      console.log(id_movimiento)
      let ids={
        IdFactCompra:IdFactCompra,
        id_movimiento:id_movimiento
      }
      this.axios.post(this.uri + '/api/contabilidad/movComprasEfectivo',{ids,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
        console.log('guardado')
      })
      .catch(err=>{console.log('hubo un error')})
    },
    guardarProductosCompra(producto,numero){
        this.axios.post(this.uri + '/api/facturasCompras/guardarProductosCompra',{producto,headers:{Authorization:localStorage.getItem('token')}})
        .then(res=>{
          console.log('se an guardado los productos yla factura')     
        })
        .catch(err=>{
            this.$swal(err.response)
        })      
            
    },
    verProveedores(){
      this.axios.post(this.uri + '/api/proveedores/proveedores',{headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
          this.proveedores=res.data.data
      })
      .catch(err=>{
          this.$swal(err.response.data.message)
      })
    },
    mostrarFecha(fecha){
            let dma = ''
            for(let a = 0; a <= 9;a++){
                dma = dma + fecha[a]
            }
            return dma
        },
    verProductosProveedor(){
      let id = this.facturaCompra.id_empresaP
      this.axios.post(this.uri + '/api/productos/productosProveedor',{id,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
          this.productosProveedor=res.data.data
          this.productosProveedor.push({tipoProducto:'Agregar nuevo producto a la empresa'},{tipoProducto:''})
          console.log(this.productosProveedor)
      })
      .catch(err=>{
        this.productosProveedor = []
        this.productosProveedor.push({tipoProducto:'Agregar nuevo producto a la empresa'},{tipoProducto:''})
          this.$swal(err.response.data.message)
      })
    },
    formaPagos(){
      if(this.facturaCompra.formaPago == 'Transferencia bancaria'){
        this.tf = true
        this.verBancos()
      }else{
        this.tf = false
      }
      if(this.facturaCompra.formaPago == 'Efectivo'){
        this.efect = true
      }else{
        this.efect = false
      }
    },
    tipoPagos(){
      if(this.facturaCompra.tipoPago==='Credito'){
        this.fechaFin=true
      }else{
        this.fechaFin=false
      }
      if(this.facturaCompra.tipoPago==='Contado'){
        this.contado=true
      }else{
        this.contado=false
      }
    },
    modelos(tipo){
      console.log(tipo)
      if(tipo ==='Agregar nuevo producto a la empresa'){
        this.nuevoProducto=true 
      }else{
        const result = this.productosProveedor.filter(tipoproducto => tipoproducto.tipoProducto == tipo);
        this.modelosProductosProveedor = result
      }      
    },
    verRecibosDeCaja(){
      console.log('hola')
      this.axios.post(this.uri + '/api/rcc/verRecibosCC',{headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{
          this.recibos=res.data.data
          console.log(this.recibos)
      })
      .catch(err=>{
          this.$swal(err.response.data.message)
      })
    },
    nuevoProduct(){
      this.nuevoP.id_empresaP =  this.facturaCompra.id_empresaP
      console.log(this.nuevoP)
      let nuevo = this.nuevoP
      this.axios.post(this.uri + '/api/productos/nuevoProducto',{nuevo,headers:{Authorization:localStorage.getItem('token')}})
      .then(res=>{  
        this.nuevoProducto = false,
        this.nuevoP = {}
        this.verProductosProveedor()
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
  }
}
</script>

<style>

</style>