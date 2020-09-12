const helpers={};
helpers.isAuth=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','No Autotizado')
    res.redirect('/signin')
}
module.exports=helpers;