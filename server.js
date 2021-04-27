const express = require('express')
const app = express()
const models = require('./models')
app.use(require('morgan')('tiny'))
const routesReport = require('rowdy-logger').begin(app)

app.use(express.json())
app.use(require('cors')())


const favPokemonRoutes = require('./routes/favPokemonRoutes')
app.use('/favPokemon', favPokemonRoutes)

app.post('/users', (req, res) => {
  models.user.create({
    email: req.body.email,
    password: req.body.password
  })
  .then((user) => {
    res.json({ message: 'success', user})
  })
  .catch((error) => {
    res.status(400).json({ error: error.message })
  })
})

app.post('/users/login', (req, res) => {
  models.user.findOne({
    where: { email: req.body.email }
  }).then((foundUser) => {
    if (foundUser && foundUser.password === req.body.password) {
      res.json({ message: 'success', user: foundUser })
    } else {
      res.status(401).json({ message: 'login failed' })
    }
  }).catch((error) => {
    res.status(400).json({ error: error.message })
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  routesReport.print()
})
