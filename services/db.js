const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tolga',
  password: 'postgres',
  port: 5432,
})


const connectDB = async () => {
    await pool.connect(function(err) {
        if (err) throw err;
        console.log("DB is connected...");

      });
}


module.exports = {
    connectDB
}


