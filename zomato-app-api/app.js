
const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const app = express()
const PORT = 3002;
const MONGOBD_URI ='mongodb://127.0.0.1:27017/ZomatoAppAPI';
const APIRouter = require('./routes/APIRouter');

//enable cors policy
app.use(cors());

//enable incoming POST data
app.use(express.json());
app.use(express.urlencoded({extended: false})); //allow us to get a data from form-data(data + file), x-www-urlencoded(data)

//inject routin in our app
//we use "Use method" => its a middleware
app.use("/api",APIRouter);
console.log('connecting to db...');

mongoose
    .connect(MONGOBD_URI)
    .then(() => {
      app.listen(PORT, () =>{
        console.log('connected with db');
        console.log('project is running on port', PORT);
    });
}).catch((error) => {
    console.log(error);
});
