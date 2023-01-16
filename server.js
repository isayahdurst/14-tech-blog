const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require('./config/connection');
const mainRouter = require('./app/controllers');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const helpers = require('./app/utils/helpers');
const PORT = process.env.PORT || 3001;

const app = express();

const hbs = exphbs.create({ helpers });

app.engine(
    'handlebars',
    exphbs.engine({
        extname: 'handlebars',
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'app/views/layouts'),
        partialsDir: path.join(__dirname, 'app/views/partials'),
        viewsDir: path.join(__dirname, 'app/views'),
    })
);
app.set('view engine', 'handlebars');
app.set('views', './app/views');

app.use(express.json());
app.use(cookieParser());
app.use(mainRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Application running on PORT: ${PORT}`);
    });
});
