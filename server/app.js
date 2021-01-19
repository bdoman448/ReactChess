var express = require('express');
var app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config');
var cors = require('cors')

app.use(bodyParser.json());
app.use(cors())

//Middlewares
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const profileRouter = require('./routes/profile')
const winsRouter = require('./routes/wins')
//Routes

app.get('/', (req, res) => {
  res.send('We are on home');
});

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/profile', profileRouter)
app.use('/wins', winsRouter)

// Connect TO DB
mongoose.connect(process.env.DB_CONNECTION,{ useUnifiedTopology: true }, () => {
  console.log('connected to DB!')
})

app.listen(5000)

module.exports = app;
