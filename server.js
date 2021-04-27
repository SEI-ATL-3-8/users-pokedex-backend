
require('dotenv').config();
const express = require('express')
const app = express()
const {userAuth} = require('./middlewears/userMiddleWear');
app.use(require('morgan')('tiny'))
const routesReport = require('rowdy-logger').begin(app)

app.use(express.json())
app.use(require('cors')())
app.use(userAuth);


const favPokemonRoutes = require('./routes/favPokemonRoutes')
const userRouter = require('./routes/userRoutes');

app.use('/favPokemon', favPokemonRoutes);
app.use('/user', userRouter);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  routesReport.print()
})
