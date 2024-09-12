const express = require("express");
const { apiRouter } = require("./routes");
const { connectDB } = require("./config/db");
const cookieParser = require("cookie-parser");
const { handleError } = require("./utils/error");
const app = express();
app.use(express.json());
app.use(cookieParser());
const port = 3000;

connectDB();

app.get("/", function (req, res) {
  res.send("Hello World akash");
});
app.use("/api", apiRouter);
app.all("/*", (req, res) => {
  res.status(404).json({ message: "end point soes not exist" });
});
app.use(handleError);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
