const express = require("express");
const server = express();

// Capturar o BD
const db = require("./database/db");

// Configuração da pasta Public
server.use(express.static("public"));

// Habilitação do uso do req.body
server.use(express.urlencoded({
    extended: true
}));

// Template Engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/view", {
    express: server,
    noCache: true
});



// Configuração de caminhos
// Página Inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", {
        title: "Um Titulo"
    });
});

server.get("/create-point", (req, res) => {

    // req.query: Query String da url
    // console.log(req.query);

    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {

    // req.body: O corpo do nosso formulário
    // console.log(req.body);

    // Inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Cadastro!")
        }

        console.log("Cadastrado com Sucesso!");
        console.log(this);

        return res.render("create-point.html", {
            saved: true
        });
    }

    db.run(query, values, afterInsertData);


});


server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        // Pesquisa vazia
        return res.render("search-results.html", {
            total: 0
        });
    }

    // Capturar os dados do BD
    // Consulta de Dados    
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length;

        // console.log("Aqui estão os seus registros");
        // console.log(rows);

        // Mostra a página HTML com os dados do BD
        return res.render("search-results.html", {
            places: rows,
            total: total
        });
    });
});


// Startar o Servidor
server.listen(3000);