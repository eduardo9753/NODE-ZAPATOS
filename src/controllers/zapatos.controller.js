const { unlink } = require('fs-extra');
const pathUpdate = require('path');
const pathDelete = require('path');


//MODELO ZAPATO
const Zapato = require('../models/Zapato');

//DATABASE
const pool = require('../database/database');

class zapatoController {

    formAdd = async (req, res) => {
        try {
            console.log('DATA SHOES : ', req.body);
            console.log('DATA SHOES : ', req.file);
            console.log('DATA USER:', req.user);
            const zapato = new Zapato();
            zapato.setFoto = req.file.originalname;    //NOMBRE DE LA FOTO 
            zapato.setMimetype = req.file.mimetype;        //TIPO DE FOTO O IMG
            zapato.setFilename = req.file.filename;        //NOMBRE ENCRYPTADO
            zapato.setPath = 'Uploads/' + req.file.filename;//CUANDO SE RECORRA LAS IMG BUSCARA ESTA RUTA DEL "PATH"
            zapato.setSize = req.file.size;            //TAMAÑO DE LA FOTO
            zapato.setPrecio = req.body.precio;          //CAJA DE TEXTO
            zapato.setColor = req.body.color;           //CAJA DE TEXTO
            zapato.setCantidad = req.body.cantidad;        //CAJA DE TEXTO
            zapato.setDBOEstilo = req.body.cboEstilo;       //CAJA DE TEXTO
            zapato.setDBOTalla = req.body.cboTalla;        //CAJA DE TEXTO
            zapato.setDBOGenero = req.body.cboGenero;       //CAJA DE TEXTO
            zapato.setIdUsuario = req.user.id;              //ID DEL USUARIO LOGEADO
            const correct = await pool.query('INSERT INTO dbozapato(foto,mimetype,filename,path,size,precio,color,cantidad,user_id,dboestilo_id,dbotalla_id,dbogenero_id)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
                [zapato.getFoto, zapato.getMimetype, zapato.getFilename, zapato.getPath, zapato.getSize, zapato.getPrecio, zapato.getColor,
                zapato.getCantidad, zapato.getIdUsuario, zapato.getDBOEstilo, zapato.getDBOTalla, zapato.getDBOGenero]);
            if (correct) {
                req.flash('message_success', 'SHOE SAVED CORRECTED');
                res.redirect('/shoe/list/1');
            } else {
                req.flash('message_danger', 'ERROR');
                res.redirect('/shoe/list/1');
            }
        } catch (error) {
            console.log(error);
        }
    }

    edit = async (req, res) => {
        try {
            const { id } = req.params;
            const dataZapato = await pool.query('SELECT * FROM dbozapato WHERE id = ?', [id]);
            const dataEstilo = await pool.query('SELECT * FROM dboestilo');
            const dataTalla = await pool.query('SELECT * FROM dbotalla');
            const dataGenero = await pool.query('SELECT * FROM dbogenero');
            console.log('DATA EDIT ZAPATO : ', dataZapato);
            res.render('zapatos/edit.hbs', { dataZapato: dataZapato[0], dataEstilo: dataEstilo, dataTalla: dataTalla, dataGenero: dataGenero });
        } catch (error) {
            console.log(error);
        }
    }

    update = async (req, res) => {
        try {
            console.log('DATA SHOES : ', req.body);
            console.log('DATA SHOES FILE: ', req.file);
            console.log('DATA USER  :', req.user);
            const { id } = req.params;
            const zapato = new Zapato();
            if (typeof req.file !== 'undefined') {
                zapato.setFoto = req.file.originalname;  //NOMBRE DE LA FOTO DE LA IMG
                zapato.setMimetype = req.file.mimetype;      //TIPO DE FOTO O IMG
                zapato.setFilename = req.file.filename;      //NOMBRE ENCRYPTADO DE LA IMG
                zapato.setPath = 'Uploads/' + req.file.filename;//CUANDO SE RECORRA LAS IMG BUSCARA ESTA RUTA DEL "PATH"
                zapato.setSize = req.file.size;          //VALOR REQ.FILE :tamano de la img : 345kv
                zapato.setPrecio = req.body.precio;        //CAJA DE TEXTO
                zapato.setColor = req.body.color;         //CAJA DE TEXTO
                zapato.setCantidad = req.body.cantidad;      //CAJA DE TEXTO
                zapato.setDBOEstilo = req.body.cboEstilo;     //CAJA DE TEXTO
                zapato.setDBOTalla = req.body.cboTalla;      //CAJA DE TEXTO
                zapato.setDBOGenero = req.body.cboGenero;     //CAJA DE TEXTO
                zapato.setIdUsuario = req.user.id;            //ID DEL USUARIO LOGEADO
                zapato.setIdZapato = id;                     //ID DEL ZAPATO UPDATE
                const correct = await pool.query('UPDATE dbozapato SET foto=? , mimetype=? ,filename=? , path=? ,size=? ,precio=? ,color=? ,cantidad=? ,user_id=? ,dboestilo_id=? ,dbotalla_id=? ,dbogenero_id=? WHERE id=?',
                    [zapato.getFoto, zapato.getMimetype, zapato.getFilename, zapato.getPath, zapato.getSize, zapato.getPrecio, zapato.getColor,
                    zapato.getCantidad, zapato.getIdUsuario, zapato.getDBOEstilo, zapato.getDBOTalla, zapato.getDBOGenero, zapato.getIdZapato]);
                if (correct) {
                    await unlink(pathUpdate.resolve('./src/public/Uploads/' + req.body.imgDelete));
                    req.flash('message_success', 'SHOE DELETE CORRECTED');
                    res.redirect('/shoe/list/1');
                }
            } else if (typeof req.file === 'undefined') {
                const dataUpdate = await pool.query('SELECT * FROM dbozapato WHERE id=?', [id]);
                console.log('DATA ZAPATO UPDATE BY ID : ', dataUpdate);
                zapato.setFoto = dataUpdate[0].foto;      //NOMBRE DE LA FOTO DE LA IMG DE LA BD
                zapato.setMimetype = dataUpdate[0].mimetype;  //TIPO DE FOTO O IMG DE LA BD
                zapato.setFilename = dataUpdate[0].filename;  //NOMBRE ENCRYPTADO DE LA IMG DE LA BD
                zapato.setPath = req.body.foto_actual;    //INPUT USAMOS LA RUTA ORIGINAL SI NO SE ACTUALIZA
                zapato.setSize = dataUpdate[0].size;      //CAJA DE TEXTO
                zapato.setPrecio = req.body.precio;         //CAJA DE TEXTO
                zapato.setColor = req.body.color;          //CAJA DE TEXTO
                zapato.setCantidad = req.body.cantidad;       //CAJA DE TEXTO
                zapato.setDBOEstilo = req.body.cboEstilo;      //CAJA DE TEXTO
                zapato.setDBOTalla = req.body.cboTalla;       //CAJA DE TEXTO
                zapato.setDBOGenero = req.body.cboGenero;      //CAJA DE TEXTO
                zapato.setIdUsuario = req.user.id;             //ID DEL USUARIO LOGEADO
                zapato.setIdZapato = id;                      //ID DEL ZAPATO UPDATE
                const correct = await pool.query('UPDATE dbozapato SET foto=? , mimetype=? ,filename=? , path=? ,size=? ,precio=? ,color=? ,cantidad=? ,user_id=? ,dboestilo_id=? ,dbotalla_id=? ,dbogenero_id=? WHERE id=?',
                    [zapato.getFoto, zapato.getMimetype, zapato.getFilename, zapato.getPath, zapato.getSize, zapato.getPrecio, zapato.getColor,
                    zapato.getCantidad, zapato.getIdUsuario, zapato.getDBOEstilo, zapato.getDBOTalla, zapato.getDBOGenero, zapato.getIdZapato]);
                if (correct) {
                    req.flash('message_success', 'SHOE DELETE CORRECTED');
                    res.redirect('/shoe/list/1');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    list = async (req, res) => {
        try {
            console.log('LIST USER', req.user);
            let verPorPagina = 9;
            let pagina = req.params.page || 1;
            let offSet = ((pagina - 1) * verPorPagina);
            console.log('pagina: ', pagina);
            console.log('offSet: ', offSet);
            const dataZapato = await pool.query('SELECT * FROM dbozapato WHERE user_id=?  LIMIT ? OFFSET ?', [req.user.id, verPorPagina, offSet]);
            const countZapato = await pool.query('SELECT COUNT(*) AS total FROM dbozapato');
            const count = JSON.parse(JSON.stringify(countZapato[0]['total']));
            console.log('DATA SHOES LIST :', dataZapato);
            res.render('zapatos/list.hbs', {
                dataZapato: dataZapato,
                current: pagina,
                paginas: Math.ceil(count / verPorPagina)
            });
        } catch (error) {
            console.log(error);
        }
    }


    delete = async (req, res) => {
        try {
            console.log('DATA REQ DELETE: ', req.body.imgDelete);
            const { id } = req.params;
            const correct = await pool.query('DELETE FROM dbozapato WHERE id =?', [id]);
            if (correct) {
                await unlink(pathDelete.resolve('./src/public/Uploads/' + req.body.imgDelete));
                req.flash('message_success', 'SHOE DELETE CORRECTED');
                res.redirect('/shoes/list/1');
            } else {
                req.flash('message_danger', 'SHOE DELETE INCORRECTED');
                res.redirect('/shoes/list/1');
            }
        } catch (error) {
            console.log(error);
        }
    }

    form = async (req, res) => {
        try {
            const dataEstilo = await pool.query('SELECT * FROM dboestilo');
            const dataTalla = await pool.query('SELECT * FROM dbotalla');
            const dataGenero = await pool.query('SELECT * FROM dbogenero');
            res.render('zapatos/add.hbs', { dataEstilo: dataEstilo, dataTalla: dataTalla, dataGenero: dataGenero });
        } catch (error) {
            console.log(error);
        }
    }
}


//EXPORTAMOS
module.exports = new zapatoController();