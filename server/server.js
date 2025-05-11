const express = require("express");
const bodyParser = require("body-parser");
const rateLimiter = require("./middleware/rateLimiter");
const cors = require("cors");
const router = require("./routes");

const app = express();

app.use(bodyParser.json());

app.use(
  cors({ origin: ["http://localhost:5173", "*"], methods: ["GET", "POST"] })
);

// Apply rate limiter middleware
app.use(rateLimiter);

const PORT = 5000 || process.env.PORT;

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
