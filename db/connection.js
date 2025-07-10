// importiamo la libreria

const mysql = require("mysql2");

// creiamo l' oggetto  per la connessione

const credential = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_blog",
};

//  creiamo una variabil epr la connesione
const connection = mysql.createConnection(credential);
console.log(connection);

// nel caso ci sia un errore

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.info("Conessione a db avvenuta");
  }
});

module.exports = connection;
