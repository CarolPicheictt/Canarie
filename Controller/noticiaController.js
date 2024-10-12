const NoticiaModel = require('../Model/noticiaModel');

const NoticiaController = {

    getNoticias:(req,res) =>{
        NoticiaModel.getAllNoticias((err,noticias)=>{
            if(err){
                return res.status(500).json({error:err});
            }
            res.json(noticias);
        })
    },

    getNoticia: (req, res) => {
        const id_noticia = req.params.id_noticia;
        NoticiaModel.getNoticiaById(id_noticia, (err, noticia) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (noticia.length === 0) {
                return res.status(404).json({ message: 'Notícia não encontrada.' });
            }
            res.json(noticia);
        });
    }
};

module.exports = NoticiaController;
