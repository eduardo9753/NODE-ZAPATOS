const indexController  = {}

//DATABASE
const pool = require('../database/database');

//RENDER VIEWS
indexController.index = (req , res) =>{
    res.render('index.hbs');
}
indexController.shoes = async (req, res) => {
    const dataShoes = await pool.query('SELECT * FROM dbozapato');
    console.log('data ZAPATO shoes:' , dataShoes);
    res.render('shoes.hbs', { dataShoes :dataShoes });
}
indexController.shoeView = async (req, res) => {
    const { id } = req.params;
    console.log('id view shoe: ', id);
    const dataViewShoeId = await pool.query('SELECT * FROM dbozapato WHERE id=?' , [id]);
    res.render('shoesView.hbs', { dataViewShoeId : dataViewShoeId });
}

indexController.map = (req , res) => {
    res.render('mapa.hbs');
}

//EXPOTAMO
module.exports = indexController;