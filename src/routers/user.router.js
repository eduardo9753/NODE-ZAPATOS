const { Router } = require('express');
const router = Router();

//USER AUTHENTICADO
const { isAuthenticated } = require('../lib/helpers');

//CONTROLADOR USER
const userController = require('../controllers/user.controller');


//MANAEJO DE VISTAS
router.get('/users/signup' , userController.signup);//VIEW FORM SIGNUP
router.post('/users/signupForm' , userController.signupFormAdd);//RECOJO DE DATOS FORM SIGNUP

router.get('/users/profile' , isAuthenticated , userController.profile);//VIEW DEL USER MENU

router.get('/users/signin' , userController.signin);//VIEW FORM SIGNIN
router.post('/users/signinForm' , userController.signinFromAdd);//REOCOJO DE DATOS FORM SIGNIN

router.get('/users/logout' , userController.exit);//SALIDA DEL USERS

module.exports = router;