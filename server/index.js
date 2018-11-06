const express = require('express');
const bodyParser = require('body-parser');
const session = require ('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swag = require('./controllers/swag_controller');
const auth = require('./controllers/auth_controller');
const cart = require('./controllers/cart_controller');
const search = require('./controllers/search_controller');

require('dotenv').config();
let { SESSION_SECRET, SERVER_PORT} = process.env

const app = express();

app.use(bodyParser.json())

app.use( session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))
app.use(checkForSession)

app.get('/api/swag', swag.read)
app.post('/api/login',auth.login)
app.post('/api/register',auth.register)
app.post('/api/signout',auth.signout)
app.get('/api/user', auth.getuser)
app.post('/api/cart',cart.add)
app.post('/api/cart/checkout',cart.checkout)
app.delete('/api/cart',cart.delete)
app.get('/api/search',search.search)

app.listen(SERVER_PORT, ()=> {
    console.log('listening on port:', SERVER_PORT)
})