const express= require('express');
const router= express.Router();



router.get('/notes/new',(req,res)=>{
res.render('notes/new')
})

router.get('/notes/',(req,res)=>{
res.send('notes de la base de datos')
})





module.exports= router;