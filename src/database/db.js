// Importando dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

// Objeto de operações no Banco de Dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// Utilização do objeto de BD para as Operações
db.serialize(() => {

//     // Tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `);

//     // Inserindo dados na Tabela
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `

//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim",
//         "Nº260",
//         "Santa Catarina",
//         "Rua do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com Sucesso!");
//         console.log(this);
//     }

//     db.run(query, values, afterInsertData);

    // Consulta de Dados
    // db.all(`SELECT name FROM places`, function (err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão os seus registros");
    //     console.log(rows);
    // });

    //Delete dos dados 
    // db.run(`DELETE FROM places WHERE id = ?`, [3], function (err) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso");
    // });

});