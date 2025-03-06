const MoviesDB = {
    getMovies: () => {
        let movies = getCurrentUserNameMovies();
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
    loadDefaultMovies: (username) => {
        const userMoviesKey = `${username}Movie`;
        user = AuthDB.getUserByName(username);

        // Check if default movies were already loaded for this user
        if (user.default_movies_loaded) return;

        // Check if the user already has movies
        const existingMovies = JSON.parse(localStorage.getItem(userMoviesKey)) || [];
        if (existingMovies.length > 0) return;

        // Add 4 default movies
        const defaultMovies = [
            {
                name: "Juman",
                year: 2017,
                rating: 9,
                image: "https://m.media-amazon.com/images/M/MV5BZjI5MzdmODctYjA4NS00ZmMxLWJlOWUtOGVhMjA0OGMxMWYzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                genre: ["comedy", "action"],
                adult: true,
                id: Date.now().toString(),
            },
            {
                name: "The Dark Knight",
                year: 2008,
                rating: 8,
                image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                genre: ["action", "drama"],
                adult: false,
                id: (Date.now() + 1).toString(),
            },
            {
                name: "Garfield",
                year: 2024,
                rating: 10,
                image: "https://static.wikia.nocookie.net/filmguide/images/4/4a/The_Garfield_Movie_poster.jpg/revision/latest?cb=20240409042827",
                genre: ["comedy", "animation"],
                adult: false,
                id: (Date.now() + 2).toString(),
            },
            {
                name: "Smurfs",
                year: 2011,
                rating: 7,
                image: "https://m.media-amazon.com/images/M/MV5BNzQxNDYyNTQtYjg1OC00OGJiLTk2YjMtZjZjZDgwOWFlOTJjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
                genre: ["comedy", "animation"],
                adult: false,
                id: (Date.now() + 3).toString(),
            }
        ];

        // Save the movies
        localStorage.setItem(userMoviesKey, JSON.stringify(defaultMovies));

        // Mark that default movies were loaded
        AuthDB.updateUser(username, {default_movies_loaded: true});
    }
};


const AuthDB = {
    getUsers: () => JSON.parse(localStorage.getItem('users')) || [],
    addUser: (user) => {
        const users = AuthDB.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    },
    getUserByName: (username) => {
        const users = AuthDB.getUsers();
        return users.find(user => user.username === username) || null;
    },
    updateUser: (username, updatedFields) => {
        let users = AuthDB.getUsers();
        users = users.map(user => 
            user.username === username ? { ...user, ...updatedFields } : user
        );
        localStorage.setItem('users', JSON.stringify(users));
    }
};

function getCurrentUserNameMovies() {
    username = localStorage.getItem("currentUser")
    return key = `${username}Movie`;
} 
