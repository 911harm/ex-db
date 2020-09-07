const express= require('express');
const router= express.Router();
const Note=require('../models/Note')


router.get('/notes/new',(req,res)=>{
res.render('notes/new')
})

router.post('/notes/new-note',async (req,res)=>{
const {title,content}=req.body;
console.log(title,content);
let errors=[];
if(!title){
    errors.push({text:"Por favor ingrese un Titulo"})
}
if(!content){
    errors.push({text:"Por favor ingrese la nota"})
}
if(errors.length>0){
    console.log(errors);
    res.render('notes/new',{
        title,
        content,
        errors
    })
}
else{
    const newNote= new Note({title,content});
    console.log(newNote);
    await newNote.save();
    res.redirect('/notes/');
    
}
})//fin metodo de recibir

router.get('/notes/',async(req,res)=>{
const notes= await Note.find();
console.log(notes);
res.render('notes/all',{notes})
})





module.exports= router;