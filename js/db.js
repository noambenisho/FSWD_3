const MoviesDB = {
    getMovies: () => JSON.parse(localStorage.getItem('movies')) || [],
    addMovie: (movie) => {
        const movies = MoviesDB.getMovies();
        movie.id = Date.now().toString();
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies));
    },
    deleteMovie: (id) => {
        let movies = MoviesDB.getMovies();
        movies = movies.filter(movie => movie.id !== id);
        localStorage.setItem('movies', JSON.stringify(movies));
    },
    getMovie: (id) => {
        const movies = MoviesDB.getMovies();
        return movies.find(movie => movie.id === id) || null;
    },

    editMovie: (updatedMovie) => {
        let movies = MoviesDB.getMovies();
        movies = movies.map(movie => 
            movie.name === updatedMovie.name ? { ...movie, ...updatedMovie } : movie
        );
        localStorage.setItem('movies', JSON.stringify(movies));
    },
};
const AuthDB = {
    getUsers: () => JSON.parse(localStorage.getItem('users')) || [],
    addUser: (user) => {
        const users = AuthDB.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    },
};