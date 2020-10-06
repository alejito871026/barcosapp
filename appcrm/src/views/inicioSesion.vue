<template>
    <div id="inicio">
        <div class="p-5">
          <br><br>
          <br><br><br>
            <div class="card bg-transparent border-0 mx-auto col-sm-6 p-1" >                  
                <div class="card body bg-transparent border-primary  text-primary">
                    <form method="post" @submit.prevent="inicioSesion">
                        <div class="form-group text-center">
                            <div class="col-lg-12 ">
                                <br>
                            <span class=""><h2><strong>Cedula:</strong></h2></span>
                            <input v-model="cedula" type="text" class="form-control" />
                            </div>
                            <div class="col-lg-12">
                                <br>
                            <span><h2><strong>Contraseña:</strong></h2></span>
                            <input 
                                v-model="contrasena"
                                type="password"
                                class="form-control"
                            />
                            <br>
                            </div>
                        </div>
                        <div class="form-group col-lg-12">
                            <button class="btn btn-primary btn-block"><h4><strong>Iniciar Sesion</strong></h4></button>
                        </div>
                    </form>
                    <div class="card-footer bg-transparent border-primary  text-primary">
                      <button class="btn btn-warning text-white btn-block" @click="modal=true"><h4><strong>olvido su contraseña</strong></h4></button>
                    </div>
                    <br>
                </div>
            </div>
        </div>
            <br><br><br><br><br><br><br><br><br><br><br>            
              <b-modal  v-model="modal" centered hide-header hide-footer >
                <form method="post" @submit.prevent="recuperarContrasena()">
                  <div class="form-group text-center">
                    <label for="exampleInputPassword1">Cedula</label>
                    <input type="text" class="form-control" v-model="cedula">
                    <small  class="form-text text-muted">Escribe el numero de cedula de empleado</small>
                  </div>
                  <div class="form-group text-center">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" class="form-control" v-model="email">
                    <small id="emailHelp" class="form-text text-muted">ingresa el email con el que estas registrado</small>
                  </div>
                  <button class="btn btn-primary btn-block">Recuperar contraseña</button>                  
                </form>
                <br>
                  <button class="btn btn-danger btn-block" @click="modal=false">cancelar</button>                  
              </b-modal>
    </div>
</template>

<script>
import endPoint from "../uri/uri.js";
import axios from "axios";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "iniciosesion",
  components: {
 
  },

  created() {
    if (localStorage.getItem("token") != null) {
      this.$router.push("/dashboard");
    }
  },
  mounted(){
    this.uri = endPoint.uri
  },
  data() {
    return {
      uri:"",
      cedula: "",
      contrasena: "",
      contras: "JDhd950402-*/#$%04286482762111dhAD#d06845620178%$102687JdHd020495dDAhd*#&%",//cuidado con el valor de sta variable
      modal:false,
      email:'',
    }
  },
  methods: {
    ...mapActions('Autenticacion',['LOGIN']),
    inicioSesion() {
      const user = {
        userIdConnect: this.cedula,
        userPassConnect: this.contrasena
      };
        user.userIdConnect = this.CryptoJS.AES.encrypt(user.userIdConnect, this.contras).toString();
        user.userPassConnect = this.CryptoJS.AES.encrypt(user.userPassConnect, this.contras).toString();
        this.LOGIN(user)
        .then( res => {
          if(res == 'primeravez'){
            this.$router.push("/actualizarContrasena");
          }
          switch (res) {
            case 'ADMIN':              
              this.$router.push("/dashboard"); 
            break;  
            case 'ALMACENISTA':              
              this.$router.push("/almacen"); 
            break;         
            default:
              return
            break;
          }          
        })
       .catch( err => {
         this.$swal(err.response.data.error)
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
  }
};

</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
#inicio {
    background-image: url('../assets/cinco.jpg');
    background-size:2000px 1080px;
}
#encabezado {
    background-image: url('../assets/dos.jpg');

}
</style>