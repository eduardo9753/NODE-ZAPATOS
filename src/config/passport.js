const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//MODELO USER
const User = require('../models/User');

//HELPERS PARA ENCRYPTACION
const helpers = require('../lib/helpers');

//BASE DE DATOS
const pool = require('../database/database');

//LOGEO DEL USUARIO YA REGISTRADO (2)
passport.use('local.signin' , new LocalStrategy({
    usernameField : 'email',   //nombre del input
    passwordField : 'password',//nombre del input
    passReqToCallback: true  
} , async (req , email , password , done) => {
    console.log('DATA FORM SIGNIN: ' , req.body);
    const user = new User();
    user.setEmail = email;
    const row = await pool.query('SELECT * FROM dboUsuarios WHERE email=?' , [user.getEmail]);
    if(row.length>0){//SI  HAY DATOS
          const dataUser = row[0];         //password del input comparado con el pass de la DB
          console.log('pass:', dataUser.pass);
          const passEncryp = await helpers.macthPass(password,dataUser.pass);
          if(passEncryp){//SI CINCIDE LA DESCRIPTACIPN
              done(null, dataUser , req.flash('message_success', 'WELCOME: ' , dataUser.nombre));
          }else{
              done(null, false , req.flash('message_danger' , 'Password INCORRECTED'));
          }
    }else{done(null , false , req.flash('message_danger' , 'USER NOT FOUND'));}
}));



//AUTHENTICATE REGISTER SIGNUP (1)
passport.use('local.signup' , new LocalStrategy({
      usernameField : 'username',//nombre del input
      passwordField : 'password',//nombre del input
      passReqToCallback: true  
} , async (req , username , password , done) => {
     console.log('DATA FORM SIGNUP' , req.body);
     const user = new User();
     user.setEmail = req.body.email;
     user.setNombre = username;
     user.setPass = password;
     const passCrypt = await helpers.encryptPass(user.getPass);
     const resultado = await pool.query('INSERT INTO dboUsuarios(email,pass,nombre) VALUES(?,?,?)' ,
                                              [user.getEmail , passCrypt , user.getNombre]);
    if(resultado){
        user.setIdUser = resultado.insertId;//ASIGNACION DE ID USER DESDE LA BD PARA LA SEESION
        return done(null , user , req.flash('message_success' , 'REGISTER CORRECTERD'));
    }else{
        req.flash('message_danger' , 'REGISTER INCORRECTERD');
        res.redirect('/users/signup');
    }
}));

passport.serializeUser((user , done) => {//SERIALIZASER GUARDA EL ID DEL USUARIO EN LA APLICACION
    console.log('serializar:' , user);
    done(null , user.id);
});

passport.deserializeUser( async (id , done) => {//TOMO ESE ID QUE SE ALMACENO PARA RETORNAR DATOS
    const rows = await pool.query('SELECT * FROM dboUsuarios WHERE id=?' , [id]);
    done(null , rows[0]);
});
