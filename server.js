const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const app = express()

const models = require('./models')

app.use(require('morgan')('tiny'))
const routesReport = require('rowdy-logger').begin(app)

app.use(express.json())
app.use(require('cors')())

const userRoutes = require('./routes/userRoutes')
const favPokemonRoutes = require('./routes/favPokemonRoutes')

const lookupUser = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
      console.log(decryptedId);
      const user = await models.user.findOne({
        where: {
          // note that decryptedId will be an object like this: { userId: 5 }
          id: decryptedId.userId
        }
      })

      req.user = user
    } else {
      req.user = null
    }

  } catch (error) {
    console.log(error)
  } finally {
    // code in the finally block runs whether there was an error or not
    // next tells express to continue on with the waterfall; without it the request would hang here forever
    next()
  }
}

// app.use runs this function before every request, no matter its verb and path
app.use(lookupUser)
app.use('/users', userRoutes)
app.use('/favPokemon', favPokemonRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  routesReport.print()
})
