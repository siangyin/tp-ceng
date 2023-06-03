const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//(middleware) parse form data. The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
// common approach using extended: false
app.use(express.urlencoded({ extended: false }));

// json so that app.post can pass back data from form. otherwise FE will not be able to fetch the data.
app.use(express.json());

// ROUTERS
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
	res.send("<h1>Hello</h1>");
});

app.listen(PORT, (req, res) => {
	console.log(`server running on ${PORT}`);
});
