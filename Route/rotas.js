const express = require('express');
const router = express.Router();
const ProductController = require('../Controller/productController');
const NoticiaController = require('../Controller/noticiaController');
const FaleConoscoController = require('../Controller/faleConoscoController');  

router.get('/', (req, res) => {res.render('index');});
router.get('/catalogo', (req, res) => {res.render('catalogo'); });
router.get('/noticia', (req, res) => {res.render('noticia'); });
router.get('/noticia/list', (req, res) => {res.render('noticia'); });
router.get('/faleConosco', (req, res) => {res.render('faleConosco'); });
router.get('/produto', (req, res) => {res.render('produto'); });

//Produtos json
router.get('/produtos', ProductController.getProductsWithCategory);

//Noticias json
router.get('/noticias', NoticiaController.getNoticias);

//Fale Conosco form
router.post('/enviar', FaleConoscoController.enviarContato);

module.exports = router;  // Exporta as rotas para uso em outros arquivos


