// Importar dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

// Iniciar o Objeto de operações no Banco de Dados
const db = new sqlite3.Database("./src/database/database.db");

// Utilizando o BD para operação
db.serialize(() => {

    // Tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

    // Inserção de dados
    const query = `
    INSERT INTO places (
        image, 
        address,
        address2,
        state,
        city,
        items,
    ) VALUES (?,?,?,?,?,?);
`

    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
        "Colectoria",
        "Guilherme Gambella, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err);
        }

        console.log("Cadastrado com sucesso!");
        console.log(this);
    }

    db.run(query, values, afterInsertData);

    // Consulta de dados

    // Deletar dados de tabela

});