module.exports = function (app) {

    const { MovieDb } = require('moviedb-promise')
    const moviedb = new MovieDb('')

    app.get('/', (req, res) => {
        moviedb.miscNowPlayingMovies().then(response => {
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    })

}