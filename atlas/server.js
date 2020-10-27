const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const app = express();

app.use(cors());
app.use(cookieParser());


// const uri = process.env.ATLAS_URI;

mongoose.connect(process.env.ATLAS_URI || "mongodb://localhost/socialapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


mongoose.connection.on("connected", () => {
    console.log("mongoose is connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Define API Routes here
const userRouter = require("./routes/user");
const postRouter = require("./routes/postAPI");

app.use("/user", userRouter);
app.use("/view", postRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
  
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
  