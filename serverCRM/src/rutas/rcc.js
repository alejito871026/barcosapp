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
router.post('/verRecibosCaja',siEstaAdentro, async (req, res)=>{ 
    const recibos = await pool.query("SELECT id_recibocaja, valor, id_em, fecha, descripcion, tipoRecibo, nombreE, apellidosE, rol FROM reciboscaja INNER JOIN empleados ON reciboscaja.id_em = empleados.cedulaE ORDER BY id_recibocaja DESC")
    if(recibos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen recibos aun'
        })
    }else{
        return res.status(200).json({
            data:recibos
        })
    }
 
});
router.post('/verRecibosCC',siEstaAdentro, async (req, res)=>{ 
    const recibos = await pool.query("SELECT * FROM reciboscaja WHERE relacionada = false AND tipoRecibo = 'RCCompras'")
    if(recibos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen recibos aun'
        })
    }else{
        return res.status(200).json({
            data:recibos
        })
    }
 
});

router.post('/guardarRecibosCaja', siEstaAdentro,async(req,res)=>{
    const rc = {
        id_em,
        valor,
        tipoRecibo,
    } = req.body.datos
    const reciboGuardado = await pool.query('INSERT INTO reciboscaja set ?', [rc])
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