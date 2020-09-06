const express= require('express');
const router= express.Router();



router.get('/signin',(req,res)=>{
res.render('user/signin')
})


router.get('/signup',(req,res)=>{
res.render('user/signup')
})




module.exports= router;