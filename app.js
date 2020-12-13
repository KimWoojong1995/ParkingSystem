const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config();

const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const parkRouter = require('./routes/park');
const paymentRouter = require('./routes/payment');
const ticketRouter = require('./routes/ticket');
const planRouter = require('./routes/plan');
const adminRouter = require('./routes/admin');
const { sequelize } = require('./models');

const app = express();
const passportConfig = require('./passport');

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
});
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
passportConfig();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/park', parkRouter);
app.use('/payment', paymentRouter);
app.use('/ticket', ticketRouter);
app.use('/plan', planRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });
  
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error', { error: '잘못 된 주소입니다.', message : '올바른 주소를 입력해주세요.' });
  });
  
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});