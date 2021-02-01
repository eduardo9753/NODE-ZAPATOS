//PASSPORT PARA LA AUTENTICACION
const passport = require('passport');

const userController = {};

//RENDER VIEW
userController.signup = (req , res) => {//VIEW FORM SIGNUP "REGISTRO DE USUARIOS"
    res.render('users/signup.hbs');
}
userController.signupFormAdd = passport.authenticate('local.signup', {
    successRedirect : '/users/profile',
    failureRedirect : '/users/signup',
    failureFlash : true        
});

userController.profile = (req, res) =>{
    res.render('users/profile.hbs');
}

userController.signin = (req, res) => {//VIEWS FORM SIGNIN "LOGEO DE USUARIOS"
    res.render('users/signin.hbs');
}
userController.signinFromAdd = passport.authenticate('local.signin', {
    successRedirect : '/users/profile',
    failureRedirect : '/users/signin',
    failureFlash : true
});

userController.exit = (req, res) => {
    req.logout();
    req.flash('message_success' , 'GOOD BYE USER');
    res.redirect('/users/signin');
}

module.exports = userController;