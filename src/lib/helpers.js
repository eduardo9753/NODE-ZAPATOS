const { format } = require('timeago.js');
const bcryptjs = require('bcryptjs');
const helpers = { }; 

//ENCRIPTANDO CONTRASEÑA USER
helpers.encryptPass = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password , salt);
}

//DESENCRIPTANDO CONTRASEÑA USER
helpers.macthPass = async function(password , savedPassword){
    try{
        return await bcryptjs.compare(password , savedPassword);      
    }catch(e){ console.log('ERROR DE DESCRIPTACION' , e); }
}

//FORMATO DE FECHAS
helpers.timeago = (timestamp) => {
    console.log('FECHA: ', timestamp);
    return format(timestamp);
}

//AUTHENTICACION
helpers.isAuthenticated = (req , res , next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('message_danger', 'INICIE SESSION');
    return res.redirect('/users/signin');
}
module.exports =helpers;