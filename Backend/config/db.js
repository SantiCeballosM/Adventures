const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Santi.Ceba18',
  database: 'Adventures'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión con la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
