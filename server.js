const path = require("path");
const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/index");
const viewEndPoint = require("./services/terminal/endPoints");
const dbConnection = require("./database/connection");
// const apiResponse = require("./helper/apiResponser");
const http = require("http");
dotEnv.config();
const app = express();
let server = require("http").createServer(app);

// db connectivity
dbConnection()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });
const corsOptions = {
  origin: ["http://localhost:4200"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors({ origin: "*" }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs"); // default templating engine
//app.set('views', 'views'); // letting know express where to find view
app.get("/*", function (req, res, next) {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
});
// request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation
if (process.env.NODE_ENV !== "production") {
  console.log(process.env.NODE_ENV);
}
const PORT = process.env.PORT || 3005;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use("/test", viewEndPoint, (req, res) => {
  console.log("server running test had cleared");
  res.send({ msg: "server is running" });
});

// all routes
app.use("/api", viewEndPoint, routes);

// error handler middleware
app.use((err, req, res, next) => {
  console.error("error encountered at System level-> ", err);
  return res
    .status(err.statusCode || 500)
    .send(apiResponse.errorResponse(err.message || "Something went wrong"));
});
