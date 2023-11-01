var express = require('express');
var path = require('path');
var app = express();

const exphbs = require('express-handlebars');
const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

app.get('/users', function(req, res) {
  res.send('respond with a resource');
});

app.get('*', function(req, res) {
  res.render('error', { title: 'Error', message:'Wrong Route' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})