const MoviesDB = {
    getMovies: () => JSON.parse(localStorage.getItem('movies')) || [],
    addMovie: (movie) => {
        const movies = DB.getMovies();
        movie.id = Date.now().toString();
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies));
    },
    deleteMovie: (id) => {
        let movies = DB.getMovies();
        movies = movies.filter(movie => movie.id !== id);
        localStorage.setItem('movies', JSON.stringify(movies));
    }
};
const AuthDB = {
    getUsers: () => JSON.parse(localStorage.getItem('users')) || [],
    addUser: (user) => {
        const users = DB.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    },
};


