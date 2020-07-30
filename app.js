// Import express
const express = require('express');
const bodyParser = require('body-parser');
var _ = require('lodash');

// Initialise express js
var app = express();
app.use(express.static("static"));
app.use(bodyParser.urlencoded({
  extended: true
}));

var profiles = {
  'meenakshi': {
    'name': 'Meenakshi Chan',
    'img': 'https://pbs.twimg.com/profile_images/1288675993507385344/7D3cvzRU_400x400.jpg',
    'position': 'Web dev intern',
    'company': 'AIRobotica',
    'companyurl': 'https://airobotica.in/',
  },
};

var achievements = ['I won an oscar in 2022', 'Secured Gold in Javelin throw, Olympics 2020', ' Went to NASA Space Station in May 2030', 'Published my own sequel'];

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {
    achievementsList: achievements,
  });
});

app.get('/contact', function(req, res) {
  res.render('contact');
});

app.get('/about', function(req, res) {
  res.send("This is the about page");
});

app.get('/add', function(req, res) {
  res.render('addAchievement');
});

app.get('/add-profile', function(req, res) {
  res.render('addProfile');
});

app.post('/contact', function(req, res) {
  console.log(req.body);
  res.send("Form posted successfully!");
});

app.post('/add', function (req, res) {
  var newAchievement = req.body.achievement;
  achievements.push(newAchievement);
  res.redirect('/');
});

app.get('/:name', function(req, res){
  var name = _.lowerCase(req.params.name);
  console.log(profiles[name]);
  if(profiles[_.lowerCase(name)]) {
    res.render('portfolio', {
      img: profiles[name].img,
      name: profiles[name].name,
      company: profiles[name].company,
      companyurl: profiles[name].companyurl,
      position: profiles[name].position,
      achievementsList: achievements,
    });
  }
  else {
    res.send(404);
  }
});

app.post('/add-profile', function(req, res) {
  console.log(req.body);
  var profileName = _.lowerCase(req.body.name)
  profiles[profileName] = {
    img: req.body.img,
    name: req.body.name,
    company: req.body.company,
    companyurl: req.body.companyurl,
    position: req.body.position,
    achievementsList: achievements,
  };
  console.log(profiles);
  res.redirect('/'+profileName)

});


// Binding a port to our server (to redirect to our app)
app.listen(3001, function() {
  console.log("Server running on port 3001");
});
// Ports likely already in use: 80, 443, 8080, 4343, 3306
