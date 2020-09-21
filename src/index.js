const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4} = require('uuid');
const {format} = require('timeago.js');
//Initializations
const app = express();
require('./database'); 

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
//Middlewares-- son funciones que se ejecutan antes de que llegen a las rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage( {
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
app.use(multer({storage: storage}).single('image'));

//Global Variables
app.use((req, res, next) => {
    app.locals.format = format;
    next();
})


//Routes
app.use(require('./routes/index.routes.js'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server

app.listen(app.get('port'), ()=> {
    console.log (`Server Inicializado en por ${app.get('port')}`);
});

