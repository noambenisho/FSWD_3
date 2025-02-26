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

    editMovie: (id, updatedMovie) => {
        let movies = MoviesDB.getMovies();
        movies = movies.map(movie => 
            movie.id === id ? { ...movie, ...updatedMovie } : movie
        );
        localStorage.setItem('movies', JSON.stringify(movies));
    },
};
const AuthDB = {
    getUsers: () => JSON.parse(localStorage.getItem('users')) || [],
    addUser: (user) => {
        const users = AuthDB.getUsers();
        users[user.username] = user;
        localStorage.setItem('users', JSON.stringify(users));
    },
};