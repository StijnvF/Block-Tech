const express = require('express')
const app = express()
const port = 3000


app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());


const users = [{
  firstname: 'Stijn',
  lastname: 'van Fraeijenhove',
  leeftijd: '24-02-1998',
  keuken: 'italiaans'
  },
  // {
  //   firstname: 'Victor',
  //   lastname: 'Boucher',
  //   leeftijd: '01-01-1998',
  //   keuken: 'japans'
  // },
]

app.get('/', (req, res) => {
  res.render('index', {users});
});

app.get('/profile', (req, res) => {
  res.render('profile', {loggedIn: true, username: 'WoeStijn', users});
});

app.get('/create', (req, res) => {
  res.render('create', {title: 'create profile'});
});

app.get('/edit', (req, res) => {
  res.render('edit', {title: 'edit profile'});
});

app.post('/create', (req, res) => {
  // console.log(req.body)
  let profile ={firstname: req.body.firstname, lastname: req.body.lastname, leeftijd: req.body.leeftijd, keuken: req.body.keuken}
  users.push(profile)
  res.render('profile', {title: 'succesfully added profile' , users});
});


app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
