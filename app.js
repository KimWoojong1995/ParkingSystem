const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
    name: 'connect.sid',
}));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.patch('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
});

app.listen(3000, () => {
    console.log('익스프레스 서버 실행')
});