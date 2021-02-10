const express = require("express");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const ejs = require("ejs");
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const randomUrl = require("random-url")

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));


// const groupUrl = randomUrl("https");

mongoose.connect("mongodb://localhost:27017/chitChatUserDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

// Model/Collection of Users
const userSchema = {
  username: {type: String, unique: true},
  email: {type: String, lowercase: true, unique: true},
  password: String
};

const User = new mongoose.model("User", userSchema);
// ------------------------------------------------------------

// Model/Collection of Contacts
const contactSchema = {
  username: String
};

const Contact = new mongoose.model("Contact", contactSchema);
// ------------------------------------------------------------

// Model/Collection of Group
const groupSchema = {
  name: String,
  Admin: String,
  password: String,
  groupLink: String,
  message: [{contact: String, body: String}]
  // messages: [{contact: contactSchema, body: String}]
  // members: []
  // messages: [{
  //   author: ,
  //   body: String
  // }]
};

const Group = new mongoose.model("Group", groupSchema);
// ------------------------------------------------------------

// Model of conversation
const messages = {
  // from: user_id,
  body: [String]
}



// GET Requests

app.get("/", function(req, res) {
  // res.sendfile(__dirname + "/home1.html");
  res.render("home");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/login", function(req, res) {
  res.render("login");
});


app.get("/new-group", function(req, res){
  res.render("new-group");
});

app.get("user-group/:groupUrl", function(req, res){

});

// POST Requests

app.post("/register", function(req,res){
const newUser = new User ({
  username: req.body.username,
  email: req.body.email,
  password: req.body.password
});

newUser.save(function(err, foundUser){
if(err){
  console.log(err);
} else{
  res.render("user",{userName: foundUser.username});
}
});
});


app.post("/login", function(req, res){
  const username = req.body.email;
  const password = req.body.password;

User.findOne({email: username}, function(err, foundUser){
  if(err){
    console.log(err);
  } else if(foundUser.password === password){
    res.render("user", {userName: foundUser.username});
  }
});

});


app.post("/new-group", function(req, res){
  const newGroup = new Group ({
    name: req.body.groupname,
    password: req.body.grouppassword
  });

newGroup.save(function(err, foundGroup){
  if(err){
    console.log(err)
  } else {
    res.render("user-group", {groupName: foundGroup.name})
  }
});
});


app.post("/add-contact", function(req, res){

});

app.post("/delete-contact", function(req, res){

});

app.post("/send-message", function(req, res){

});



app.post("/delete-message", function(req, res){
const checkedMessageId = req.body.checkedMessage;
const groupName = req.body.groupName;


});


app.post("/delete-group", function(req, res){

});





let port = process.env.PORT;
if(port == null || port == ""){
  port = 4000;
}

app.listen(port, function() {
  console.log("Server started on port 4000");
});
