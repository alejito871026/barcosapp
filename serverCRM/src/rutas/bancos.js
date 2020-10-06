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

router.post('/agregarBanco', siEstaAdentro,async(req,res)=>{
    console.log(req.body)
    const banco = {
        nombreBanco,
        tipoCuenta,
        numCuenta
    } = req.body.banco
    const bancoGuardado = await pool.query('INSERT INTO bancos set ?', [banco])
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
router.post('/agDineroCuenta', siEstaAdentro,async(req,res)=>{
    console.log(req.body)
    const banco = {
        id_banco : req.body.valores.id,
        id_empleado : req.body.valores.id_empleado,
        monto:req.body.valores.monto,
        codTransaccion:req.body.valores.codTransaccion,
        fechaTrans:req.body.valores.fechaTrans,
        id_tipoMovimiento : req.body.valores.id_tipoMovimiento,
        cod_movimiento : req.body.valores.cod_movimiento
    }
    const guardarMontoBanco = await pool.query('INSERT INTO movimientosbancos set ?', [banco])
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
})
router.post('/actualizarMonto', siEstaAdentro,async(req,res)=>{
    const banco = {
        id_banco : req.body.valores.id,
        monto:req.body.valores.monto,
    }
    const actualizarMontoBanco = await pool.query('UPDATE bancos SET monto = ? WHERE id_banco = ?', [banco.monto,banco.id_banco])
    .then(ok=>{
        return res.status(200).json({
            title:'Guardado',
            message:'se a sumado el dinero correctamente',
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
router.post('/relTransBanc', siEstaAdentro,async(req,res)=>{
    const factura = {
        fechaCompra : req.body.factura.fechaCompra,
        idFactCompra : req.body.factura.codigoFactura,
        id_empresaP : req.body.factura.id_empresaP,
        tipoCompra : req.body.factura.tipoPago,
        fechaMaxPago : req.body.factura.fechaMaxPago,   
        id_recibocaja : req.body.factura.id_recibocaja,
    }
    console.log(factura)
    console.log(req.body.factura.productos)
    let productosComprados = req.body.factura.productos
    const facturaGuardada = await pool.query('INSERT INTO factura_compras_productos set ?', [factura])
    .then(ok=>{
        return res.status(200).json({
            title:'Guardado',
            message:'se a guardado la factura correctamente',
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
router.post('/verBancos',siEstaAdentro, async (req, res)=>{ 
    const bancos = await pool.query("SELECT * FROM bancos")
    if(bancos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no hay bancos agregados'
        })
    }else{
        return res.status(200).json({
            data:bancos
        })
    }
});
router.post('/verTbancarias',siEstaAdentro, async (req, res)=>{ 
    const bancos = await pool.query("SELECT * FROM movimientosbancos WHERE id_banco = ?",[req.body.idd.id])
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
router.post('/movBancosCompras', siEstaAdentro,async(req,res)=>{
    console.log(req.body)
    const bancoGuardado = await pool.query('INSERT INTO pagosfacturabanco set ?', [req.body.ids])
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
router.post('/disminuirMontoBanco',siEstaAdentro, async (req, res)=>{ 
    const bancos = await pool.query("UPDATE bancos Set monto =?  WHERE id_banco = ?",[req.body.valor.monto,req.body.valor.id])
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

module.exports = router;