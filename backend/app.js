//import express
const express = require("express");
//import body-parser for processing request data
const bodyParser = require("body-parser");
//import post model
const Post = require("./models/post");
//import mongoose
const mongoose = require("mongoose");



//create the app
const app = express();

//connect to mongoose
mongoose.connect("mongodb+srv://admin:admin123@cluster0-zt9nj.mongodb.net/mean-course?retryWrites=true").then(()=>{
  console.log("Connected to MONGO !");
}).catch((error) => {
  console.log("Connection to MONGO failed with error: " + error);
});

//use body parser to read json from the request and to parse encoded urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//since express uses middleware, the use() method is used for calling a middleware. calling this method multiple times
//it will work as a chain that runs every middleware from first declared to last as long as we call next() if you are not returning a response.
app.use((req,res,next) => {
  console.log("First middleware that sets the headers for CORS");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

//the last handler is the one that handles the request, while the first one is a filter
app.get("/api/posts",(req,res,next) => {
  Post.find().then(documents => {
    res.status(200).json(
      {
        message: "Posts served successfully !",
        posts: documents
      });
  });



});

app.post("/api/posts",(req,res,next) => {
  const post = new Post({
    title : req.body.title,
    content : req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({message:"Post added successfully !", postId : createdPost._id});
  });

});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id : req.params.id}).then(result =>{
    console.log(result);
  })
  res.status(200).json({message:"Post deleted !"});
});

//export the express app to be used in server.js
module.exports = app;
