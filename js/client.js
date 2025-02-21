function loadMovies() {
    const request = new FXMLHttpRequest();
    request.open('GET', '/api/movies', true);
    request.onload = () => {
        const movies = JSON.parse(request.responseText);
        const moviesList = document.getElementById('moviesList');
        moviesList.innerHTML = '';

        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <h3>${movie.name}</h3>
                <p>${movie.description}</p>
                <button onclick="deleteMovie('${movie.id}')">Delete</button>
            `;
            moviesList.appendChild(movieCard);
        });
    };
    request.send();
}

function addMovie(name, description) {
    const request = new FXMLHttpRequest();
    request.open('POST', '/api/movies', true);
    request.setRequestHeader('Content-Type', 'application/json');

    const movieData = JSON.stringify({ name, description });
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        if (response.status === 201) {
            alert('Movie added successfully!');
            loadMovies();
        } else {
            alert('Failed to add movie.');
        }
    };
    request.send(movieData);
}

function deleteMovie(id) {
    const request = new FXMLHttpRequest();
    request.open('DELETE', `/api/movies/${id}`, true);
    request.onload = () => {
        alert('Movie deleted successfully');
        loadMovies();
    };
    request.send();
}