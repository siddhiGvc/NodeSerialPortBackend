var express = require('express');
require('dotenv').config();
var db=require('./models/index');
var path = require('path');
// var https = require('https');
require ('./database.js');
require ('./index.js');

var cors=require('cors');


const PORT=process.env.PORT || 443;


var app = express();

// app.use(logger('dev'));
app.use(cors({
  origin:"*",
  methods:"GET"/"POST"
}));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
  (async () => {
    await db.sequelize.sync();
  })();
 

 
  app.get('/', (req, res) => res.send('Ok'));
 


app.listen(PORT,()=>{

  
    console.log(`Server listening ont ${PORT}`);
  
})