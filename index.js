const express = require('express')
const app = express()
const port = 3000


app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());


const users = [{
    firstname: 'Victor',
    lastname: 'Boucher',
    age: '01-01-1998',
    keuken: 'japans'
  },
  {
    firstname: 'Stijn',
    lastname: 'van Fraeijenhove',
    age: '24-02-1998',
    keuken: 'italiaans'
  },
]

app.get('/', (req, res) => {
  res.render('index', {users});
});

app.get('/profile', (req, res) => {
  res.render('profile', {loggedIn: true, username: 'WoeStijn'});
});

app.get('/create', (req, res) => {
  res.render('create', {title: 'create profile'});
});

app.post('/create', (req, res) => {
  // console.log(req.body)
  let profile ={firstname: req.body.firstname, lastname: req.body.lastname, leeftijd: req.body.leeftijd, keuken: req.body.keuken}
  users.push(profile)
  res.render('index', {title: 'succesfully added profile' , users});
});



app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// app.get('/profile', (req, res) => {
//   res.send('This will become the profile page.')
// });

// app.get('/create', (req, res) => {
//   res.send('This will become the create profile page.')
// });