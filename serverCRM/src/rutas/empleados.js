const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')
const crypto = require('crypto')
const pool = require('../database');
const contras = "JDhd950402-*/#$%04286482762111dhAD#d06845620178%$102687JdHd020495dDAhd*#&%"

function siEstaAdentro(req,res,next){
    jwt.verify(req.body.headers.Authorization,contras, (err,decoded)=>{
        if(err){
            return res.status(404).json({
                success:false,
                message:'Error en la autenticacion del token'
            })
        }
        if(decoded){
           next()
        }
    })
}
router.post('/agregarEmpleado', siEstaAdentro,async(req,res)=>{
    const nuevoEmpleado = {
        cedulaE,
        nombreE,
        apellidosE,
        celularE,
        emailE,
        contrasenaE,
        direccionE,
        rol,
        fechaNacimientoE,  
    } = req.body.nuevo
    console.log(nuevoEmpleado)
    nuevoEmpleado.contrasenaE=bcrypt.hashSync(nuevoEmpleado.contrasenaE, bcrypt.genSaltSync(10));
    nuevoEmpleado.editado=false
    const agregado = await pool.query('INSERT INTO empleados set ?', [nuevoEmpleado])
    .then(ok=>{
        console.log(ok)
        return res.status(200).json({
            title:'Guardado',
            message:'se a guardado el empleado correctamente',
            data:ok
        })
    })
    .catch(err=>{
        return res.status(400).json({
            title: 'error',
            error: 'error al guaradar empleado',
            data: {errr:err.code, mess:err.sqlMessage}
        })
    })

})    

router.post('/empleados',siEstaAdentro, async (req, res)=>{ 
    const empleados = await pool.query("SELECT * FROM empleados")
    if(empleados.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen empleados aun'
        })
    }else{
        return res.status(200).json({
            data:empleados
        })
    }
 
});
router.post('/empleadosInactivos',siEstaAdentro, async (req, res)=>{ 
    const empleados = await pool.query("SELECT * FROM empleados WHERE estadoE =?",'inactivo')
    if(empleados.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen empleados inactivos'
        })
    }else{
        return res.status(200).json({
            data:empleados
        })
    }
 
});
router.post('/cambioContrasena',siEstaAdentro, async (req, res)=>{ 
    const contrasenaEncriptada=bcrypt.hashSync(req.body.datos.contrasenaNueva, bcrypt.genSaltSync(10))
    const contraCambiada = await pool.query("UPDATE empleados set contrasenaE = ?, editado = ? WHERE id_empleado = ?",[contrasenaEncriptada,true,req.body.datos.id_empleado])
    
    if(contraCambiada.affectedRows<1){
        console.log('no se a cambiado la contraseña')
        return res.status(400).json({
            title: 'error',
            error: 'error al actualizar la contraseña'
        })
    }else{
        console.log(' se  cambiado la contraseña')

        return res.status(200).json({
            title:'cambiado',
            message:'se a actualizado'
        })
    }
 
});
router.post('/recuperarContrasena', async (req,res)=>{
    const empleado =  await pool.query('SELECT * FROM empleados WHERE cedulaE = ? AND emailE = ?', [req.body.cedula,req.body.email])
    console.log(empleado)
    if(empleado.length<1){
        return res.status(400).json({
            title:'no encontrado',
            message: 'los datos no coinciden'
        })
    }else{
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        const aletoria = crypto.createHash('sha1').update(current_date + random).digest('hex');
        let nuevaContrasena = ''
        for(let a=32; a<39;a++){
            nuevaContrasena = nuevaContrasena + aletoria[a]
        }
        console.log(nuevaContrasena)
        const contrasenaEncriptada=bcrypt.hashSync(nuevaContrasena, bcrypt.genSaltSync(10))        
        const cambio = await pool.query("UPDATE empleados set contrasenaE = ?, editado = ? WHERE cedulaE = ?",
        [contrasenaEncriptada,false,empleado[0].cedulaE])
        if(cambio.affectedRows<1){
            return res.status(400).json({
                title: 'error',
                error: 'error al actualizar la contraseña'
            })
        }else{
            console.log(' se  cambiado la contraseña')    

            var API_KEY = '5c10e947952457788525b51898588781-f7d0b107-6da49b48';
            var DOMAIN = 'sandbox38586999993b4b3d9a75d02170539a00.mailgun.org';
            var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
            const data = {
              from: '<dahdhenao@gmail.com>',
              to: 'dahdhenao@gmail.com',
              subject: 'prueba de mail',
              text: 'su nueva contraseña temporal es ' + nuevaContrasena
            };            
            mailgun.messages().send(data, (error, body) => {
                if(error){
                    return res.status(400).json({
                        title: 'error',
                        error: 'error al actualizar la contraseña'
                    })
                }else{
                    return res.status(200).json({
                        title: 'success',
                        message: 'se a enviado la contraseña al mail',
                        data:body,
                    })
                }
            });
        }   
    }
})

module.exports = router;