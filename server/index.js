const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session')
    app = express(),
    checkForSession = require('./middlewares/checkForSession'),
    swag_controller = require('./controllers/swag_controller'),
    auth_controller = require('./controllers/auth_controller'),
    cart_controller = require('./controllers/cart_controller'),
    search_controller = require('./controllers/search_controller'),
    port = 3000;
app.use(bodyParser.json());
app.use(session({
    secret:'encryptString',
    resave: false,
    saveUninitialized: false
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/../public/build`));

app.get('/api/swag', swag_controller.read);
app.get('/api/user', auth_controller.getUser);
app.post('/api/login', auth_controller.login);
app.post('/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);
app.get('/api/search', search_controller.search);

app.listen(port,()=>{console.log(`App serving on port ${port}`)});
