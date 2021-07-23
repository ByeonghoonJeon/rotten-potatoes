const express = require("express");
const methodOverride = require("method-override");
const app = express();
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride("_method"));

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

mongoose.connect("mongodb://localhost/rotten-potatoes", {
  useNewUrlParser: true,
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const movies = require('./controllers/movies')(app);

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" },
//     { title: "Fun Movie", movieTitle: "LALA Land"}
//   ]


app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

module.exports = app;