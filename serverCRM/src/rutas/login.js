const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('passport')
const bcrypt = require ('bcrypt')
const crypto = require ('crypto-js')
const pool = require('../database');
const contras = "JDhd950402-*/#$%04286482762111dhAD#d06845620178%$102687JdHd020495dDAhd*#&%"

//estructur para consultas a varios campos
//const empleado = await pool.query("SELECT * FROM empleados WHERE cedulaE =? AND celularE = ? ",[cedula,1234567])


    
router.post('/iniSesion', async( req, res, )=>{
    const cedula = crypto.AES.decrypt(req.body.userIdConnect, contras).toString(crypto.enc.Utf8)
    const contrasena = crypto.AES.decrypt(req.body.userPassConnect, contras).toString(crypto.enc.Utf8)
    const empleado = await pool.query("SELECT * FROM empleados WHERE cedulaE = ?",cedula)
    if(empleado.length<1){
        return res.status(401).json({
            title: 'usuario no existe',
            error: ' cedula no registrada',
            success:false 
        });
    }else{
        if(!bcrypt.compareSync(contrasena,empleado[0].contrasenaE)){
            return res.status(401).json({
                title: 'contrasena erronea',
                error: ' contrasena erronea',
                success:false 
            });
        }else{
            console.log(empleado)
            if(empleado[0].editado<1){
                const payload = {
                    _id:empleado[0].id_empleado,
                }
                    let token = jwt.sign(payload,contras,{
                    expiresIn: 60 * 60 * 24 / 2
                })
                    res.status(201).json({ 
                        success:true,
                        rol:empleado[0].rol,
                        token:token
                })
            }else{
                const payload = {
                    _id:empleado[0].id_empleado,
                }
                    let token = jwt.sign(payload,contras,{
                    expiresIn: 60 * 60 * 24 / 2
                })
                    res.status(200).json({ 
                        success:true,
                        rol:empleado[0].rol,
                        token:token
                })
            }       
        }
    }   
});

router.get('/usuario', async(req,res,next)=>{
    console.log(req.headers.authorization)
    let token = req.headers.authorization;
    jwt.verify(token,contras, async(err,decoded)=>{
        if(err){
            console.log(err)
            return res.status(405).json({
                title: 'sin autorizacion',
                success:false
            })
        }else{
            const empleadoLogeado = await pool.query("SELECT * FROM empleados WHERE id_empleado = ?",[decoded._id])
            if(empleadoLogeado.length<1){
                return res.status(400).json ({
                    title: 'Empleado no registrado',
                    success:false
                })
            }else{
                return res.status(200).json({
                    title:'usuario logueado',
                    user : {
                        id:empleadoLogeado[0].id_empleado,
                        codigo:empleadoLogeado[0].cedulaE,
                        nombre:empleadoLogeado[0].nombreE,
                        apellidos:empleadoLogeado[0].apellidosE,
                        celular:empleadoLogeado[0].celularE,
                        email:empleadoLogeado[0].emailE,
                        direccion:empleadoLogeado[0].direccionE,
                        rol:empleadoLogeado[0].rol
                    },
                    success:true
                })
            }
        }
    })
})
module.exports = router;