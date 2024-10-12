const FaleConoscoModel = require('../Model/faleConoscoModel');  

const FaleConoscoController = {  

    enviarContato: (req, res) => {  
        const { nome, email, cep, endereco, bairro, cidade, mensagem } = req.body;  

        // Insere contato usando o model 
        FaleConoscoModel.insertContato({ nome, email, cep, endereco, bairro, cidade, mensagem }, (err, result) => {  
            if (err) {  
                console.error('Erro ao inserir dados no banco de dados:', err);  
                return res.status(500).send(`Erro ao enviar o formulário: ${err.message}`);
            }  
            console.log('Dados inseridos no banco de dados');  
            const successMessage = "Formulário enviado com sucesso!";
            res.render('faleConosco', { successMessage });
        });  
    }  
};

module.exports = FaleConoscoController;  