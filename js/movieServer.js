const MovieServer = {
    handleRequest: (method, url, data, callback) => {
        if (method === 'GET') {// בלי אינדקס 
            const movies = MoviesDB.getMovies();
            callback({status : 201, message : movies});
        }else if (method === 'GET') { // עם אינקדס
            //##########################
        } else if (method === 'POST') {
            const movie = JSON.parse(data);
            MoviesDB.addMovie(movie);
            callback({ status: 201, message: 'Movie added successfully' });
        } else if (method === 'PUT') {
            //##########################
        } else if (method === 'DELETE') {
            const id = url.split('/').pop();
            MoviesDB.deleteMovie(id);
            callback({ status: 200, message: 'Movie deleted successfully' });
        }

    }
};
