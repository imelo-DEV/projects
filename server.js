const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Banco de dados em memória
let products = [
    { id: 1, name: "Mouse Gamer", price: 150.00, category: "Periféricos" },
    { id: 2, name: "Teclado Mecânico", price: 350.00, category: "Periféricos" }
];

// 1. GET /api/products -> 200 OK (Listagem)
app.get('/api/products', (req, res) => {
    res.status(200).json(products);
});

// 2. GET /api/products/:id -> 200 OK ou 404 Not Found
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: "Produto não encontrado." }); // HTTP 404
    }
    res.status(200).json(product); // HTTP 200
});

// Rota de Login para simular a geração de token
app.post('/api/login', (req, res) => {
    // Retorna o token necessário para os testes
    return res.status(200).json({ 
        token: "token-valido-123",
        message: "Autenticado com sucesso" 
    });
});

// 3. POST /api/products -> 201 Created / 400 Bad Request / 401 Unauthorized / 403 Forbidden / 500 Error
app.post('/api/products', (req, res) => {
    const authHeader = req.headers['authorization'];
    const { name, price, category, triggerError } = req.body;

    // Simulação HTTP 401: Falta de Token
    if (!authHeader) {
        return res.status(401).json({ error: "Não autorizado: Token não fornecido." });
    }

    // Simulação HTTP 403: Token inválido/sem permissão
    if (authHeader !== "Bearer token-valido-123") {
        return res.status(403).json({ error: "Acesso proibido: Token sem permissão para cadastrar." });
    }

    // Simulação HTTP 500: Erro interno forçado para teste
    if (triggerError === true) {
        return res.status(500).json({ error: "Erro interno no servidor ao processar o banco de dados." });
    }

    // Simulação HTTP 400: Validação dos campos obrigatórios
    if (!name || name.trim() === "" || !price || price <= 0 || !category) {
        return res.status(400).json({ 
            error: "Requisição inválida: Preencha nome, categoria e preço maior que zero." 
        });
    }

    // HTTP 201: Produto cadastrado com sucesso
    const newProduct = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
        category
    };
    products.push(newProduct);

    return res.status(201).json(newProduct);
});

// 4. DELETE /api/products/:id -> 204 No Content
app.delete('/api/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (productIndex === -1) {
        return res.status(404).json({ error: "Produto não encontrado para remoção." }); // HTTP 404
    }

    products.splice(productIndex, 1);
    return res.status(204).send(); // HTTP 204 (Sem conteúdo no corpo)
});

app.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
});