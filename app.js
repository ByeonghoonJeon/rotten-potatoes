const express = require("express");
const app = express();
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

const exphbs = require("express-handlebars");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    rating: Number
  });
let reviews = [
    {title: "Great Review", description: "Good", movieTitle: "Batman II", rating: 4},
    {title: "Awesome Movie", description: "Nice", movieTitle: "Titanic", rating: 5}
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


app.get('/reviews', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})


app.get("/reviews/new", function(req, res){
  res.render("reviews-new",{})
});

app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})
  

app.listen(3000, function(){
    console.log("Server is working on port 3000");
});
