const { response } = require('express');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());

//db connectie
let db = null;
// is collection van db.collection('profile)
let profile = null;
// function connectDB
async function connectDB () {
  // get URI from .env file
  const uri = process.env.DB_URI
  // make connection to database
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri, options)
  await client.connect();
  db = await client.db(process.env.DB_NAME)
  profile = await db.collection('profile')
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


//laden van de pagina's
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', async (req, res) => {
  const id = req.query.id
  // als er geen id wordt gevonden, dan wordt de gebruiker geredirect en krijgt de functie en vroege return
  if (!id) return res.redirect('/create')
  const userData = await profile.findOne({ _id: ObjectId(id) })
  // als de userData niet beschikbaar is dan word de gebruiker geridirect en de functie krijgt een vroege return
  if (!userData) return res.redirect('/')

  res.render('profile', { profile: userData });
});

app.get('/create', (req, res) => {
  res.render('create', {title: 'create profile'});
});


//uitvoeren van de form en doorsturen naar profile.
app.post('/toevoegen', async (req, res) => {
  const id = req.query.id
  let userData = {
    firstname: req.body.firstname, 
    lastname: req.body.lastname, 
    leeftijd: req.body.leeftijd, 
    keuken: req.body.keuken
  };

  if (id) {
    await profile.updateOne({ _id: ObjectId(id) }, {
      // $set update alle velden van de gebruiker met de (nieuwe) data
      $set: userData
    })
    res.redirect(`/profile?id=${id}`)
    return
  }
//toevoegen van een nieuwe gebruiker
  const result = await profile.insertOne(userData);
   //insertedId komt terug uit de result variabele, dat is de objectId van de gebruiker, die geef ik weer mee in line 86
  if (!result.insertedId) return res.redirect('/')
  res.redirect(`/profile?id=${result.insertedId}`)
});

//error message
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

