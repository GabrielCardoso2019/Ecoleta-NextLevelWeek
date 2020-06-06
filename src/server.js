const express = require("express");
const server = express();

// COnfiguração da pasta Public
server.use(express.static("public"));

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
    return res.render("create-point.html");
});

server.get("/search", (req, res) => {
    return res.render("search-results.html");
});


// Startar o Servidor
server.listen(3000);