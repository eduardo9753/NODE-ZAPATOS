const { Router } = require('express');
const router = Router();

//AUTHENTICATED USER
const { isAuthenticated } = require('../lib/helpers');

//CONTROLLADOR ZAPATOS
const zapatoController = require('../controllers/zapatos.controller');

//ROUTAS VIEWS
router.get('/shoe/form' , isAuthenticated ,zapatoController.form); //FORM ZAPATOS
router.post('/shoe/addForm' , isAuthenticated ,zapatoController.formAdd);//RECOJO ZAPATOS
router.get('/shoe/list/:page' , isAuthenticated ,zapatoController.list);//LIST DE ZAPATOS

router.get('/shoe/edit/:id' , isAuthenticated , zapatoController.edit);//DATA ZAPATO POR ID EDIT
router.put('/shoe/edit/:id' , isAuthenticated , zapatoController.update);//UPDATE ZAPATO POR ID EDIT

router.delete('/shoe/delete/:id' , isAuthenticated ,zapatoController.delete);//DELETE SHOE

//EXPORTAMOS
module.exports = router;
