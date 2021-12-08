const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override')

const app = express();

// const publicPath = path.resolve(__dirname,"./public")

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());

app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.use(methodOverride('_method'))

// Template Engine
app.set('view engine', 'ejs')

app.set('views', [
    path.join(__dirname, './views'),
    path.join(__dirname, './views/product') ,
    path.join(__dirname, './views/users') 
])

// Routers
const mainRoutes = require('./routes/mainRoutes');

const userRoutes = require('./routes/userRoutes');

const productRouter = require('./routes/productRoutes')

app.use('/', mainRoutes);

app.use('/user', userRoutes);

app.use('/products', productRouter)

app.listen(3001, () => console.log('Servidor levantado en el puerto 3001'));