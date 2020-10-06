const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')
const crypto = require('crypto')
const pool = require('../database');
const { json } = require('express');
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
router.post('/verFacturasPorPagar',siEstaAdentro, async (req, res)=>{ 
    //const movEfectivo = await pool.query("SELECT id_movimiento,fechaMovimiento, monto, nombreE, apellidosE, rol, tnombreMovimiento, nombreMovimiento FROM movimientosEfectivo INNER JOIN empleados ON movimientosEfectivo.id_empleado = empleados.cedulaE INNER JOIN tipomovimiento ON movimientosEfectivo.id_tipoMovimiento = tipomovimiento.id_tipoMovimiento INNER JOIN codigosmovimientos ON movimientosEfectivo.cod_movimiento = codigosmovimientos.cod_movimiento")
    const comprasProductos  =await pool.query("SELECT * FROM factura_compras_productos INNER JOIN proveedores ON factura_compras_productos.id_empresaP = proveedores.id_empresaP WHERE factura_compras_productos.estado = false")
    if(comprasProductos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen datos'
        })
    }else{
        return res.status(200).json({
            comprasProductos
        })
    }
});
router.post('/validarFacturaIngreso',siEstaAdentro, async (req, res)=>{ 
   const validarFactura  =await pool.query("UPDATE factura_compras_productos SET ingresada=? WHERE IdFactCompra =?",[true, req.body.valores.IdFactCompra])
    if(validarFactura.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen datos'
        })
    }else{
        return res.status(200).json({
            validarFactura
        })
    }
});
router.post('/facturaUnicaPorRecibir',siEstaAdentro, async (req, res)=>{ 
    const factura  =await pool.query("SELECT * FROM productoscompra INNER JOIN productos ON productoscompra.id_producto = productos.id_producto WHERE productoscompra.IdFactCompra = ?",[req.body.id.IdFactCompra])
    if(factura.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen datos'
        })
    }else{
        return res.status(200).json({
            factura
        })
    }
});
router.post('/facturasPorRecibir',siEstaAdentro, async (req, res)=>{ 
    const productos  =await pool.query("SELECT * FROM factura_compras_productos INNER JOIN proveedores ON factura_compras_productos.id_empresaP =  proveedores.id_empresaP WHERE factura_compras_productos.ingresada = false ")
    
    if(productos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen datos'
        })
    }else{
        return res.status(200).json({
            productos
        })
    }
});
router.post('/verFacturasPorPagar',siEstaAdentro, async (req, res)=>{ 
    //const movEfectivo = await pool.query("SELECT id_movimiento,fechaMovimiento, monto, nombreE, apellidosE, rol, tnombreMovimiento, nombreMovimiento FROM movimientosEfectivo INNER JOIN empleados ON movimientosEfectivo.id_empleado = empleados.cedulaE INNER JOIN tipomovimiento ON movimientosEfectivo.id_tipoMovimiento = tipomovimiento.id_tipoMovimiento INNER JOIN codigosmovimientos ON movimientosEfectivo.cod_movimiento = codigosmovimientos.cod_movimiento")
    const comprasProductos  =await pool.query("SELECT * FROM factura_compras_productos INNER JOIN proveedores ON factura_compras_productos.id_empresaP = proveedores.id_empresaP WHERE factura_compras_productos.estado = false")
    if(comprasProductos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen datos'
        })
    }else{
        return res.status(200).json({
            comprasProductos
        })
    }
});
router.post('/verFacturasCanceladas',siEstaAdentro, async (req, res)=>{ 
    //const movEfectivo = await pool.query("SELECT id_movimiento,fechaMovimiento, monto, nombreE, apellidosE, rol, tnombreMovimiento, nombreMovimiento FROM movimientosEfectivo INNER JOIN empleados ON movimientosEfectivo.id_empleado = empleados.cedulaE INNER JOIN tipomovimiento ON movimientosEfectivo.id_tipoMovimiento = tipomovimiento.id_tipoMovimiento INNER JOIN codigosmovimientos ON movimientosEfectivo.cod_movimiento = codigosmovimientos.cod_movimiento")
    const comprasProductos  =await pool.query("SELECT * FROM factura_compras_productos INNER JOIN proveedores ON factura_compras_productos.id_empresaP = proveedores.id_empresaP WHERE factura_compras_productos.estado = true")
    if(comprasProductos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen datos'
        })
    }else{
        return res.status(200).json({
            comprasProductos
        })
    }
});
router.post('/guardarFactCompra', siEstaAdentro,async(req,res)=>{
    const factura = {
        fechaCompra : req.body.factura.fechaCompra,
        idFactCompra : req.body.factura.codigoFactura,
        id_empresaP : req.body.factura.id_empresaP,
        tipoCompra : req.body.factura.tipoPago,
        fechaMaxPago : req.body.factura.fechaMaxPago,
        estado: req.body.factura.estado,
        valor:  req.body.factura.valor
    }
    console.log(factura)
    console.log(req.body.factura.productos)
    let productosComprados = req.body.factura.productos
    const facturaGuardada = await pool.query('INSERT INTO factura_compras_productos set ?', [factura])
    .then(ok=>{
        console.log(ok)
        return res.status(200).json({
            title:'Guardado',
            message:'se a guardado la factura correctamente',
            idfactura:factura.idFactCompra,
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
router.post('/guardarProductosCompra', siEstaAdentro,async(req,res)=>{
    let a 
    let id = req.body.producto.codigoFactura
    let tot=req.body.producto.productos.length-1
    console.log(tot)
    for( a = 0; a<=tot;a++){
        let productosComprados  = {
            idFactCompra : id,
            id_producto : req.body.producto.productos[a].modelo,
            cantidad : req.body.producto.productos[a].cantidad,
            valorUnd : req.body.producto.productos[a].precio,
        } 
        console.log(a)
        console.log(productosComprados)
        const facturaGuardada = await pool.query('INSERT INTO productoscompra set ?', [productosComprados]) 
        
    }
      
})


module.exports = router;