import axios from 'axios'
export default {
    namespaced:true,
    state: {
      usuario:{},
    },
    getters: {

    }, 
    mutations:{
       estadoUsuario(state,user){
           state.usuario=user
       } 
    },
    actions: {
        LOGIN : (({commit},payload)=>{
            return new Promise ((resolve,  reject) => {
                axios.post('http://localhost:7500/api/login/iniSesion', payload)
                .then(res =>{
                    if(res.status === 200){
                        localStorage.setItem('token', res.data.token)
                        resolve(res.data.rol)
                        }
                        if(res.status === 201){
                            localStorage.setItem('primeravez', res.data.token)
                            resolve('primeravez')
                        }
                }, err =>{
                   reject(err);
                }) 
            }); 
        }),
        
    
    }
}