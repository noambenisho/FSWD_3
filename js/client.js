function addMovie() {
    let title = document.getElementById("movie-title").value;
    if (!title) return;

    const request = new FXMLHttpRequest();
    request.open('POST', '/api/movies', true);
    //request.setRequestHeader('Content-Type', 'application/json');

    const movieData = JSON.stringify({ name: title, description: 'סרט חדש' });
    // request.onload = () => {
    //     const response = JSON.parse(request.responseText);
    //     if (response.status === 201 || response.status === 200) {
    //         alert('הסרט נוסף בהצלחה!');
    //         loadMovies();
    //     } else {
    //         alert('שגיאה בהוספת הסרט.');
    //     }
    // };
    request.send(movieData);
    document.getElementById("movie-title").value = "";
}

function loadMovies() {
    const request = new FXMLHttpRequest();
    request.open('GET', '/api/movies', true);
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        const moviesList = document.getElementById('movie-list');
        moviesList.innerHTML = '';

        response.movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <h3>${movie.name}</h3>
                <p>${movie.description}</p>
                <button onclick="deleteMovie('${movie.id}')">מחק</button>
            `;
            moviesList.appendChild(movieCard);
        });
    };
    request.send();
}

function deleteMovie(id) {
    const request = new FXMLHttpRequest();
    request.open('DELETE', `/api/movies/${id}`, true);
    request.onload = () => {
        alert('הסרט נמחק בהצלחה');
        loadMovies();
    };
    request.send();
}
