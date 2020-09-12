const { text } = require('express');
const express= require('express');
const User=require('../models/User');
const router= express.Router();



router.get('/signin',(req,res)=>{
res.render('user/signin')
})


router.get('/signup',(req,res)=>{
res.render('user/signup')
})
router.post('/signup',async (req,res)=>{
   const {name,email,password,confirm_password}=req.body;

   const errors=[];

   const emailUser= await User.findOne({email:email});//comprobando existencia del email
    if(emailUser){
        errors.push({text:'Email Ya usado'});
    }

   if(name.length< 2){
       errors.push({text:'Ingrese un nombre valido'});
   }

   if(password.length< 4){
       errors.push({text:'Contraseña debe ser mayor a 4 Caracteres'});
   }
   if(password!=confirm_password){
       errors.push({text:'Las contraseñas deben coincidir'});
   }
   if(errors.length>0){
       res.render('user/signup',{errors,name,email,password,confirm_password})
   }

   else{
      
      const newUser= new User({name, email,password})
        newUser.password= await newUser.encrypPassword(password);
        await newUser.save();
        req.flash('success_msg','Usuario Registrado');
        res.redirect('/signin')
   }
})




module.exports= router;