const db = require('../dbMySQL');

const FaleConoscoModel = {
    
    insertContato: (faleconosco, callback) => {  
        const sql = 'INSERT INTO faleconosco (nome, email, cep, endereco, bairro, cidade, mensagem) VALUES (?, ?, ?, ?, ?, ?, ?)';  
        
        db.query(sql, [faleconosco.nome, faleconosco.email, faleconosco.cep, faleconosco.endereco, faleconosco.bairro, faleconosco.cidade, faleconosco.mensagem], (err, result) => {  
            if (err) {  
                return callback(err, null);  
            }  
            callback(null, result); 
        });  
    }  
};

module.exports = FaleConoscoModel;
