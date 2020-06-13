var express = require("express");
var todoController = require("./controllers/todoController");

var app = express();

app.set("view engine", "ejs");

app.use("/public/assets", express.static("public/assets"));

todoController(app);

app.listen(3000);

console.log("running on port 3000");
