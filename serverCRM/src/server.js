const express = require ('express')
const app = express()
const http = require('http').createServer(app);
var io = require('socket.io')(http)
const cors = require ('cors')
const path = require ('path')
const morgan = require ('morgan')


app.use(morgan('dev'));
app.use(express.json()); 
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use('/api/login',require('./rutas/login.js'));
app.use('/api/empleados',require('./rutas/empleados.js'));
app.use('/api/proveedores',require('./rutas/proveedores.js'));
app.use('/api/productos',require('./rutas/productos.js'));
app.use('/api/contabilidad',require('./rutas/contabilidad.js'));
app.use('/api/rcc',require('./rutas/rcc.js'));
app.use('/api/facturasCompras',require('./rutas/compras.js'));
app.use('/api/bancos',require('./rutas/bancos.js'));
app.use('/uploads',express.static('uploads'));


let arregloActivo = []  
io.on('connection', (socket) => {
    console.log('usuario conectado');
    //console.log(socket.id)
    //socket.on('tachar',(data)=>{
        //arregloActivo.push(data) 
        //arregloActivo=arregloActivo.sort(function(a, b) {
         //   return a - b;
       // }); 
       // io.emit('tachar',(data))
   // }); 
    socket.on('usuarioActivo',(usuario)=>{
        console.log(usuario)
       io.emit('actualizar',usuario)              
    })  
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const host = process.env.HOST || '0.0.0.0';
const port  = process.env.PORT || 7500

//app.set('port', process.env.PORT || 9000);


http.listen(port,host,() => {
    console.log('server on port',port);
});