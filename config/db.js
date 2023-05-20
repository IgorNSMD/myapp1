var Sequelize = require('sequelize');
var dotenv = require('dotenv');
var fs = require("fs")

dotenv.config({
    path:'.env'
})
var db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{
        host:process.env.DB_HOST,
        port:3306,
        dialect:'mysql',
    define: {
        timestamps: true
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(__dirname + '/ssl/DigiCertGlobalRootCA.crt.pem')
        }
    }
    //operatorsAliases:false
});

//conexión a la la bd
try {
    db.authenticate();
    db.sync();
    console.log('conexión correcta a la bd...')
  } catch (error) {
    console.log(error)
  }
  

// async function getDb() { 
//     //conexión a la la bd
    
//     try {
//       await db.authenticate();
//       db.sync();
//       console.log('conexión correcta a la bd...')
//     } catch (error) {
//       console.log(error)
//     }
  
// }

module.exports = db;

