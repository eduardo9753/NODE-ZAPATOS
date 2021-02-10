//PASSPORT PARA LA AUTENTICACION
const passport = require('passport');


class userController {

    signup = (req, res) => {//VIEW FORM SIGNUP "REGISTRO DE USUARIOS"
        res.render('users/signup.hbs');
    }

    signupFormAdd = passport.authenticate('local.signup', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/signup',
        failureFlash: true
    });


    signin = (req, res) => {//VIEWS FORM SIGNIN "LOGEO DE USUARIOS"
        res.render('users/signin.hbs');
    }

    signinFromAdd = passport.authenticate('local.signin', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/signin',
        failureFlash: true
    });


    exit = (req, res) => {
        req.logout();
        req.flash('message_success', 'GOOD BYE USER');
        res.redirect('/users/signin');
    }


    profile = (req, res) => {
        res.render('users/profile.hbs');
    }
}



module.exports = new userController();