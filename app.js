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

const Review = mongoose.model("Review", {
  title: String,
  movieTitle: String,
  rating: Number,
  description: String,
});

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//     { title: "Great Review", movieTitle: "Batman II" },
//     { title: "Awesome Movie", movieTitle: "Titanic" },
//     { title: "Fun Movie", movieTitle: "LALA Land"}
//   ]

app.get("/", (req, res) => {
  Review.find()
    .then((reviews) => {
      res.render("reviews-index", { reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
    });
});

// INDEX
app.get("/reviews", (req, res) => {
  res.render("reviews-index", { reviews: reviews });
});

// NEW
app.get("/reviews/new", (req, res) => {
  res.render("reviews-new", { title: "New Review" });
});

// SHOW
app.get("/reviews/:id", (req, res) => {
  res.send("I'm a review");
});

// EDIT
app.get("/reviews/:id/edit", (req, res) => {
  Review.findById(req.params.id, function (err, review) {
    res.render("reviews-edit", { review: review, title: "Edit Review" });
  });
});

// UPDATE
app.put("/reviews/:id", (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then((review) => {
      res.redirect(`/reviews/${review._id}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// CREATE
app.post("/reviews", (req, res) => {
  Review.create(req.body)
    .then((review) => {
      console.log(review);
      res.redirect(`/reviews/${review._id}`); // Redirect to reviews/:id
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
