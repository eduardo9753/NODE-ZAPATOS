const { Router } = require('express');
const router = Router();

//CONTROLADOR INDEX
const { index , shoes , shoeView , map } = require('../controllers/index.controller');


//MANEJO DE LAS VIEWS
router.get('/' , index);//INDEX O PAGINA PRINCIPAL
router.get('/shoes/:page' , shoes);//DATA ZAPATO
router.get('/shoe/view/:id' , shoeView);//VIEW ZAPATO POR ID
router.get('/mapa' , map);//VIEW MAPA


//EXPORTAMOS EL  ROUTER
module.exports = router;