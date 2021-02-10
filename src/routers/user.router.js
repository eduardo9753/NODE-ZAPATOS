const { Router } = require('express');
const router = Router();

//USER AUTHENTICADO
const { isAuthenticated } = require('../lib/helpers');

//CONTROLADOR USER
const { signup , signupFormAdd ,profile , signin , signinFromAdd , exit} = require('../controllers/user.controller');


//MANAEJO DE VISTAS
router.get('/users/signup' , signup);//VIEW FORM SIGNUP
router.post('/users/signupForm' , signupFormAdd);//RECOJO DE DATOS FORM SIGNUP

router.get('/users/profile' , isAuthenticated , profile);//VIEW DEL USER MENU

router.get('/users/signin' , signin);//VIEW FORM SIGNIN
router.post('/users/signinForm' , signinFromAdd);//REOCOJO DE DATOS FORM SIGNIN

router.get('/users/logout' , exit);//SALIDA DEL USERS

module.exports = router;