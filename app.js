const express = require("express");
const listEndpoints = require("express-list-endpoints");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// ----------------------
// HTML DA PÁGINA PRINCIPAL
// ----------------------
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Express API</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      a { display: block; margin: 10px 0; font-size: 20px; }
    </style>
  </head>
  <body>
    <h1>🚀 API Express no Render</h1>
    <p>Rotas para testar:</p>
    <a href="/meunome">/meunome</a>
    <a href="/tico">/tico</a>
    <a href="/pokemons">/pokemons</a>
    <a href="/usuarios">/usuarios</a>
    <a href="/rotas">/rotas (listar todas)</a>
  </body>
</html>
`;

// ----------------------
// BANCO FAKE
// ----------------------
let usuarios = [
  { id: 1, nome: "Manu", email: "manu@gmail.com" },
  { id: 2, nome: "Aline", email: "aline@gmail.com" }
];

// ----------------------
// ROTAS DO DESAFIO
// ----------------------
app.get("/meunome", (req, res) => {
  res.send("Meu nome é Fábio Duarte de Oliveira");
});

app.get("/tico", (req, res) => {
  res.send("teco");
});

app.get("/pokemons", (req, res) => {
  res.json([
    "Caterpie", "Pidgeotto", "Bulbasaur", "Charmander",
    "Squirtle", "Krabby", "Raticate", "Muk",
    "Tauros", "Lapras"
  ]);
});

// Agora o POST /series pode receber a série enviada pelo usuário
app.post("/series", (req, res) => {
  const { nome } = req.body;
  const listaSeries = ["Breaking Bad", "Dark", "The Office"];

  if (nome) {
    listaSeries.push(nome);
  }

  res.json(listaSeries);
});

// ----------------------
// ROTAS DE USUÁRIOS
// ----------------------
app.get("/usuarios", (req, res) => res.json(usuarios));

app.get("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  usuario
    ? res.json(usuario)
    : res.status(404).json({ erro: "Usuário não encontrado" });
});

app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email são obrigatórios" });
  }
  const novo = { id: usuarios.length + 1, nome, email };
  usuarios.push(novo);
  res.status(201).json(novo);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  usuarios.splice(index, 1);
  res.json({ mensagem: "Usuário removido com sucesso" });
});

// ----------------------
// 🔹 ROTA PARA LISTAR TODAS AS ROTAS
// ----------------------
app.get("/rotas", (req, res) => {
  const rotas = listEndpoints(app);
  res.json(rotas);
});

// ----------------------
// ROTA PRINCIPAL
// ----------------------
app.get("/", (req, res) => res.type("html").send(html));

// ----------------------
// INICIAR SERVIDOR
// ----------------------
app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));
