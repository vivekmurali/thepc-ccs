var express=require("express"); 
var bodyParser=require("body-parser"); 

const dotenv=require("dotenv");
require('dotenv').config()

dotenv.config({path: 'ENV_FILENAME'});

const mongoose = require('mongoose'); 
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true}); 
var DB=mongoose.connection; 
DB.on('error', console.log.bind(console, "connection error"));

DB.once('open', function(callback){ 
    console.log("connection succeeded"); 
});

let port = process.env.PORT || 3000

var app=express() 

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 


app.use(express.static(__dirname + "/../public"));

app.get('/',(req,res)=>{
    res.render('index.html');
})

app.listen(port, ()=>{
    console.log("listening");
});



app.post('/sign_up', (req,res)=>{ 
	var name = req.body.name; 
	var email =req.body.email; 
	var reg = req.body.reg; 
    var phone =req.body.phone; 
    var how = req.body.how;
    var dep = req.body.department;

	var data = { 
		"name": name, 
		"email":email, 
		"regno":reg, 
        "phone":phone,
        "How": how,
        "Department": dep
    }
    DB.collection('ccs').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully");
    }); 


    return res.send("Submitted");
});