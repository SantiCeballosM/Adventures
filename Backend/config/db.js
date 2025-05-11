// const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Santi.Ceba18',
//   database: 'Adventures'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error de conexión con la base de datos:', err);
//     return;
//   }
//   console.log('Conectado a la base de datos MySQL');
// });

// module.exports = db;



// Por esto:
const mysql = require('mysql2/promise'); // Versión con soporte para promesas

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Santi.Ceba18',
  database: 'Adventures',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
pool.getConnection()
  .then(conn => {
    console.log('Conexión a MySQL establecida');
    conn.release();
  })
  .catch(err => {
    console.error('Error al conectar a MySQL:', err);
  });

module.exports = pool;