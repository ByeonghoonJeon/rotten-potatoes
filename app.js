const express = require("express");
const app = express();

const exphbs = require("express-handlebars");

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String
  });
let reviews = [
    {title: "Great Review", movieTitle: "Batman II"},
    {title: "Awesome Movie", movieTitle: "Titanic"}
];

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
      })
      .catch(err => {
        console.log(err);
      })
  })

  app.get("/reviews/new", function(req, res){
    res.render("reviews-new",{})
  })

app.listen(3000, function(){
    console.log("Server is working on port 3000");
});
