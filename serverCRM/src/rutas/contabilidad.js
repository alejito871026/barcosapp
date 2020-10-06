const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const multer = require('multer')
const bcrypt = require ('bcrypt')
const crypto = require('crypto')
const pool = require('../database');
const { MulterError } = require('multer');
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
router.post('/verCaja',siEstaAdentro, async (req, res)=>{ 
    const valores = await pool.query("SELECT * FROM estadofinanciero")
    if(valores.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen datos'
        })
    }else{
        console.log(valores)
        return res.status(200).json({
            valores
        })
    }
});

router.post('/guardarMontoInicial', siEstaAdentro,async(req,res)=>{
    console.log(req.body)
    const banco = {
    }=req.body.datos
    const guardarMontoBanco = await pool.query('INSERT INTO movimientosefectivo set=?', [banco])
    .then(ok=>{
        return res.status(200).json({
            title:'Guardado',
            message:'se a sumado el dinero correctamente',
            data:ok
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(400).json({
            title: 'error',
            error: 'error al guardar el proveedor',
            data: {errr:err.code, mess:err.sqlMessage}
        })
    })
});

router.get('/tiposMovimientos', async (req, res)=>{ 
    const tipos = await pool.query("SELECT * FROM tipomovimiento")
    if(tipos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen datos'
        })
    }else{
        return res.status(200).json({
            tipos
        })
    }
});
router.get('/codTiposMovimientos', async (req, res)=>{ 
    const tipos = await pool.query("SELECT * FROM codigosmovimientos")
    if(tipos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen datos'
        })
    }else{
        return res.status(200).json({
            tipos
        })
    }
});
router.post('/verMovimientosEfectivo', async (req, res)=>{ 
    const movEfectivo = await pool.query("SELECT id_movimiento,fechaMovimiento, monto, nombreE, apellidosE, rol, tnombreMovimiento, nombreMovimiento FROM movimientosEfectivo INNER JOIN empleados ON movimientosEfectivo.id_empleado = empleados.id_empleado INNER JOIN tipomovimiento ON movimientosEfectivo.id_tipoMovimiento = tipomovimiento.id_tipoMovimiento INNER JOIN codigosmovimientos ON movimientosEfectivo.cod_movimiento = codigosmovimientos.cod_movimiento")
    .catch(err=>{console.log(err)})
    if(movEfectivo.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen datos'
        })
    }else{
        return res.status(200).json({
            movEfectivo
        })
    }
});
router.post('/guardarMovEfectivo', siEstaAdentro,async(req,res)=>{
    const movimiento = {
        fechaMovimiento : req.body.transferencia.fechaMovimiento,
        id_tipoMovimiento:req.body.transferencia.id_tipoMovimiento,
        cod_movimiento :req.body.transferencia.cod_movimiento,
        monto :req.body.transferencia.monto,
        id_empleado :req.body.transferencia.id_empleado,
        relacionado :req.body.transferencia.relacionado,
    }
    const movGuardado = await pool.query('INSERT INTO movimientosefectivo set ?', [movimiento])
    .then(ok=>{
        return res.status(200).json({
            title:'Guardado',
            message:'se a guardado el movimiento correctamente',
            data:ok
        })
    })
    .catch(err=>{
        return res.status(400).json({
            title: 'error',
            error: 'error al guardar el movimiento',
            data: {errr:err.code, mess:err.sqlMessage}
        })
    })
})
router.post('/movComprasEfectivo', siEstaAdentro,async(req,res)=>{
    console.log(req.body)
    const bancoGuardado = await pool.query('INSERT INTO pagosfacturaefectivo set ?', [req.body.ids])
    .then(ok=>{
        return res.status(200).json({
            title:'Guardado',
            message:'se a guardado el banco correctamente',
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(400).json({
            title: 'error',
            error: 'error al guardar el banco',
            data: {errr:err.code, mess:err.sqlMessage}
        })
    })
})
router.post('/guardarMovBanco', siEstaAdentro,async(req,res)=>{
    const movimiento = {
        codTransaccion : req.body.transferencia.codTrans,
        id_banco : req.body.transferencia.id_banco,
        fechaTrans : req.body.transferencia.fechaTrans,
        id_tipoMovimiento:req.body.transferencia.id_tipoMovimiento,
        cod_movimiento :req.body.transferencia.cod_movimiento,
        monto :req.body.transferencia.monto,
        id_empleado :req.body.transferencia.id_empleado,
        relacionada :req.body.transferencia.relacionada,
    }
    console.log(movimiento)
    const movGuardado = await pool.query('INSERT INTO movimientosbancos set ?', [movimiento])
    .then(ok=>{
        return res.status(200).json({
            title:'Guardado',
            message:'se a guardado el movimiento correctamente',
            data:ok
        })
    })
    .catch(err=>{
        return res.status(400).json({
            title: 'error',
            error: 'error al guardar el movimiento',
            data: {errr:err.code, mess:err.sqlMessage}
        })
    })
})
router.post('/actualizarMontoEfectivo',siEstaAdentro, async (req, res)=>{ 
    const bancos = await pool.query("UPDATE estadofinanciero SET capEfect =?",[req.body.valor.monto])
    if(bancos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no hay movimientos registrados a este banco'
        })
    }else{
        return res.status(200).json({
            data:bancos
        })
    }    
});
router.post('/insertarValorInicialTablaEstadoFinanciero', siEstaAdentro,async(req,res)=>{
    console.log(req.body)
    const guardarMontoBanco = await pool.query('INSERT INTO estadofinanciero SET capEfect =?', [req.body.valores.capEfect])
    .then(ok=>{
        return res.status(200).json({
            title:'Guardado',
            message:'se a sumado el dinero correctamente',
            data:ok
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(400).json({
            title: 'error',
            error: 'error al guardar el proveedor',
            data: {errr:err.code, mess:err.sqlMessage}
        })
    })
});
module.exports = router;