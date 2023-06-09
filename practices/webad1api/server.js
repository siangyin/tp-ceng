const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

//(middleware) parse form data. The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
// common approach using extended: false
app.use(express.urlencoded({ extended: false }));

// json so that app.post can pass back data from form. otherwise FE will not be able to fetch the data.
app.use(express.json());

app.use(express.static("./public"));

// ROUTERS
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
const reviewRouter = require("./routes/reviewRoutes");

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/restaurant", restaurantRouter);
app.use("/api/v1/review", reviewRouter);

app.get("/index.html", (req, res) => {
	console.log(req.params, __dirname);
	res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, (req, res) => {
	console.log("app running", PORT);
});
