const express = require("express");
const cors = require("cors");
const multer = require("multer");

require("dotenv").config();

const upload = multer({ dest: __dirname + "/uploads/" });

const app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Upload file, save to /updloads and return json with file name, type and size
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
