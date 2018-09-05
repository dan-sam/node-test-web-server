const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;
//set where the partial files are
hbs.registerPartials(__dirname + '/views/partials');

//set that you want to use hbs as the view engine
app.set('view engine', 'hbs');

//app.use is how you use middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log("Unable to append to server.log.");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Currently under construction.',
//     welcomeMsg: 'We are sorry...',
//   });
// });

//here we set the public home directory
app.use(express.static(__dirname + '/public'));

//register functions to get injected into html files
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


//Express by default looks for a folder called "views" in the root directory.
//You can set it manually with
//app.set('views', path.join(__dirname, '/path/to/views'));
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'You start here',
    welcomeMsg: 'Welcome to our homepage!',
  });
});

app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'This is a bad request'
  });
});



app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
