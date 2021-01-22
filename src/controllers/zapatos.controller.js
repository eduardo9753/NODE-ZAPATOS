const { unlink }       = require('fs-extra');
const pathUpdate       = require('path');
const pathDelete       = require('path');
const zapatoController = { };

//MODELO ZAPATO
const Zapato = require('../models/Zapato');

//DATABASE
const pool = require('../database/database');

//RENDER VIEWS
zapatoController.form = async (req, res) => {
    const dataEstilo = await pool.query('SELECT * FROM dboestilo');
    const dataTalla = await pool.query('SELECT * FROM dbotalla'); 
    const dataGenero = await pool.query('SELECT * FROM dbogenero');
    res.render('zapatos/add.hbs', {dataEstilo:dataEstilo , dataTalla:dataTalla, dataGenero:dataGenero});
}
zapatoController.formAdd = async (req , res) => {
    console.log('DATA SHOES : ', req.body);
    console.log('DATA SHOES : ', req.file);
    console.log('DATA USER:' , req.user);
    const zapato = new Zapato();
    zapato.setFoto      = req.file.originalname;
    zapato.setMimetype  = req.file.mimetype;
    zapato.setFilename  = req.file.filename;
    zapato.setPath      = 'shoes/' + req.file.filename;//CUANDO SE RECORRA LAS IMG BUSCARA ESTA RUTA DEL "PATH"
    zapato.setSize      = req.file.size;
    zapato.setPrecio    = req.body.precio;
    zapato.setColor     = req.body.color;
    zapato.setCantidad  = req.body.cantidad;
    zapato.setDBOEstilo = req.body.cboEstilo;
    zapato.setDBOTalla  = req.body.cboTalla;
    zapato.setDBOGenero = req.body.cboGenero;
    zapato.setIdUsuario = req.user.id;
    const correct = await pool.query('INSERT INTO dbozapato(foto,mimetype,filename,path,size,precio,color,cantidad,user_id,dboestilo_id,dbotalla_id,dbogenero_id)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
    [zapato.getFoto,zapato.getMimetype,zapato.getFilename,zapato.getPath,zapato.getSize,zapato.getPrecio,zapato.getColor,
     zapato.getCantidad,zapato.getIdUsuario, zapato.getDBOEstilo,zapato.getDBOTalla,zapato.getDBOGenero]);
     if(correct){
         req.flash('message_success', 'SHOE SAVED CORRECTED');
         res.redirect('/shoes/list');
     }else{
         req.flash('message_danger', 'ERROR');
         res.redirect('/shoes/list');
     }
}

zapatoController.edit = async (req, res ) => {
    const { id } = req.params;
    const dataZapato = await pool.query('SELECT * FROM dbozapato WHERE id = ?' , [id]);
    const dataEstilo = await pool.query('SELECT * FROM dboestilo');
    const dataTalla = await pool.query('SELECT * FROM dbotalla'); 
    const dataGenero = await pool.query('SELECT * FROM dbogenero');
    console.log('DATA EDIT ZAPATO : ' , dataZapato);
    res.render('zapatos/edit.hbs' , { dataZapato : dataZapato[0] , dataEstilo : dataEstilo , dataTalla : dataTalla , dataGenero : dataGenero });
}

zapatoController.update = async (req, res) => {
    console.log('DATA SHOES : ', req.body);
    console.log('DATA SHOES FILE: ', req.file);
    console.log('DATA USER  :' , req.user);
    const { id } = req.params;
    const zapato = new Zapato();
    zapato.setFoto      = req.file.originalname;
    zapato.setMimetype  = req.file.mimetype;
    zapato.setFilename  = req.file.filename;
    zapato.setPath      = 'shoes/' + req.file.filename;//CUANDO SE RECORRA LAS IMG BUSCARA ESTA RUTA DEL "PATH"
    zapato.setSize      = req.file.size;
    zapato.setPrecio    = req.body.precio;
    zapato.setColor     = req.body.color;
    zapato.setCantidad  = req.body.cantidad;
    zapato.setDBOEstilo = req.body.cboEstilo;
    zapato.setDBOTalla  = req.body.cboTalla;
    zapato.setDBOGenero = req.body.cboGenero;
    zapato.setIdUsuario = req.user.id;
    zapato.setIdZapato  = id;
    const correct = await pool.query('UPDATE dbozapato SET foto=? , mimetype=? ,filename=? , path=? ,size=? ,precio=? ,color=? ,cantidad=? ,user_id=? ,dboestilo_id=? ,dbotalla_id=? ,dbogenero_id=? WHERE id=?',
    [zapato.getFoto,zapato.getMimetype,zapato.getFilename,zapato.getPath,zapato.getSize,zapato.getPrecio,zapato.getColor,
     zapato.getCantidad,zapato.getIdUsuario,zapato.getDBOEstilo,zapato.getDBOTalla,zapato.getDBOGenero , zapato.getIdZapato]);
    try{
        if(correct){
            await unlink(pathUpdate.resolve('./src/public/shoes/' + req.body.imgDelete));
            req.flash('message_success', 'SHOE DELETE CORRECTED');
            res.redirect('/shoes/list');
        }
    }catch(e){
      console.log('Error Update Zapato: ',e);
    }
 /*    if(correct){
        await unlink(pathUpdate.resolve('./src/public/shoes/' + req.body.imgDelete));
        req.flash('message_success', 'SHOE DELETE CORRECTED');
        res.redirect('/shoes/list');
    }else{
        req.flash('message_danger', 'SHOE DELETE INCORRECTED');
        res.redirect('/shoes/list');
    }*/
}

zapatoController.list = async (req, res) => {
    console.log('LIST USER',req.user);
    const dataZapato = await pool.query('SELECT * FROM dbozapato WHERE user_id=?' , [req.user.id]);
    console.log('DATA SHOES LIST :' , dataZapato);
    res.render('zapatos/list.hbs' , { dataZapato : dataZapato });
}


zapatoController.delete = async (req , res) => {
    console.log('DATA REQ DELETE: ' ,req.body.imgDelete);
    const { id } = req.params;
    const correct = await pool.query('DELETE FROM dbozapato WHERE id =?', [id]);
    if(correct){
        await unlink(pathDelete.resolve('./src/public/shoes/' + req.body.imgDelete));
        req.flash('message_success', 'SHOE DELETE CORRECTED');
        res.redirect('/shoes/list');
    }else{
        req.flash('message_danger', 'SHOE DELETE INCORRECTED');
        res.redirect('/shoes/list');
    }
}

//EXPORTAMOS
module.exports = zapatoController;