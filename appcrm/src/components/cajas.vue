<template>
<div @mouseleave="verificarEstadoBanco()">
    <h2 class="p-4"><strong>Estados de caja</strong></h2>
    <div class="row p-4">    
        <div class="col-sm-4">
            <div class="card">
                <div class="card-body">
                    <h2><strong>Capital</strong></h2>
                    <h2 class="card-text">{{totalBancos+valores}}</h2>
                    <button class="btn btn-success"> ff </button>
                </div>
            </div>           
        </div>
        <div class="col-sm-4">
            <div class="card">
                <div class="card-body">
                    <h2><strong>Cap en banco</strong></h2>
                    <h2 class="card-text">{{totalBancos}}</h2>
                    <button class="btn btn-primary" @click="verBancos,verBancoss = true,verMovimientosEfectivo=false">ver bancos</button>
                    <button class="btn btn-info" @click="agBanco=true">Agregar banco</button>
                    <button class="btn btn-warning" @click="crearT = true">Crear transaccion</button>
                </div>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="card">
                <div class="card-body">
                    <h2><strong>Cap en Efectivo</strong></h2>
                    <h2 class="card-text">{{valores}}</h2>
                    <button class="btn btn-info" v-if="valores ==0" @click="mtInicial=true">Asignar Monto inicial</button>
                    <div class="btn btn-primary" @click="verMovimientosEfectivo=true, verBancoss=false, verMovEfectivo()">Ver moviemientos efectivo</div>
                    <button class="btn btn-info" @click="rcc=true,btn='uno'">Recibo CC</button>
                    <button class="btn btn-warning" @click="rcc=true,btn='dos'">Recibo CM</button>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div v-if="verBancoss">        
        <div class="container " >
            <div style="height: auto; max-height: 300px; overflow-y: scroll;">
                <table class="table table-hover" >
                    <thead class="thead-dark ">
                        <tr>
                            <th class="sticky-top">Nombre banco</th>
                            <th class="sticky-top">Tipo cuenta</th>
                            <th class="sticky-top">#Cuenta</th>
                            <th class="sticky-top">Monto</th>
                            <th class="sticky-top">Opciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="banco in bancos" :key="banco.index">
                            <td>{{banco.nombreBanco}}</td>
                            <td>{{banco.tipoCuenta}}</td>
                            <td>{{banco.numCuenta}}</td>
                            <td>{{banco.monto}}</td>
                            <td><div class="btn btn-warning" v-if="banco.monto<=0" @click="sumarMonto(banco)"><b-icon-plus></b-icon-plus> Agregar monto inicial</div>
                            <div class="btn btn-danger"><b-icon-slash-circle></b-icon-slash-circle> Deshabilitar</div>
                            <div class="btn btn-primary" @click="verRecibos=false, vertBancarias=true, verTransaccionesBancarias(banco.id_banco)"><b-icon-eye></b-icon-eye> Ver trans bancarias</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br>
            <div class="btn btn-info btn-block" @click="verBancoss=false"><strong><h4>Cerrar</h4></strong></div>
        </div>
    </div>
    <div v-if="verRecibos">        
        <div class="container " >
            <div class="p-2 sticky-top text-right">
                <button class="btn btn-info" @click="verCjasMC()">Todos</button> <button class="btn btn-info" @click="verCajaMenor()">Rcb C-menor</button> <button class="btn btn-info" @click="verCajaMayor">Rcb C-Compras</button>
            </div>
            <div style="height: auto; max-height: 300px; overflow-y: scroll;">
                <table class="table table-hover" >
                    <thead class="thead-dark ">
                        <tr>
                            <th class="sticky-top">#</th>
                            <th class="sticky-top">Fecha</th>
                            <th class="sticky-top">Valor</th>
                            <th class="sticky-top">Motivo</th>
                            <th class="sticky-top">Empleado</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="recibo in recibos" :key="recibo.index">
                            <td>{{recibo.id_recibocaja}}</td>
                            <td>{{mostrarFecha(recibo.fecha)}}</td>
                            <td>{{recibo.valor}}</td>
                            <td>{{recibo.descripcion}}</td>
                            <td>{{recibo.nombreE}} {{recibo.apellidosE}} ({{recibo.rol}})</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br>
            <div class="btn btn-info btn-block" @click="verRecibos=false"><strong><h4>Cerrar</h4></strong></div>
        </div>
    </div>
    <div v-if="verMovimientosEfectivo">        
        <div class="container " >
            <div class="p-2 sticky-top text-right">
                <button class="btn btn-info" @click="verCjasMC()">Todos</button> <button class="btn btn-info" @click="verCajaMenor()">Rcb C-menor</button> <button class="btn btn-info" @click="verCajaMayor">Rcb C-Compras</button>
            </div>
            <div style="height: auto; max-height: 300px; overflow-y: scroll;">
                <table class="table table-hover" >
                    <thead class="thead-dark ">
                        <tr>
                            <th class="sticky-top">#</th>
                            <th class="sticky-top">Fecha</th>
                            <th class="sticky-top">Valor</th>
                            <th class="sticky-top">Tipo mov</th>
                            <th class="sticky-top">Ref mov</th>
                            <th class="sticky-top">Empleado</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="recibo in movEfectivo" :key="recibo.index">
                            <td>{{recibo.id_movimiento}}</td>
                            <td>{{mostrarFecha(recibo.fechaMovimiento)}}</td>
                            <td>{{recibo.monto}}</td>
                            <td>{{recibo.tnombreMovimiento}}</td>
                            <td>{{recibo.nombreMovimiento}}</td>
                            <td>{{recibo.nombreE}} {{recibo.apellidosE}} ({{recibo.rol}})</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br>
            <div class="btn btn-info btn-block" @click="verMovimientosEfectivo=false"><strong><h4>Cerrar</h4></strong></div>
        </div>
    </div>
    <div v-if="agBanco">
        <b-modal v-model="agBanco" fade centered hide-footer hide-header hide-header-close>
            <div class="text-center">
                <h2 class="p-4 bg-primary rounded text-white"><strong>Inserccion de bancos</strong></h2>
                <form method="post" @submit.prevent="agregarBanco()">
                    <div class="p-3">
                        <h2 class="p-3">Nombre del banco</h2>
                        <input type="text" v-model="banco.nombreBanco" class="form-control">
                    </div>
                    <div class="p-3">
                        <h2 class="p-3">tipo de cuenta</h2>
                        <select class="form-control" v-model="banco.tipoCuenta">
                          <option v-for="tcuenta in tipoCuenta" :key="tcuenta.index">{{tcuenta}}</option>
                        </select>
                    </div>
                    <div class="p-3">
                        <h2 class="p-3"># de cuenta</h2>
                        <input class="form-control" type="text" v-model="banco.numCuenta">
                    </div>
                    <button class="btn btn-primary" >Guardar</button>
                    <div class="btn btn-danger" @click="agBanco=false">Cerrar</div>
                </form>    
            </div>
        </b-modal>
    </div>
    <div v-if="agDineroCuenta">
        <b-modal v-model="agDineroCuenta" fade centered hide-footer hide-header hide-header-close>
            <div class="text-center">
                <h2 class="p-4 bg-primary rounded text-white"><strong>{{suma.nombreBanco}}</strong></h2>
                <form method="post" @submit.prevent="sumarMontoBanco()">
                    <div class="p-3">
                        <h2 class="p-3">Agregar el saldo inicial para el banco</h2>
                        <input type="number" class="form-control" v-model="suma.monto">
                    </div> 
                    <button class="btn btn-primary" >Guardar</button>
                    <div class="btn btn-danger" @click="agDineroCuenta=false">Cerrar</div>
                </form>    
            </div>
        </b-modal>
    </div>
    <div v-if="crearT">
        <b-modal v-model="crearT" fade centered hide-footer hide-header hide-header-close>
            <div class="text-center">
                <h2 class="p-4 bg-primary rounded text-white"><strong>Crear transaccion Bancaria</strong></h2>
                <form method="post" @submit.prevent="crearTBancaria()">
                    <div>
                        <h2 class="p-3">Fecha de la transaccion</h2>
                        <input type="date" name="" id="" class="form-control" v-model="crearTransaccion.fechaTrans">
                    </div>
                    <div>
                        <h2 class="p-3">Selecione el banco</h2>
                        <select class="form-control" v-model="crearTransaccion.id">
                            <option v-for="banco in bancos" :key="banco.id_banco" v-bind:value="banco.id_banco">{{banco.nombreBanco}}</option>
                        </select>
                    </div> 
                    <div>
                        <h2 class="p-3">Tipo de transaccion</h2>
                        <select class="form-control" v-model="crearTransaccion.tipoTransaccion">
                            <option v-for="tipo in tipoMovimiento" :key="tipo.id_tipoMovimiento" v-bind:value="tipo.id_tipoMovimiento">{{tipo.tnombreMovimiento}}</option>
                        </select>
                    </div> 
                    <div>
                        <h2 class="p-3">Codigo de la transaccion</h2>
                        <select class="form-control" v-model="crearTransaccion.codTransaccion">
                            <option v-for="cod in codTipoMovimiento" :key="cod.cod_movimiento" v-bind:value="cod.cod_movimiento">{{cod.nombreMovimiento}}</option>
                        </select>
                    </div>
                    <div>
                        <h2 class="p-3">Monto de la transaccion</h2>
                        <input type="number" name="" id="" class="form-control" v-model="crearTransaccion.monto">
                    </div>
                    <br>
                    <button class="btn btn-primary" >Guardar</button>
                    <div class="btn btn-danger" @click="crearT=false">Cerrar</div>
                </form>    
            </div>
        </b-modal>
    </div>
    <div v-if="vertBancarias">
        <b-modal v-model="vertBancarias"  size="xl" fade centered hide-footer hide-header hide-header-close>
            <div style="height: auto; max-height: 300px; overflow-y: scroll;">
                <table class="table table-hover" >
                    <thead class="thead-dark ">
                        <tr>
                            <th class="sticky-top">#</th>
                            <th class="sticky-top">Codigo transaccion</th>
                            <th class="sticky-top">Fecha transaccion</th>
                            <th class="sticky-top">Monto</th>
                            <th class="sticky-top">Tipo</th>
                            <th class="sticky-top">Empleado</th>
                            <th class="sticky-top">relacionada</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="t in tBancarias" :key="t.index">
                            <td>{{t.id_transaccion}}</td>
                            <td>{{t.codTransaccion}}</td>
                            <td>{{mostrarFecha(t.fechaTrans)}}</td>
                            <td>{{t.monto}}</td>
                            <td>{{t.tipoTransaccion}}</td>
                            <td>{{t.id_empleado}}</td>
                            <td v-if="t.tipoTransaccion !='Capital inicial'"><div class="btn btn-danger" v-if="!t.relacion"><b-icon-x-circle></b-icon-x-circle></div><div class="btn btn-primary" v-if="t.relacion"> <b-icon-check></b-icon-check></div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </b-modal>
    </div>
    <div v-if="verBanca">
        <b-modal v-model="verBanca" fade centered hide-footer hide-header hide-header-close>
            <div class="text-center">
                <h2 class="p-4 bg-primary rounded text-white"><strong>Informacion del banco</strong></h2>
                    <div class="p-3">
                        <h2 class="p-3">Nombre del banco</h2>
                        <div type="text" class="form-control">{{banca.nombreBanco}} </div>
                    </div>
                    <div class="p-3">
                        <h2 class="p-3">tipo de cuenta</h2>
                        <div class="form-control">{{banca.tipoCuenta}} </div>
                    </div>
                    <div class="p-3">
                        <h2 class="p-3"># de cuenta</h2>
                        <div class="form-control" type="text" >{{banca.numCuenta}}</div>
                    </div>
                    <div class="p-3">
                        <h2 class="p-3">Monto</h2>
                        <div class="form-control">{{banca.monto}}</div>
                    </div>
                    <div class="btn btn-danger" @click="verBanca=false">Cerrar</div>
            </div>
        </b-modal>
    </div>
    <div v-if="rcc">
        <b-modal v-model="rcc" fade centered hide-footer hide-header hide-header-close>
            <div class="text-center">
                <h2 v-if="btn=='uno'" class="bg-primary p-3 rounded text-white"><strong>Recibo de caja compras</strong></h2>
                <h2 v-if="btn=='dos'" class="bg-primary p-3 rounded text-white"><strong>Recibo de caja menor</strong></h2>
                <form method="post" @submit.prevent="guardarRcc()">
                    <div class="p-3">
                        <h2 class="p-3">Ingrese el Valor</h2>
                        <input type="number" min="0" v-model="recibo.valor" class="form-control">
                    </div>
                    <div class="p-3">
                        <h2 class="p-3">Por motivo de</h2>
                        <textarea rows="4" class="form-control"  v-model="recibo.descripcion"></textarea>
                    </div>
                    <div class="p-3">
                        <h2 class="p-3">Ingrese su codigo</h2>
                        <input type="number" class="form-control" v-model="recibo.codigo">
                    </div>
                    <button class="btn btn-primary" >Guardar</button>
                    <div class="btn btn-danger" @click="rcc=false">Cerrar</div>
                </form>    
            </div>
        </b-modal>
    </div>
    <div v-if="mtInicial">
        <b-modal v-model="mtInicial" fade centered hide-footer hide-header hide-header-close>
            <div class="text-center">
                <form method="post" @submit.prevent="guardarMtInicial()">
                    <div class="p-3">
                        <h2 class="p-3">Ingrese el monto para el capital inicial</h2>
                        <input type="number" min="0" v-model="montoIni.monto" class="form-control">
                    </div>
                    <div class="p-3">
                        <h2 class="p-3">Ingrese su codigo</h2>
                        <input type="number" class="form-control" v-model="montoIni.codigo">
                    </div>
                    <button class="btn btn-primary" >Guardar</button>
                    <div class="btn btn-danger" @click="mtInicial=false">Cerrar</div>
                </form>    
            </div>
        </b-modal>
    </div>
</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import endPoint from '../../src/uri/uri.js'
import rcc from '../components/rcc.vue'
export default {
    name:'cajas',
    components:{
        rcc,
    },
    created(){
        this.uri = endPoint.uri
    },
    mounted(){
        this.verCaja()
        this.verBancos()
        this.tiposMovimientos()
        this.codigosTipoMovimientos()
        this.verMovEfectivo()
        
    },
    updated(){
    },
    data(){
        return {
            uri:'',
            valores:0,
            rcc:false,
            recibo:{},
            recibos:[],
            recibosDos:[],
            verRecibos:false,  
            vertBancarias:false, 
            agBanco:false,
            tipoCuenta:['Corriente','Ahorros'],
            banco:{},
            banca:[],
            bancos:[],
            bancosDos:[],
            verBancoss:false,
            verBanca:false,
            agDineroCuenta:false,
            suma:{},
            valorInicial:0,
            dineroTotalEnBancos:0,
            tBancarias:[],
            crearT:false,
            crearTransaccion:{},
            mtInicial:false,
            montoIni:{},
            tipoMovimiento:[],
            codTipoMovimiento:[],
            verMovimientosEfectivo:false,
            movEfectivo:[],
            aumento:0,
            descuento:0,
            aumentoBanco:0,
            descuentoBanco:0,
        }
    },
    computed:{
        ...mapState('Autenticacion',['usuario']),
        ...mapState('Actualizar',['Bancos','totalBancos','estadoFinanciero']),
    },
    methods:{
        ...mapMutations('Actualizar',['actualizarBancos','actualizarTotalBancos','actualizarEstadoFinanciero']),
        verificarEstadoBanco(){
            if(this.Bancos==true){
                console.log('se ejecuta perfecto')
                this.verBancos()
                this.actualizarBancos(false)
            }
            if(this.estadoFinanciero==true){
                console.log('se ejecuta perfecto el estado financiero')
                this.verCaja()
                this.actualizarEstadoFinanciero(false)
            }
        },
        verificarEstadoFinanciero(){
            if(this.Bancos==true){
                console.log('se ejecuta perfecto')
                this.verBancos()
                this.actualizarBancos(false)
            }else{console.log('se ejecuta perfecto solo que es ',this.Bancos)}
        },
        tiposMovimientos(){
            this.axios.get(this.uri + '/api/contabilidad/tiposMovimientos')
            .then(res=>{this.tipoMovimiento = res.data.tipos
            })
            .catch(err=>{console.log(err)})
        },
        codigosTipoMovimientos(){
            this.axios.get(this.uri + '/api/contabilidad/codTiposMovimientos')
            .then(res=>{this.codTipoMovimiento = res.data.tipos
            })
            .catch(err=>{console.log(err)})
        },
        sumarMonto(banco){
            this.agDineroCuenta=true
            this.suma.nombreBanco = banco.nombreBanco
            this.suma.id = banco.id_banco
            this.valorInicial = banco.monto
            this.suma.id_empleado = this.usuario.id
        },
        sumarMontoBanco(){ 
            const valores= this.suma 
            valores.codTransaccion = '0000'
            valores.fechaTrans = new Date()
            valores.id_tipoMovimiento = 1
            valores.cod_movimiento = 1
            this.axios.post(this.uri+'/api/bancos/agDineroCuenta',{valores,headers:{Authorization:localStorage.getItem('token')}})  
            .then(res=>{
                valores.monto = parseInt(this.valorInicial) + parseInt(this.suma.monto)
                valores.monto = parseInt(valores.monto)
                this.actualizarMonto(valores)
                this.$swal({
                    icon:'success',
                    title: res.data.title + ' !!!',
                    text: res.data.message}
                 )
                 
            })
            .catch(err=>{
                console.log(err.response)
            })      
        },
        crearTBancaria(){
            const valIniBanco = this.bancos.filter(id_banco => id_banco.id_banco == this.crearTransaccion.id);
            this.valorInicial = valIniBanco[0].monto 
            this.crearTransaccion.monto = parseInt(this.crearTransaccion.monto)
            this.crearTransaccion.id_empleado = this.usuario.id
            const valores = this.crearTransaccion
            this.axios.post(this.uri+'/api/bancos/agDineroCuenta',{valores,headers:{Authorization:localStorage.getItem('token')}}) 
            .then(res=>{
                if(valores.tipoTransaccion =='Ingreso'){
                    valores.monto = parseInt(this.valorInicial) + parseInt(this.crearTransaccion.monto)
                    valores.monto = parseInt(valores.monto)  
                }
                if(valores.tipoTransaccion =='Egreso'){
                    valores.monto = parseInt(this.valorInicial) - parseInt(this.crearTransaccion.monto)
                    valores.monto = parseInt(valores.monto)  
                }
                this.actualizarMonto(valores)
                this.$swal({
                    icon:'success',
                    title: res.data.title + ' !!!',
                    text: res.data.message}
                 )
                 
            })
            .catch(err=>{
                console.log(err.response)
            }) 
        },
        actualizarMonto(valores){
            this.suma = {}
            this.valorInicial = 0
            this.axios.post(this.uri+'/api/bancos/actualizarMonto',{valores,headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.$swal({
                    icon:'success',
                    title: res.data.title + ' !!!',
                    text: res.data.message}
                 )
                this.verBancos()
                this.agDineroCuenta = false
            })
            .catch(err=>{
                console.log(err.response)
            }) 
        },
        verBanco(id){
            this.verBanca=true
            this.banca = this.bancosDos
            const result = this.banca.filter(id_banco => id_banco.id_banco == id);
            this.banca = result[0]
        },
        verBancos(){  
            this.dineroTotalEnBancos = 0          
            this.axios.post(this.uri+'/api/bancos/verBancos',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.bancos=res.data.data
                this.bancosDos=res.data.data
                this.bancosDos.forEach(bancos => this.dineroTotalEnBancos = this.dineroTotalEnBancos + bancos.monto)
                this.actualizarTotalBancos(this.dineroTotalEnBancos)
            })
            .catch(err=>{
                this.$swal(err.response.data.message)
            })
             
        },
        agregarBanco(){
            const banco = this.banco
            this.axios.post(this.uri+'/api/bancos/agregarBanco',{banco,headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.$swal({
                    icon:'success',
                    title: res.data.title + ' !!!',
                    text: res.data.message}
                 )
                 this.agBanco=false
                 this.banco = {}
                 this.verBancos()
            })
            .catch(err=>{
                console.log(err.response)
            })
        },
        relacionarTransaccionBancaria(){
            this.axios.post(this.uri+'/api/bancos/relTransBanc',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                //this.valores=res.data.valores[0]
            })
            .catch(err=>{
                console.log(err.response)
            })
        },
        verTransaccionesBancarias(id){
            this.tBancarias = []
            const idd={
                id:id
            }
            this.axios.post(this.uri + '/api/bancos/verTbancarias',{idd,headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.tBancarias = res.data.data
                })
            .catch(err=>{
                 this.$swal(err.response.data.message)
            })
        },
        verCaja(){
            let monto = 0
            this.axios.post(this.uri+'/api/contabilidad/verCaja',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.valores=parseInt(res.data.valores[0].capEfect)
            })
            .catch(err=>{
                console.log(err.response)
            })            
        },
        guardarRcc(){
            if(this.recibo.valor==null|| this.recibo.codigo==null || this.recibo.descripcion==null){
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
                if(this.recibo.codigo!=this.usuario.codigo){
                    return this.$swal({
                        icon: 'error',
                        title: 'Cuidado !!!',
                        text: 'El codigo es erroneo',
                    })
                }else{
                    const datos = {
                        valor: this.recibo.valor,
                        id_em :this.usuario.codigo,
                        descripcion:this.recibo.descripcion
                    }
                    switch (this.btn) {
                        case 'uno':
                            datos.tipoRecibo='RCCompras'
                            break;
                        case 'dos':
                            datos.tipoRecibo='RCMenor'
                            break;
                    }
                    this.axios.post(this.uri+'/api/rcc/guardarRecibosCaja',{datos, headers:{Authorization:localStorage.getItem('token')}})
                    .then(res=>{
                        this.verRecibosCaja()
                        this.rcc = false
                        this.recibo = {}
                    })
                    .catch(err=>{console.log(err)})
                }
            }    
            console.log()
        },
        guardarMtInicial(){
            if(this.montoIni.monto==null|| this.montoIni.codigo==null){
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
                if(this.montoIni.codigo!=this.usuario.codigo){
                    return this.$swal({
                        icon: 'error',
                        title: 'Cuidado !!!',
                        text: 'El codigo es erroneo',
                    })
                }else{
                    const datos = {
                        monto: this.montoIni.monto,
                        id_empleado :this.usuario.id,
                        id_tipoMovimiento:1,
                        cod_movimiento:1,
                    }
                    this.axios.post(this.uri+'/api/contabilidad/guardarMontoInicial',{datos, headers:{Authorization:localStorage.getItem('token')}})
                    .then(res=>{
                        this.$swal({
                        icon: 'success',
                        title: 'Perfecto !!!',
                        text: 'Se a guardado el monto inicial en efectivo',
                    })
                        this.insertarValorInicialTablaEstadoFinanciero(datos.monto)
                        this.verCaja()
                        this.mtInicial = false
                        this.montoIni = {}
                    })
                    .catch(err=>{console.log(err)})
                }
            }    
            console.log()
        },
        insertarValorInicialTablaEstadoFinanciero(capEfect){
            let valores = {
                capEfect:capEfect
            }
            this.axios.post(this.uri + '/api/contabilidad/insertarValorInicialTablaEstadoFinanciero',{valores,headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{console.log(res)
            this.verCaja()})
            .catch(err=>{console.log(err)})
        },
        verRecibosCaja(){
            this.axios.post(this.uri + '/api/rcc/verRecibosCaja',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.recibos = res.data.data
                this.recibosDos = res.data.data
            })
            .catch(err=>{console.log(err)})
        },
        verMovEfectivo(){
            this.axios.post(this.uri + '/api/contabilidad/verMovimientosEfectivo',{headers:{Authorization:localStorage.getItem('token')}})
            .then(res=>{
                this.movEfectivo = res.data.movEfectivo
            })
            .catch(err=>{console.log(err)})
        },
        verCajaMenor(){
            this.recibos = this.recibosDos
            const result = this.recibos.filter(tipoRecibo => tipoRecibo.tipoRecibo == 'RCMenor');
            this.recibos = result
        },
        verCajaMayor(){
            this.recibos = this.recibosDos
            const result = this.recibos.filter(tipoRecibo => tipoRecibo.tipoRecibo == 'RCCompras');
            this.recibos = result
        },
        verCajasMC(){
            this.recibos = this.recibosDos
        },
        mostrarFecha(fecha){
            let dma = ''
            for(let a = 0; a <= 9;a++){
                dma = dma + fecha[a]
            }
            return dma
        },
    }
}
</script>

<style>

</style>