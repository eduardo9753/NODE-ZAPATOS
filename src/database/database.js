const mysql = require('mysql');
const { promisify } = require('util');//PREINSTALADO
const { database } = require('./keys');

//POOL QUERY
const pool = mysql.createPool(database)
pool.getConnection((err, connection) => {
   if(err){
       if(err.code==='PROTOCOL_CONNECTION_LOST'){console.error('DATABASE CONECTION WAS CLOSED');}
       if(err.code==='ER_CON_COUNT_:ERROR'){console.error('DATABASE HAS TO MANY CONNECTIONS');}
       if(err.code==='ECONNREFUSED'){console.error('DATABASE CONNECTION WAS REFUSED');}
   }else if(connection){
       connection.changeUser( { database : database.database });
       connection.release();
       console.log('DB CONECTED :)');
       return connection;
   }else{
       console.log('NO HAY CONEXION');
   }
});

pool.query = promisify(pool.query);
//EXPORTAMOS LA CONEXION
module.exports = pool;