const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// ----------------------
// BANCO DE DADOS FAKE
// ----------------------
let usuarios = [
    { id: 1, nome: "Manu", email: "manu@gmail.com" },
    { id: 2, nome: "Aline", email: "aline@gmail.com" }
];

// ----------------------
// ROTAS DO DESAFIO
// ----------------------

// 1) GET /meunome
app.get("/meunome", (req, res) => {
    res.send("Meu nome é Fábio Duarte de Oliveira");
});

// 2) GET /tico
app.get("/tico", (req, res) => {
    res.send("teco");
});

// 3) GET /pokemons
app.get("/pokemons", (req, res) => {
    const pokemons = [
        "Caterpie",
        "Pidgeotto",
        "Bulbasaur",
        "Charmander",
        "Squirtle",
        "Krabby",
        "Raticate",
        "Muk",
        "Tauros",
        "Lapras"
    ];
    res.json(pokemons);
});

// 4) POST /series
app.post("/series", (req, res) => {
    const series = [
        "Breaking Bad",
        "Dark",
        "The Office"
    ];
    res.json(series);
});

// ----------------------
// ROTAS DA API DE USUÁRIOS
// ----------------------

// LISTAR TODOS
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
});

// LISTAR POR ID
app.get("/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(usuario);
});

// CRIAR USUÁRIO
app.post("/usuarios", (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: "Nome e email são obrigatórios" });
    }

    const novo = {
        id: usuarios.length + 1,
        nome,
        email
    };

    usuarios.push(novo);

    res.status(201).json(novo);
});

// DELETAR USUÁRIO
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
// HTML DA PÁGINA INICIAL
// ----------------------
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      html { font-family: sans-serif; font-size: 30px; }
      body { background: white; }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>Hello Express API</section>
  </body>
</html>
`;

// ----------------------
// ROTA PADRÃO (Página inicial)
// ----------------------
app.get("/", (req, res) => res.type('html').send(html));

// ----------------------
// INICIAR SERVIDOR
// ----------------------
app.listen(port, () => console.log(`Servidor rodando na porta ${port}!`));
