const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(express.static('public'))

const users = [{
    username: 'Victor',
    age: '22',
    city: 'Amsterdam'
  },
  {
    username: 'Stijn',
    age: '23',
    city: 'Purmerend'
  },
  {
    username: 'Peter',
    age: '31',
    city: 'Utercht'
  }
]

app.get('/', (req, res) => {
  res.render('index', {
    users
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {
    loggedIn: true,
    username: 'WoeStijn'
  });
});

app.get('/create', (req, res) => {
  res.render('create', {
    foo: 'FOO'
  });
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