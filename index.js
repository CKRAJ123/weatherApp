const express=require('express');
const bodyParser = require('body-parser');

 const path=require('path');

const port=8000;

const db = require('./config/mongoose');
const app=express();

// uses for store city name 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('assets'));
 app.set('view engine', 'ejs');
 app.set('views',path.join(__dirname, 'views'));


  const cityName=[];
app.get('/',function(req,res){
    // console.log("hiii");
    return res.render('home',{city_name:cityName});
     //res.send('hiii chandsn   cdssssdddd');
});
app.get('/search',function(req,res){
     return res.render('search');
});
app.get('/detail',function(req,res){
  return res.render('details');
});

app.post('/city-weather',function(req,res){
      
      const city=req.body.city;
        if(cityName.includes(city)==false)
         cityName.push(city);

      const apik = "3045dd712ffe6e702e3245525ac7fa38";
       let weather=[];
          
                   fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apik)
                   .then(res => res.json())
                 
                 
                   .then(data => 
                   {
                    weather.push(data['name']);
                    weather.push(data['weather']['0']['description']);
                    weather.push(data['main']['temp']);
                    weather.push(data['wind']['speed']);
                 
                    return res.render('details',{weather_detail:weather});
                   });
                 
                               
              //return "You entered Wrong city Name";
    
});

//  app.get('/delete-contact/:email',function(req,res){
//     console.log(req.params);
//     let email=req.params.email;
//     let contactIndex=contactList.findIndex(contact => contact.email==email);
//     if(contactIndex!=-1){
//         contactList.splice(contactIndex,1);
//     }
//     return res.redirect('back');
//  });
app.listen(port,function(err){
       
    console.log("Yup, My express server");
});