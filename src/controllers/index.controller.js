//DATABASE
const pool = require('../database/database');


class indexController {
    
    index = (req, res) => {
        res.render('index.hbs');
    }

    shoes = async (req , res) => {
        try {
            let verPorPagina = 9;
            let pagina = req.params.page || 1;
            let offSet = ((pagina - 1) * verPorPagina);
            console.log('pagina: ', pagina);
            console.log('offSet: ', offSet);
            const dataShoes = await pool.query('SELECT * FROM dbozapato LIMIT ? OFFSET ?', [verPorPagina, offSet]);
            const countZapato = await pool.query('SELECT COUNT(*) AS total FROM dbozapato');
            const count = JSON.parse(JSON.stringify(countZapato[0]['total']));
            console.log('data ZAPATO shoes:', dataShoes);
            res.render('shoes.hbs', {
                dataShoes: dataShoes,
                current: pagina,
                paginas: Math.ceil(count / verPorPagina)
            });
        } catch (error) {
            console.log(error);
        }
    }

    shoeView = async (req, res) => {
        try {
            const { id } = req.params;
            console.log('id view shoe: ', id);
            const dataViewShoeId = await pool.query('SELECT * FROM dbozapato WHERE id=?', [id]);
            res.render('shoesView.hbs', { dataViewShoeId: dataViewShoeId });
        } catch (error) {
            console.log(error);
        }
    }


    map = (req, res) => {
        res.render('mapa.hbs');
    }
}

module.exports = new indexController();