const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors');
const dbconnect = require('./config/database')
const cookieParser = require('cookie-parser');
const route = require('./Routes/authroutes');
const port = process.env.PORT || 5000

dbconnect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow only these methods
    credentials : true
  }));


  app.use("/api/auth", route)


const server = app.listen({port}, ()=>{
    console.log(`Server is listening to port ${port}`)
})