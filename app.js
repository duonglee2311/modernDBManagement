const express = require('express');
const path = require("path");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const redis = require('redis')
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();



const app = express();
const port = 3100;

// var isLogin = true;
// app.use(function (req, res, next){
//   global.isLogin = true;
//   // res.locals = {
//   //   isLogin: false,
//   // };
//   next();
// });


app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{secure: false}  
}));


app.use(express.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());

// app.use(morgan('combined'));

require("./middlewares/view.mdw")(app);
require("./middlewares/locals.mdw")(app);
require("./middlewares/routes.mdw")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})