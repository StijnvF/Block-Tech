const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb')
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());

// tijdelijke opslag variabelen, todat ik een mongoDB connectie heb. Refactor
// const users = [{
//     firstname: 'Stijn',
//     lastname: 'van Fraeijenhove',
//     leeftijd: '24-02-1998',
//     keuken: 'italiaans'
//   },
//   {
//     firstname: 'Tom',
//     lastname: 'Kool',
//     leeftijd: '21-08-1997',
//     keuken: 'japans'
//   },
// ];

//laden van de pagina's
app.get('/', (req, res) => {
  res.render('index', );
});

app.get('/profile', (req, res) => {
  res.render('profile',);
});

app.get('/create', (req, res) => {
  res.render('create', {title: 'create profile'});
});

app.get('/edit', (req, res) => {
  res.render('edit', {title: 'edit profile'});
});

//uitvoeren van de form en doorsturen naar profile.
app.post('/toevoegen', (req, res) => {
  // console.log(req.body)
  let profile ={firstname: req.body.firstname, lastname: req.body.lastname, leeftijd: req.body.leeftijd, keuken: req.body.keuken}
  // users.push(profile)
  res.render('profile', {
    title: 'succesfully added profile', 
    profile, 
    editing:true});
});

//error message
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


let db = null;
// function connectDB
async function connectDB () {
  // get URI from .env file
  const uri = process.env.DB_URI
  // make connection to database
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri, options)
  await client.connect();
  db = await client.db(process.env.DB_NAME)
}
connectDB()
  .then(() => {
    // if succesfull connections is made, show a message
    console.log('Connection to MongoDB succesfull')
  })
  .catch( error => {
    // if connnection is unsuccesful, show errors
    console.log(error)
  });

