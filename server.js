const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const config = require("config");

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

//Bodyparser Middleware
app.use(express.json());

//db config
const db = config.get('mongoURI');


//connect DB
mongoose
  .connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true
  })
  .then(() => console.log("MongoDB hooked up bruh"))
  .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

if (process.env.NODE_ENV ==='production'){
  app.use(express.static('client/build'));

  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))
