const MovieServer = {
    handleRequest: (method, url, data, callback) => {
        const id = url.split('/').pop();
        const user = localStorage.getItem("currentUser"); 
        MoviesDB.loadDefaultMovies(user);

        setTimeout(() => { 
            if (method === 'GET' && id === "movies") { 
                const movies = MoviesDB.getMovies();
                callback({ status: 200, message: movies });
            } else if (method === 'GET' && id > 0) { 
                const movies = MoviesDB.getMovie(id);
                callback({ status: 200, message: movies });
            } else if (method === 'POST') {
                const movie = JSON.parse(data);
                MoviesDB.addMovie(movie);
                callback({ status: 201, message: 'Movie added successfully' });
            } else if (method === 'PUT') {
                const movie = JSON.parse(data);
                MoviesDB.editMovie(movie);
                callback({ status: 200, message: 'Movie updated successfully' });
            } else if (method === 'DELETE') {
                MoviesDB.deleteMovie(id);
                callback({ status: 200, message: 'Movie deleted successfully' });
            } else {
                callback({ status: 400, message: 'Invalid request' });
            }
        //}, Math.random() * 2000 + 1000); // השהיה של 1-3 שניות
        }, Math.random());
    }
};