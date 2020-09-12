const express= require('express');
const router= express.Router();
const Note=require('../models/Note')
let Notes=[ {title:'Hector',content:'Ramirez'},
            {title:'Hector',content:'Ramirez'},
            {title:'Hector',content:'Ramirez'}]

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

router.get('/notes/',async (req,res)=>{
    const notes= await Note.find().sort({date: 'desc'});
    // console.log(notes)
    res.render('notes/all',{notes})
})
router.get('/notes/edit/:id',async(req,res)=>{
    const note= await Note.findById(req.params.id)
    res.render('notes/edit',{note})
})
router.put('/notes/edit/:id',async(req,res)=>{
    const {title,content}=req.body
    await Note.findByIdAndUpdate(req.params.id,{title,content})
    res.redirect('/notes/')
})
  
router.delete('/notes/delete/:id',async(req,res)=>{
   await Note.findByIdAndDelete(req.params.id);
    res.redirect('/notes/');
})




module.exports= router;