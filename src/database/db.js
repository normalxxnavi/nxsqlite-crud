const sqlite3 = require("sqlite3").verbose();

const createTable = 
`CREATE TABLE IF NOT EXISTS articulos (
    id          INTEGER PRIMARY KEY,
    nombre      TEXT NOT NULL,
    descripcion TEXT,
    precio      DECIMAL(10,2),
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

const createTableProveedores= `CREATE TABLE IF NOT EXISTS proveedores (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  telefono TEXT CHECK(length(telefono) = 9),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./db.sqlite",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => { if (err) return console.error(err.message); console.log("Connected to the SQlite database."); }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the items of table if it doesn't exist
  db.run(createTable,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created items table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM articulos`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from items");

        // Insert new data into the products table
        const values1 = [ "Teclado", "Mi teclado favorito",  22.01  ];
        const values2 = [ "Monitor", "Monitor de 17 pulgadas", 99.99  ];

        const insertSql = `INSERT INTO articulos(nombre, descripcion, precio) VALUES(?, ?, ?)`;

        db.run(insertSql, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        db.run(insertSql, values2, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });
      });
    }
  );
});

db.serialize(() => {
  // Create the items of table if it doesn't exist
  db.run(createTableProveedores,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created items table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM proveedores`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from items");

        // Insert new data into the products table
        const values1 = [ "Javier", 667054449];
        const values2 = [ "Angel", 666777999];

        const insertSql = `INSERT INTO proveedores(nombre, telefono) VALUES(?, ?)`;

        db.run(insertSql, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        db.run(insertSql, values2, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });
        //   Close the database connection after all insertions are done
        db.close((err) => { if (err) { return console.error(err.message); }
          console.log("Closed the database connection.");
        });
      });
    }
  );
});