// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var mongoose = require('mongoose');

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3001;

var api = require('./api/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// define mongoose connection
mongoose.Promise = Promise;
// model definitions
var Article = require("./models/Article.js");
var Note = require("./models/Note.js");

//mongoose.connect("mongodb://localhost/nytreact");
mongoose.connect("mongodb://admin:herokuadmin@ds135382.mlab.com:35382/heroku_7vxc8ppq");

var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error:", err);
});

db.once("open", function(){
  console.log("Mongoose connection successful");
});

app.use(express.static("./build"));

app.use("/api/", api);

app.get('/*', function(){
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
})

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


module.exports.app;