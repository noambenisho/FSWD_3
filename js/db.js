const MoviesDB = {
    
    getMovies: () => {
        movies = getCurrentUserNameMovies();
        return JSON.parse(localStorage.getItem(movies)) || []
    },
    addMovie: (movie) => {
        const movies = MoviesDB.getMovies();
        movie.id = Date.now().toString();
        movies.push(movie);
        nameList = getCurrentUserNameMovies();
        localStorage.setItem(nameList, JSON.stringify(movies));
    },
    deleteMovie: (id) => {
        let movies = MoviesDB.getMovies();
        movies = movies.filter(movie => movie.id !== id);
        nameList = getCurrentUserNameMovies();
        localStorage.setItem(nameList, JSON.stringify(movies));
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
        nameList = getCurrentUserNameMovies();
        localStorage.setItem(nameList, JSON.stringify(movies));
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


function getCurrentUserNameMovies() {
    username = localStorage.getItem("currentUser")
    return key = `${username}Movie`;
} 
