let bodyParser = require("body-parser");
let data = [{ item: "pray" }, { item: "read quran" }, { item: "say Azkar" }];
let mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://test:test@cluster0-v436u.mongodb.net/todo?retryWrites=true&w=majority"
);
let todoschema = new mongoose.Schema({ item: String });
let Todo = mongoose.model("Todo", todoschema);

let urlencodedParser = bodyParser.urlencoded({ extended: false });
module.exports = function(app) {
  app.get("/todo", function(req, res) {
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render("todo", { todo: data });
    });
  });
  app.post("/todo", urlencodedParser, function(req, res) {
    // ...
    let newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
  app.delete("/todo/:item", function(req, res) {
    // ...
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};
