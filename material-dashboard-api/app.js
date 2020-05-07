require('dotenv').config({
  path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const KnexSessionStore = require('connect-session-knex')(session);
const Knex = require('knex');
const initAuthMiddleware = require('./features/login/init-auth-middleware');
const indexRouter = require('./routes/index');

const app = express();

const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});

const knexStore = new KnexSessionStore({
  knex,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.enable('trust proxy');

const { COOKIE_EXPIRATION_MS } = process.env;
app.use(
  session({
    store: knexStore,
    secret: 'keyboard cat',
    name: process.env.SESSION_COOKIE_NAME,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      expires: Date.now() + parseInt(COOKIE_EXPIRATION_MS, 10),
      maxAge: parseInt(COOKIE_EXPIRATION_MS, 10),
    },
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  next();
});

initAuthMiddleware(app);

app.use('/', indexRouter);

module.exports = app;
