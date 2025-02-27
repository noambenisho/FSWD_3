function addMovie() {
    let title = document.getElementById("movie-title").value;
    if (!title) return;

    const request = new FXMLHttpRequest();
    request.open('POST', '/api/movies', true);
    request.onload = function() {
        const response = JSON.parse(request.responseText);
        if (response.status === 201 || response.status === 200) {
            alert('הסרט נוסף בהצלחה!');
            loadMovies();
        } else {
            alert('שגיאה בהוספת הסרט.');
        }
      };
    const movieData = JSON.stringify({ name: title, description: 'סרט חדש' });
    request.send(movieData);
    document.getElementById("movie-title").value = "";
}

function loadMovies() {
    const request = new FXMLHttpRequest();
    request.open('GET', '/api/movies', true);
    request.onload =  function() {
        const moviesResponse = JSON.parse(request.responseText);
        if (moviesResponse.status === 201 || moviesResponse.status === 200) {
            const moviesList = document.getElementById('movie-list');
            moviesList.innerHTML = '';
            moviesResponse.message.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';
                movieCard.innerHTML = `
                    <h3>${movie.name}</h3>
                    <p>${movie.description}</p>
                    <button onclick="deleteMovie('${movie.id}')">מחק</button>
                    <button onclick="edit('${movie.id}')">עדכן</button>
                    <button onclick="getMovie('${movie.id}')">הצגת בלעדית</button>
                `;
                moviesList.appendChild(movieCard);
            });
            alert('הסרטים עלו בהצלחה');
        } else {
            alert('שגיאה בהעלאת הסרטים.');
        }
    };
    request.send();
}

function deleteMovie(id) {
    const request = new FXMLHttpRequest();
    request.open('DELETE', `/api/movies/${id}`, true);
    request.onload = function() {
    const moviesResponse = JSON.parse(request.responseText);
    if (moviesResponse.status === 201 || moviesResponse.status === 200) {    
        alert('הסרט נמחק בהצלחה');
        loadMovies();
    } else {
        alert('שגיאה בעת מחיקת הסרט');
    }
    };
    request.send();
}

function getMovie(id) {
    const request = new FXMLHttpRequest();
    request.open('GET', `/api/movies/${id}`, true);
    request.onload = function() {
        const moviesResponse = JSON.parse(request.responseText);
        if (moviesResponse.status === 201 || moviesResponse.status === 200) {    
            const movie = moviesResponse.message; // נניח שהסרט נמצא במפתח message
            const moviesList = document.getElementById('movie-list');
            moviesList.className = 'movie-card';
            moviesList.innerHTML = `            
            <h2>${movie.name}</h2>
            <p>${movie.description}</p>
            <button onclick="deleteMovie('${movie.id}')">מחק</button>
            <button onclick="edit('${movie.id}')">עדכן</button>
            <button onclick="getMovie('${movie.id}')">הצגת בלעדית</button>`;

            alert('הסרט עלה בהצלחה');
        } else {
            alert('שגיאה בעת העלאת הסרט');
        }
    };
    request.send();
}



document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('currentUser')) {
        navigateTo('moviesPage');
    } else {
        navigateTo('loginPage');        
    }
    uploadMovies();
});

function uploadMovies() {
    const movies = [
        { id: 1, title: "Inception", image: "https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg" },
        { id: 2, title: "Interstellar", image: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg" },
        { id: 3, title: "The Dark Knight", image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg" }
    ];

    const moviesGrid = document.getElementById("moviesGrid");
    moviesGrid.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-buttons">
                <button onclick="deleteMovie(${movie.id})"><i class="fas fa-trash"></i></button>
                <button onclick="getMovie('${movie.title}')"><i class="fas fa-info-circle"></i></button>
            </div>
        `;
        moviesGrid.appendChild(movieCard);
    });
}