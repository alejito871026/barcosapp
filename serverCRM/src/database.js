const mysql = require('mysql');
const {database} = require('./keys');
const { promisify } = require('util')

const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if (err){
        console.log(err.code)        
    }
    if(connection){
        connection.release();
        console.log('base de datos conectada')
    }
})

pool.query = promisify(pool.query);

module.exports = pool;