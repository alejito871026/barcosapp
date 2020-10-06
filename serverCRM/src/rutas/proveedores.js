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
router.post('/proveedores',siEstaAdentro, async (req, res)=>{ 
    const proveedores = await pool.query("SELECT * FROM proveedores")
    if(proveedores.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen proveedores aun'
        })
    }else{
        return res.status(200).json({
            data:proveedores
        })
    }
 
});

router.post('/nuevoProveedor', siEstaAdentro,async(req,res)=>{
    const nuevoProveedor = {
        nit_empresaP,
        nombre_empresaP,
        telefono_empresaP,
        whatsapp_empresaP,
        email_empresaP,
        ciudad_empresaP,
        direccion_empresaP, 
    } = req.body.nuevo
    console.log(nuevoProveedor)
    const agregado = await pool.query('INSERT INTO proveedores set ?', [nuevoProveedor])
    .then(ok=>{
        return res.status(200).json({
            title:'Guardado',
            message:'se a guardado el proveedor correctamente',
            data:ok
        })
    })
    .catch(err=>{
        return res.status(400).json({
            title: 'error',
            error: 'error al guardar el proveedor',
            data: {errr:err.code, mess:err.sqlMessage}
        })
    })
})

module.exports = router;