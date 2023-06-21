//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is a blog site for daily usage, you can use it for daily bolggging or use it as a daily journal. You can add your daily blogs and it woud be helpful, as you cn revist and read your blog anytime.";
const aboutContent = "We halp people to post their maintain their daily blogs, which help people to keep tarack about their whole day properly.";
const contactContent = "You can contact us at anytime. we will be at your service 24/7.";
let posts = [];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home",{ 
    startingContent: homeStartingContent,
    posts: posts  
  });
  
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/posts/:postName", function(req, res){
  const postName = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(postName == storedTitle){
      res.render("post",{
        title: post.title, 
        content: post.content});
    }
  })
  
});

app.post("/compose", function(req, res){

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
   posts.push(post);
   res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
