<template>
  <div id="inicio">
        <div id="barra">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end sticky-top">
            <a class="navbar-brand" href="/home">
                CRM-agil
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse  justify-content-end container" id="navbarNav">
                <ul class="navbar-nav ">
                    <li class="nav-item">
                        <a @click="salir"  class="nav-link">Salir</a>
                    </li>
                </ul>
            </div>
            </nav>
        </div>
        <div class="p-5">
          <br><br>
          <br><br>
      <div class="card bg-transparent border-0 mx-auto col-sm-6 p-1" >
          <div class="card body bg-transparent border-primary  text-primary p-4">
              <h2><strong>Bienvenido {{nombreUser}} <br> ahora puedes digitar tu nueva contraseña</strong></h2>
          </div>
          <div class="card body bg-transparent border-primary  text-primary">
                <form @submit.prevent="nuevaContrasena">
                    <div>
                        <h2 class="p-2">Nueva contraseña</h2>
                        <div class="col-lg-12 input-group mb-3">
                            <input v-if="!ver"
                                @keyup="validacion()"
                                v-model="contrasena1"
                                type="password"
                                class="form-control"
                            />
                            <input v-if="ver"
                                @keyup="validacion()"
                                v-model="contrasena1"
                                type="text"
                                class="form-control"
                            />
                            <div class="input-group-append">
                                <button class="btn-primary btn" @click="ver=true" v-if="!ver"><b-icon-eye-fill></b-icon-eye-fill></button>
                            </div>
                            <div class="input-group-append">
                                <button class="btn-info btn" @click="ver=false" v-if="ver"><b-icon-eye-slash-fill></b-icon-eye-slash-fill></button>
                            </div>
                            <div class="input-group-append">
                                <button v-if="!ok" class="btn-danger btn"><b-icon-x-square></b-icon-x-square></button>
                            </div>
                            <div class="input-group-append">
                                <button v-if="ok" class="btn-primary btn"><b-icon-check-all></b-icon-check-all></button>
                            </div>
                        </div>
                        <div class="container">
                            <div class="alert alert-warning alert-dismissible" v-if="!ok">
                                <strong>Debe contener mas de 10 caracteres</strong> entre mayusculas, minusculas,  caracteres especiales y numeros.
                            </div>
                        </div>
                        <div >
                            <h2 class="p-2">Repetir contraseña</h2>
                            <div class="col-lg-12 input-group mb-3">
                                <input v-if="!ver2"
                                    @keyup="validacion2()"
                                    v-model="contrasena2"
                                    type="password"
                                    class="form-control"
                                />
                                <input v-if="ver2"
                                    @keyup="validacion2()"
                                    v-model="contrasena2"
                                    type="text"
                                    class="form-control"
                                />
                                <div class="input-group-append">
                                    <button class="btn-primary btn" @click="ver2=true" v-if="!ver2"><b-icon-eye-fill></b-icon-eye-fill></button>
                                </div>
                                <div class="input-group-append">
                                    <button class="btn-info btn" @click="ver2=false" v-if="ver2"><b-icon-eye-slash-fill></b-icon-eye-slash-fill></button>
                                </div>
                                <div class="input-group-append">
                                    <button v-if="!ok2" class="btn-danger btn"><b-icon-x-square></b-icon-x-square></button>
                                </div>
                                <div class="input-group-append">
                                    <button v-if="ok2" class="btn-primary btn"><b-icon-check-all></b-icon-check-all></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-block" v-if="botonGuardar">Guardar contraseña</button>
                </form>
          </div>
      </div>  
      </div>  
      <br><br><br>
      <br><br><br>
  </div>
</template>

<script>
import endPoint from "../uri/uri.js";

export default {
    name : 'actualizarContrasena',
    data(){
        return {
            aprobado:false,
            contrasena1:'',
            contrasena2:'',
            ok:false,
            ver:false,
            ver2:false,
            ok2:false,
            botonGuardar:false,
            uri:'',
            user:'',
            nombreUser:''
        }
    },
    created(){
        this.uri = endPoint.uri
        if (localStorage.getItem("token") != null ){ 
            this.$router.push('/dashboard')
        }
        if (localStorage.getItem("primeravez") === null ) {
            this.$router.push('/iniciosesion')
        } else{
            this.axios.get(this.uri+'/api/login/usuario', {headers:{Authorization:localStorage.getItem('primeravez')}})
            .then(res => {
                this.user=res.data.user.id
                this.nombreUser= res.data.user.nombre+' '+res.data.user.apellidos
            })
            .catch(err => {
                localStorage.clear()
                this.$router.push('/inicioSesion')
            });
        }        
        
    },
    methods:{
        validacion(){
            if(this.contrasena1 == ''){
               this.botonGuardar = false
            }
            if (this.contrasena1.match(/[a-z]/) && this.contrasena1.match(/[0-9]/) && this.contrasena1.match(/[A-Z]/) 
            && this.contrasena1.length > 10 && this.contrasena1.match(/[!#$/¡?¿%&*]/)){
                this.ok = true
            }else{
                this.ok =false
            }
            if (this.contrasena1 === this.contrasena2){
                this.botonGuardar = true
                this.ok2 = true
            }else{
                this.botonGuardar = false
                this.ok2 = false
            }
        },
        validacion2(){
            if(this.contrasena2 == ''){
               this.botonGuardar = false
            }
            if (this.contrasena2 === this.contrasena1){
                this.ok2 = true
            }else{
                this.ok2 =false
                this.botonGuardar = false
            }
            if(this.ok && this.ok2){
                this.botonGuardar = true
            }
        },
        nuevaContrasena(){
            let datos = {
                id_empleado:this.user,
                contrasenaNueva:this.contrasena2
            }
            this.axios.post(this.uri+'/api/empleados/cambioContrasena',{datos,headers:{Authorization:localStorage.getItem('primeravez')}})
            .then(res=>{
                this.$swal({
                    icon: 'success',
                    title: 'ok',
                    text: 'Se a cambiado la contraseña exitosamente!',
                })
                localStorage.clear()
                this.$router.push('/iniciosesion')
            })
            .catch(err=>{
                console.log(err.response)
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
                return
            })
        },
        salir(){
            localStorage.clear()
            this.$router.push('/iniciosesion')
        },
    }
}
</script>
<style lang="scss" scoped>
#inicio {
    background-image: url('../assets/cinco.jpg');
    background-size:2000px 1080px;
}
#encabezado {
    background-image: url('../assets/dos.jpg');

}
</style>