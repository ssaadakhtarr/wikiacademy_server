const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = require("./routes/index");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000", "https://wikisecurityacademy.azurewebsite.net", "https://wikisecurityacademy.surge.sh", "https://wikisec-backend.azurewebsites.net",],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(function(req, res, next) {
  if(req.headers['x-arr-ssl'] && !req.headers['x-forwarded-proto']) {
    req.headers['x-forwarded-proto'] = 'https';
  }
  return next();
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // domain: ".azurewebsite.net",
      sameSite: "none",
      secure: "true",
      httpOnly: false,
    },
  })
);

app.use("/", router);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3001");
});
