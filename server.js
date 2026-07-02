const express = require('express');
const path = require('path');
const Pessoa = require('./models/Pessoa');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let pessoas = [];

app.get('/api/pessoas', (req, res) => {
  res.json(pessoas.map((p) => p.toJSON()));
});

app.post('/api/pessoas', (req, res) => {
    const { nome, dataNascimento } = req.body;
    if (!nome || !dataNascimento) {
        return res.status(400).json
        ({ error: 'Nome e data de nascimento são obrigatórios.' });
    }
    const pessoa = new Pessoa(nome, dataNascimento);
    pessoas.push(pessoa);
    res.status(201).json(pessoa.toJSON());
});

app.delete('/api/pessoas/:id', (req, res) => {
    const idex = parseInt(req.params.idex, 10);
    if (isNaN(idex) || idex < 0 || idex >= pessoas.length) {
        return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
    pessoas.splice(idex, 1);
    res.status(200).json({ message: 'Pessoa removida com sucesso.' });
});

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });