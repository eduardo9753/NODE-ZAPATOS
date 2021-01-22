const { Router } = require('express');
const router = Router();

//AUTHENTICATED USER
const { isAuthenticated } = require('../lib/helpers');

//CONTROLLADOR ZAPATOS
const zapatoController = require('../controllers/zapatos.controller');

//ROUTAS VIEWS
router.get('/shoes/add' , isAuthenticated ,zapatoController.form); //VIEW ZAPATOS
router.post('/shoes/addForm' , isAuthenticated ,zapatoController.formAdd);//RECOJO ZAPATOS
router.get('/shoes/list' , isAuthenticated ,zapatoController.list);//LIST DE ZAPATOS

router.get('/shoes/edit/:id' , isAuthenticated , zapatoController.edit);//DATA ZAPATO POR ID EDIT
router.put('/shoes/edit/:id' , isAuthenticated , zapatoController.update);//UPDATE ZAPATO POR ID EDIT

router.delete('/shoes/delete/:id' , isAuthenticated ,zapatoController.delete);//DELETE SHOE


module.exports = router;
