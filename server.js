const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes'); 


const app = express();
app.use(cors());
app.use(express.json()); 


connectDB();

app.use('/api',todoRoutes);

app.get('/', (req,res)=>{
    res.send('hello world how are hyor ');
})


app.listen( 5000 , ()=>{
    console.log("server running on port 5000");
})