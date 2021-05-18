const express = require('express')
const app = express()
const port = 3000


app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());

// tijdelijke opslag variabelen, todat ik een mongoDB connectie heb. Refactor
const users = [{
    firstname: 'Stijn',
    lastname: 'van Fraeijenhove',
    leeftijd: '24-02-1998',
    keuken: 'italiaans'
  },
  {
    firstname: 'Tom',
    lastname: 'Kool',
    leeftijd: '21-08-1997',
    keuken: 'japans'
  },
]
//laden van de pagina's
app.get('/', (req, res) => {
  res.render('index', );
});

app.get('/profile', (req, res) => {
  res.render('profile', {users});
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
  users.push(profile)
  res.render('profile', {
    title: 'succesfully added profile', 
    profile, 
    editing:true});
});

//error message
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
