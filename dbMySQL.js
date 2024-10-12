
/*-----Conexão com o banco de dados----- */
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Amora19@', 
    database: 'Canarie' 
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar o Banco de Dados:', err);
        return;
    }
    console.log('Conexão com o MySQL estabelecida com sucesso!');
});

module.exports = connection; // Exporta a conexão para uso em outros arquivos
