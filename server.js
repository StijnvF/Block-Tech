const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/register', (req, res) => {
  res.send('This will become the register page.')
});

app.get('/login', (req, res) => {
  res.send('This will become the login page.')
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})