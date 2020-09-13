const express= require('express');
const router= express.Router();
const Note=require('../models/Note');
const {isAuth}=require('../helper/auth');
const User = require('../models/User');

router.get('/notes/new',isAuth,(req,res)=>{
res.render('notes/new')
})

router.post('/notes/new-note',isAuth,async (req,res)=>{
const {title,content}=req.body;
// console.log(title,content);
let errors=[];
if(!title){
    errors.push({text:"Por favor ingrese un Titulo"})
}
if(!content){
    errors.push({text:"Por favor ingrese la nota"})
}
if(errors.length>0){
    // console.log(errors);
    res.render('notes/new',{
        title,
        content,
        errors
    })
}
else{
    const newNote= new Note({title,content});
    newNote.user=req.user.id
    await newNote.save();
    req.flash('success_msg','Nota Guardada')
    res.redirect('/notes/');
    
}
})//fin metodo de recibir

router.get('/notes/',isAuth,async (req,res)=>{
    const notes= await Note.find({user:req.user.id}).sort({date: 'desc'});
    res.render('notes/all',{notes})
})
router.get('/notes/edit/:id',isAuth,async(req,res)=>{
    const note= await Note.findById(req.params.id)
    
    res.render('notes/edit',{note})
})
router.put('/notes/edit/:id',isAuth,async(req,res)=>{
    const {title,content}=req.body
    await Note.findByIdAndUpdate(req.params.id,{title,content})
    req.flash('success_msg','Nota Editada Correctamente')
    res.redirect('/notes/')
})
  
router.delete('/notes/delete/:id',isAuth,async(req,res)=>{
   await Note.findByIdAndDelete(req.params.id);
   req.flash('success_msg','Nota Eliminada')
    res.redirect('/notes/');
})




module.exports= router;