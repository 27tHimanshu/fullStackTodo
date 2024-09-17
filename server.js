const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json()); 


connectDB();


app.get('/', (req,res)=>{
    res.send('hello world ');
})


app.listen( 3000 , ()=>{
    console.log("server running on port 3000");
})