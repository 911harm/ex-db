const mongoose=require('mongoose');

require('dotenv').config({path:'variables.env'})

mongoose.connect(process.env.DB_URL,
{useNewUrlParser: true,
useCreateIndex:true,
useFindAndModify:false
}).then(db=>console.log('Mongoose Connect!'))
.catch(err=>console.log(err));