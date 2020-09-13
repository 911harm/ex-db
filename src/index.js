const express= require('express');
const path= require('path');
const exphbs= require('express-handlebars');
const methodOverride=require('method-override');
const session =require('express-session');
const flash=require('connect-flash');
const passport=require('passport');

require('dotenv').config({path:'variables.env'})

//Solucionando el detalle de handlerbar
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const Handlebars = require('handlebars')

//inicializaciones
const app=express();
require('./database');
require('./config/passport');

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,"views"));

app.engine('.hbs',exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),//Vital para la solucion 
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');

//Middelwares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'secretico',
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash());
//Variasbles glovales
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error=req.flash('error');
    res.locals.user=req.user|| null;
    next();
})

//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/user'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname,'public')));
//Servidor escuchando
const host=process.env.HOST || '0.0.0.0';
const port=process.env.PORT || '3000';

app.listen(port,host,()=>{
    console.log('Servidor en linea',host+':'+port)
    
});