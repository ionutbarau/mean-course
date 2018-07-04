//import express
const express = require('express');
//import body-parser for processing request data
const bodyParser = require('body-parser');
//create the app
const app = express();

//use body parser to read json from the request and to parse encoded urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//since express uses middleware, the use() method is used for calling a middleware. calling this method multiple times
//it will work as a chain that runs every middleware from first declared to last as long as we call next() if you are not returning a response.
app.use((req,res,next) => {
  console.log('First middleware that sets the headers for CORS');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});
//the last handler is the one that handles the reauest, while the first one is a filter
app.get('/api/posts',(req,res,next) => {
  //res.send('Hello from express');
  const posts = [
    {
      id:'1',
      title:'First post',
      content:'Content test'
    },
    {
      id:'2',
      title:'Second post',
      content:'Content second test'
    }
  ];
  res.status(200).json(
    {
      message: 'Posts served successfully !',
      posts: posts
    });

});

//the last handler is the one that handles the request, while the first one is a filter
app.get('/api/posts',(req,res,next) => {
  //res.send('Hello from express');
  const posts = [
    {
      id:'1',
      title:'First post',
      content:'Content test'
    },
    {
      id:'2',
      title:'Second post',
      content:'Content second test'
    }
  ];
res.status(200).json(
  {
    message: 'Posts served successfully !',
    posts: posts
  });

});

app.post('/api/posts',(req,res,next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({message:"Post added successfully !"});

});

//export the express app to be used in server.js
module.exports = app;
