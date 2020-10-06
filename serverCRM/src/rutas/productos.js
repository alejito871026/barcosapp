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



router.post('/validarIngresoBodega',siEstaAdentro, async (req, res)=>{ 
    const productos = await pool.query("UPDATE productoscompra SET ingresado =? WHERE IdFactCompra = ? AND id_producto = ?",[true,req.body.valores.IdFactCompra,req.body.valores.id_producto])
    if(productos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen productos aun'
        })
    }else{
        return res.status(200).json({
            data:productos
        })
    }
});

//consultas desde el modulo de administrador

router.post('/productos',siEstaAdentro, async (req, res)=>{ 
    const productos = await pool.query("SELECT * FROM productos")
    if(productos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen productos aun'
        })
    }else{
        return res.status(200).json({
            data:productos
        })
    }
});
router.post('/productosProveedor',siEstaAdentro, async (req, res)=>{ 
    console.log(req.body.id)
    const productos = await pool.query("SELECT * FROM productos WHERE id_empresaP = ?",[req.body.id])
    if(productos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen productos aun'
        })
    }else{
        return res.status(200).json({
            data:productos
        })
    }
});
router.post('/verFotosProducto',siEstaAdentro, async (req, res)=>{ 
    const fotos = await pool.query("SELECT url FROM imagenesproducto WHERE id_producto = ?",[req.body.idd.id_producto])
    if(fotos.length<1){
        return res.status(400).json({
            title:'error',
            message: 'no existen fotos aun'
        })
    }else{
        return res.status(200).json({
            data:fotos
        })
    }
});

router.post('/nuevoProducto', siEstaAdentro,async(req,res)=>{
    const nuevoProducto = {
        id_empresaP,
        tipoProducto,
        modelo,
        colores,
        texturas,
        imagenes,
        alto,
        ancho,
        profunfo,
        descripcion, 
    } = req.body.nuevo
    console.log(nuevoProducto)
    const agregado = await pool.query('INSERT INTO productos set ?', [nuevoProducto])

    .then(ok=>{
        return res.status(200).json({
            title:'Guardado',
            message:'se a guardado el producto correctamente',
            data:ok
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(400).json({
            title: 'error',
            error: 'error al guardar el producto',
            data: {errr:err.code, mess:err.sqlMessage}
        })
    })
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})
const upload = multer({ storage: storage })

router.post('/guardarFotoProducto', upload.array('files',6), async(req,res)=>{
    console.log(req.files)
    res.json({
        files:req.files
    })
})



router.post('/guardarUrlImagenes', siEstaAdentro,async (req,res)=>{
    console.log(req.body)
        datos={
            id_producto: req.body.data.id,
            url : req.body.data.url,             
        }   
        console.log(datos)     
        const urlActualizada =await  pool.query('INSERT INTO imagenesproducto SET ? ',[datos])
        .then(ok=>{
            return res.status(200).json({
                title:'Guardado',
                message:'se a guardado las urlsImagenes correctamente',
            })
        })
        .catch(err=>{
            console.log(err)
            return res.status(400).json({
                title: 'error',
                error: 'error alactualizar las urls de imagenes en el producto',
                data: {errr:err.code, mess:err.sqlMessage}
            })
        })
    
})

module.exports = router;