const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/app-notes',
{useNewUrlParser: true,
useCreateIndex:true,
useFindAndModify:false
}).then(db=>console.log('Mongoose Connect!'))
.catch(err=>console.log(err));