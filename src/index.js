const express= require('express');
const path= require('path');
const exphbs= require('express-handlebars');
const methodOverride=require('method-override');
const session =require('express-session');
const flash=require('connect-flash');
const passport=require('passport');


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
app.use(flash());
//Variasbles glovales
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})
app.use(passport.initialize())
app.use(passport.session())
//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/user'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname,'public')));
//Servidor escuchando
app.listen(3000,()=>{
    console.log('Servidor en linea en: localhost:',app.get('port'));
    
});