const express        = require('express');
const morgan         = require('morgan');
const session        = require('express-session');
const flash          = require('connect-flash');
const MySQLStore     = require('express-mysql-session');
const methodOverride = require('method-override');
const multer         = require('multer');
const exphbs         = require('express-handlebars');
const path           = require('path');//PREINSTALADO
const app            = express();
const passport       = require('passport');
const { v4: uuidv4 } = require('uuid');
const socketIo       = require('socket.io');
const Http           = require('http');

//IMPORTACIONES
const index          = require('./routers/index.router');
const user           = require('./routers/user.router');
const shoe           = require('./routers/zapatos.router');
const { database }   = require('./database/keys');
require('./config/passport');//PARA VER EL MENSAJE DE LA BASE DE DATOS LLAMAMOS A POOL
const { isAuthenticated , timeago } = require('./lib/helpers');
const { firtPagina , paginationCliente , paginationUser , lastPagina } = require('./lib/handlebars');


//INICIANDO SOCKET IO
const server = Http.createServer(app);
const io = socketIo().listen(server);
require('./socket')(io);

//SERVER SETTING
app.set('port' , process.env.PORT || 4008);

//SETTING VIEWS
app.set('views' , path.join(__dirname , 'views'));
app.engine('.hbs' , exphbs({
    defaultLayout   : 'main',
    layoutsDir      : path.join(app.get('views'), 'layout'),
    partialsDir     : path.join(app.get('views'), 'partials'),
    extname         : '.hbs',             //PARRA EL FORMATO DE FECHAS LO HACEMOS PUBLICO
    helpers         : { isAuthenticated , timeago , firtPagina , paginationCliente , paginationUser , lastPagina }
}));
app.set('view engine' , '.hbs');


//MIDDLEWARES
app.use(methodOverride('_method'));//PUT Y DELETE
app.use(express.urlencoded({ extended : false }));
app.use(morgan('dev'));//PETICIONES
app.use(express.json());
app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : false,
    store  : new MySQLStore(database)//GUARDAMOS LA SESSION DEL USUARIO DE LA BD 
}));
app.use(passport.initialize());//INICIANDO PASSPORT
app.use(passport.session());   //INICIANDO PASSPORT
app.use(flash());//PARA LOS MENSAJES

const storeZapato = multer.diskStorage({
    destination : path.join(__dirname , '/public/Uploads/'),
    filename : (req , file , cb , filename) => {
        cb(null , uuidv4() + path.extname(file.originalname).toLowerCase());
    }
});
const zapatoUpload = multer({ 
    storage : storeZapato,
    dest    : path.join(__dirname , '/public/Uploads/')
}).single('fotoZapato');
app.use(zapatoUpload);


//VARIABLES GLOBALES MSG FLASH
app.use((req, res , next) => {
    app.locals.message_danger  = req.flash('message_danger');
    app.locals.message_success = req.flash('message_success');
    app.locals.user            = req.user || null;//GUARDANDO EL USER EN LA MEMORIA
    next();
})

//MANEJO DE RUTAS PARA LAS VIEWS
app.use(index);
app.use(user);
app.use(shoe);

//STATIC PUBLIC
app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port') , () => {
    console.log('SERVER RUNNING: ', app.get('port'));
})


//EXPORTAMOS EL APP
module.exports = server;

