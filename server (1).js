const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000; // Mantive a porta 5000
const DB_NAME = 'jogo.db';

// --- CONFIGURAÇÕES ---
app.use(cors());
app.use(express.json()); // Permite ler JSON enviado pelo jogo
// Serve os arquivos da pasta 'public' (seu Front-end)
app.use(express.static(path.join(__dirname, 'public'))); 

// --- BANCO DE DADOS ---
const db = new sqlite3.Database(DB_NAME, (err) => {
    if (err) {
        console.error('Erro ao abrir banco:', err.message);
    } else {
        console.log('Conectado ao SQLite (jogo.db)');
    }
});

// Cria a tabela se não existir
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS saves (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_name TEXT,
            game_data TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// --- ROTAS (API) ---

// Salvar Jogo
app.post('/api/salvar', (req, res) => {
    const data = req.body;
    const gameJson = JSON.stringify(data);
    const playerName = "Forasteiro"; // Nome padrão

    const sql = "INSERT INTO saves (player_name, game_data) VALUES (?, ?)";
    
    db.run(sql, [playerName, gameJson], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ "error": "Erro ao salvar no banco" });
        }
        console.log(`Jogo salvo! ID: ${this.lastID}`);
        res.json({ "message": "Salvo com sucesso!", "id": this.lastID });
    });
});

// Carregar Jogo
app.get('/api/carregar', (req, res) => {
    const sql = "SELECT game_data FROM saves ORDER BY id DESC LIMIT 1";
    
    db.get(sql, [], (err, row) => {
        if (err) {
            return res.status(500).json({ "error": err.message });
        }
        if (row) {
            console.log("Jogo carregado.");
            res.json(JSON.parse(row.game_data));
        } else {
            res.status(404).json({ "error": "Nenhum save encontrado" });
        }
    });
});

// Rota padrão (FIX para o erro de path-to-regexp)
// Redireciona qualquer outra coisa para o index.html
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
    console.log(`Pressione CTRL + C para parar.`);
});