const MovieServer = {
    handleRequest: (method, url, data, callback) => {
        const id = url.split('/').pop();
        if (method === 'GET' && id === "movies") {// בלי אינדקס 
            const movies = MoviesDB.getMovies();
            callback({status : 201, message : movies});
        }else if (method === 'GET' && id > 0) { // עם אינקדס
            const movies = MoviesDB.getMovie(id);
            callback({ status: 200, message: movies});
        } else if (method === 'POST') {
            const movie = JSON.parse(data);
            MoviesDB.addMovie(movie);
            callback({ status: 201, message: 'Movie added successfully' });
        } else if (method === 'PUT') {
            const movie = JSON.parse(data);
            MoviesDB.editMovie(movie);
            callback({ status: 201, message: 'Movie update successfully' });
        } else if (method === 'DELETE') {
            MoviesDB.deleteMovie(id);
            callback({ status: 200, message: 'Movie deleted successfully' });
        }

    }
};
