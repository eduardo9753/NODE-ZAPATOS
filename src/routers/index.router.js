const { Router } = require('express');
const router = Router();

//CONTROLADOR INDEX
const indexController = require('../controllers/index.controller');


//MANEJO DE LAS VIEWS
router.get('/' , indexController.index);//INDEX O PAGINA PRINCIPAL
router.get('/shoes/:page' , indexController.shoes);//DATA ZAPATO
router.get('/shoe/view/:id' , indexController.shoeView);//VIEW ZAPATO POR ID
router.get('/mapa' , indexController.map);//VIEW MAPA


//EXPORTAMOS EL  ROUTER
module.exports = router;