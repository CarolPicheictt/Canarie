/**Aplicação express inicia e conecta as rotas ao servidor. */

const express = require('express');
const cors = require('cors');
const path = require('path');
const Routes = require('./Route/rotas');

const app = express();
const PORT = 3000;

const corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para dados do formulário

// Rotas
app.use(Routes);

// Configura o diretório para arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // Define o motor de template como EJS
app.set('views', './View'); // Define o diretório onde estão suas views
 
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
