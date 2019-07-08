var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookie = require("cookie-parser");
var mongoose = require("mongoose");

var app = express();
app.use(cookie());
app.use(
  session({
    key: "sid",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 // 쿠키 유효기간 24시간
    }
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//mongo -u moment -p moment2019 168.131.30.129/moment
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://168.131.30.129/moment", {
  useCreateIndex: true,
  useNewUrlParser: true
});

var userRouter = require("./routes/user");

app.use("/user", userRouter);

var server = app.listen(3000, function() {
  console.log("서버 실행중");
});
