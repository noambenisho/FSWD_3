function addMovie() {
    let name = document.getElementById("movie-title").value;
    let year = document.getElementById("movie-year").value;
    let rating = document.getElementById("movie-rating").value;
    let image = document.getElementById("movie-poster").value;
    if (image.length < 10){
        image ="data:image/png;base64,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";

    }
    let adult = document.getElementById("movie-adult").checked;
    let genre = Array.from(document.querySelectorAll("#movie-genre input[name='genres']:checked")).map(checkbox => checkbox.value);
    if (!name) return;

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
    const movieData = JSON.stringify({ name: name, year: year, rating: rating, image: image, adult: adult, genre: genre });
    request.send(movieData);
    document.getElementById("movie-title").value = "";
    document.getElementById("movie-year").value = "";
    document.getElementById("movie-rating").value = "";
    document.getElementById("movie-poster").value = "";         
    document.getElementById("movie-adult").checked = false;
    document.querySelectorAll("#movie-genre input[name='genres']:checked").forEach(checkbox => checkbox.checked = false);
}

function deleteMovie(id) {
    const request = new FXMLHttpRequest();
    request.open('DELETE', `/api/movies/${id}`, true);
    request.onload = function() {
    const moviesResponse = JSON.parse(request.responseText);
    if (moviesResponse.status === 201 || moviesResponse.status === 200) {    
        // alert('הסרט נמחק בהצלחה');
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
            navigateTo('moviesManagementPage', 'update');
            document.getElementById("movie-title").value = moviesResponse.message.name;
            document.getElementById("movie-year").value = moviesResponse.message.year;
            document.getElementById("movie-rating").value = moviesResponse.message.rating;
            document.getElementById("movie-poster").value = moviesResponse.message.image;
            document.getElementById("movie-adult").checked = moviesResponse.message.adult;
            const selectedGenres = moviesResponse.message.genre;
            document.querySelectorAll("#movie-genre input[name='genres']").forEach(checkbox => {
                checkbox.checked = selectedGenres.includes(checkbox.value);
            });
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
    loadMovies();
});

function loadMovies() {
    //Putting default movies into a rich initial state
    const isMoviesAreEmpty = localStorage.getItem("movies");
    if (!isMoviesAreEmpty) {
        const id = Date.now().toString();
        const movies = [
            {
              name: "Inception",
              year: 2010,
              rating: 98,
              image: "https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg",
              genre: ["Sci-Fi", "Action"],
              adult: false,
              id: id,
            },
            {
              name: "The Dark Knight",
              year: 2008,
              rating: 85,
              image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
              genre: ["Action", "Crime", "Drama"],
              adult: false,
              id: id+1,
            },
            {
              name: "Interstellar",
              year: 2008,
              rating: 92,
              image: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg",
              genre: ["Action", "Crime", "Drama"],
              adult: false,
              id: id+2,
            }];
        localStorage.setItem("movies", JSON.stringify(movies));
    }    

    const request = new FXMLHttpRequest();
    request.open('GET', '/api/movies', true);
    request.onload = function() {
        const moviesResponse = JSON.parse(request.responseText);
        if (moviesResponse.status === 201 || moviesResponse.status === 200) {
            const moviesList = document.getElementById('moviesGrid');
            moviesList.innerHTML = '';

            moviesResponse.message.forEach(movie => {
                const movieCard = document.createElement("div");
                movieCard.classList.add("movie-card");
                movieCard.innerHTML = `
                    <img src="${movie.image}" alt="${movie.name}">
                    <div class="movie-buttons">
                        <button onclick="deleteMovie(${movie.id})"><i class="fas fa-trash"></i></button>
                        <button onclick="getMovie('${movie.id}')"><i class="fas fa-info-circle"></i></button>
                    </div>
                `;
                moviesList.appendChild(movieCard);
            });

            const addCard = document.createElement("div");
            addCard.classList.add("movie-card", "add-movie");
            addCard.innerHTML = `
                <button onclick="navigateTo('moviesManagementPage', 'add')" class="add-movie-btn">
                    <i class="fas fa-plus"></i>
                </button>
            `;
            moviesList.appendChild(addCard);

        } else {
            alert('שגיאה בהעלאת הסרטים.');
        }
    };
    request.send();
}

function editMovie(){
    let name = document.getElementById("movie-title").value;
    let year = document.getElementById("movie-year").value;
    let rating = document.getElementById("movie-rating").value;
    let image = document.getElementById("movie-poster").value;
    if (image.length < 10){
        image ="data:image/png;base64,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";

    }
    let adult = document.getElementById("movie-adult").checked;
    let genre = Array.from(document.querySelectorAll("#movie-genre input[name='genres']:checked")).map(checkbox => checkbox.value);
    const request = new FXMLHttpRequest();
    request.open('PUT', `/api/movies/${name}`, true);
    request.onload = function() {
        const moviesResponse = JSON.parse(request.responseText);
        if (moviesResponse.status === 201 || moviesResponse.status === 200) {    
            // alert('הסרט עודכן בהצלחה');
        } else {
            alert('שגיאה בעת עדכון הסרט');
        }
    };
    const movieData = JSON.stringify({ name: name, year: year, rating: rating, image: image, adult: adult, genre: genre });
    request.send(movieData);
}

