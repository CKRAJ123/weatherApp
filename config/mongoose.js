//require the librariy
const mongoose=require('mongoose');

mongoose.set('strictQuery',true);
// connected to the database
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db'); 

//acuire the connection(check if it is sucessfull) 
const db=mongoose.connection;

// print error
db.on('error',console.error.bind(console,'error connecting to db'));

//up  and runing the print message
db.once('open',function(){
    console.log('sucessfully connected to database');
});