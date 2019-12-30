'use strict';

console.log(`
3.
---

We need to create a route that downloads the entire database to a .csv file.
The endpoint must be set to: GET /users

Make sure to have an instance of MongoDB running at: mongodb://localhost

Run the database seed with:
$ node utils/seed.js

-> Warning: It contains hundreds of entities and our production server is quite small
`);
const { parse } = require('json2csv');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Setup database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mediastream-challenge');
const User = require('./models/User');

// Setup Express.js app
const app = express();

// TODO

app.get("/users",(req,res)=>{
    User.find().then(d=>{
        console.log(d)
        let fields = ["name","email" ];
        let data = parse(d,{fields});
        res.attachment('users.csv');
        res.set('Content-Type', 'application/octet-stream');
        res.set('Access-Control-Allow-Origin', '*');
        res.send(data);
        })
});



app.listen(3000);
