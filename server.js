var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var products = require('./lib/products.js')
var menuItems = [];
var messageHistory = [];

products.forEach(function(el){
  menuItems.push(el.name);
})

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());



// serve a favicon from '/public';
app.use(morgan('dev'));
// serve static files from '/public';
app.use(favicon(__dirname + '/public/favicon.ico'));
// log requests using morgan (format 'dev');
app.use(express.static(__dirname + '/vender'));
app.use(express.static(__dirname + '/public'));

// route handlers
app.get('/blah', function(req, res){
  // render a string of html that say "you entered:"
  // and the value from <input type="text" name="key">
  var key = req.query.key;
  var html = 'You entered: ' + key;
  res.send(html);
});

app.post('/blah', function(req, res){
  var key = req.body.key;
  var html = "You entered: " + key;
  res.send(html);
});

app.get('/menu', function(req, res){
  var menu = '<ul>'
  products.forEach(function(el){
    menu += '<li>' + el.name + '</li>'  })
  menu += '</ul>';

  res.send(menu)
})

app.get('/searched', function(req, res){
  var searchItem = req.query.keyword;
  if(menuItems.includes(searchItem)){
    res.send('Yes, we have '+ searchItem + '!')
  } else {
    res.send("Sorry, hun. Don't got no " + searchItem + ' here.')
  }
})

app.post('/messages', function(req, res){
  console.log('req.body= ', req.body)
  var username = req.body.username;
  var message = req.body.message;
  messageHistory.push(req.body);
  console.log('message history: ', messageHistory);
  messageHTML = '<ul style="list-style-type: none">';
  for(var i=0; i<messageHistory.length; i++){
    messageHTML += '<li>' + messageHistory[i].username + ': ' + messageHistory[i].message + '</li>';
  };
  messageHTML += "</ul>";
  res.send(messageHTML);
})

// listen on this port
var port = 3000;
app.listen(port, function(){
  console.log('up!');
});












