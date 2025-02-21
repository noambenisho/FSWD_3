const MovieServer = {
    handleRequest: (method, url, data, callback) => {
        const movies = DB.getMovies();
        if (method === 'GET') {
            callback(movies);
        } else if (method === 'POST') {
            const movie = JSON.parse(data);
            DB.addMovie(movie);
            callback({ status: 201, message: 'Movie added successfully' });
        } else if (method === 'DELETE') {
            const id = url.split('/').pop();
            DB.deleteMovie(id);
            callback({ status: 200, message: 'Movie deleted successfully' });
        }
    }
};
