function addMovie() {
    let title = document.getElementById("movie-title").value;
    let year = document.getElementById("movie-year").value;
    let rating = document.getElementById("movie-rating").value;
    let image = document.getElementById("movie-poster").value;
    let adult = document.getElementById("movie-adult").checked;
    let genre = Array.from(document.querySelectorAll("#movie-genre input[name='genres']:checked")).map(checkbox => checkbox.value);
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
    const movieData = JSON.stringify({ name: title, year: year, rating: rating, image: image, adult: adult, genre: genre });
    request.send(movieData);
    document.getElementById("movie-title").value = "";
    document.getElementById("movie-year").value = "";
    document.getElementById("movie-rating").value = "";
    document.getElementById("movie-poster").value = "";         
    document.getElementById("movie-adult").checked = false;
    document.querySelectorAll("#movie-genre input[name='genres']:checked").forEach(checkbox => checkbox.checked = false);
}

// function loadMovies() {
//     const request = new FXMLHttpRequest();
//     request.open('GET', '/api/movies', true);
//     request.onload =  function() {
//         const moviesResponse = JSON.parse(request.responseText);
//         if (moviesResponse.status === 201 || moviesResponse.status === 200) {
//             const moviesList = document.getElementById('movie-list');
//             moviesList.innerHTML = '';
//             moviesResponse.message.forEach(movie => {
//                 const movieCard = document.createElement('div');
//                 movieCard.className = 'movie-card';
//                 movieCard.innerHTML = `
//                     <h3>${movie.name}</h3>
//                     <p>${movie.description}</p>
//                     <button onclick="deleteMovie('${movie.id}')">מחק</button>
//                     <button onclick="edit('${movie.id}')">עדכן</button>
//                     <button onclick="getMovie('${movie.id}')">הצגת בלעדית</button>
//                 `;
//                 moviesList.appendChild(movieCard);
//             });
//             alert('הסרטים עלו בהצלחה');
//         } else {
//             alert('שגיאה בהעלאת הסרטים.');
//         }
//     };
//     request.send();
// }

function deleteMovie(id) {
    const request = new FXMLHttpRequest();
    request.open('DELETE', `/api/movies/${id}`, true);
    request.onload = function() {
    const moviesResponse = JSON.parse(request.responseText);
    if (moviesResponse.status === 201 || moviesResponse.status === 200) {    
        alert('הסרט נמחק בהצלחה');
        uploadMovies();
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
    loadMovies();
});

function uploadMovies() {
    //Putting default movies into a rich initial state
    const isMoviesAreEmpty = localStorage.getItem("movies");
    if (!isMoviesAreEmpty) {
        const id = Date.now().toString();
        const movies = [
            {
              name: "Inception",
              year: 2010,
              image: "https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF894,1000_QL80_.jpg",
              genre: ["Sci-Fi", "Action"],
              ageRestriction: "PG-13",
              id: id,
            },
            {
              name: "The Dark Knight",
              year: 2008,
              image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
              genre: ["Action", "Crime", "Drama"],
              ageRestriction: "PG-13",
              id: id+1,
            },
            {
              name: "Interstellar",
              year: 2008,
              image: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg",
              genre: ["Action", "Crime", "Drama"],
              ageRestriction: "PG-13",
              id: id+2,
            }];
        localStorage.setItem("movies", JSON.stringify(movies));
    }    
    // const moviesGrid = document.getElementById("moviesGrid");
    // moviesGrid.innerHTML = "";
    // movies.forEach(movie => {
    //     const movieCard = document.createElement("div");
    //     movieCard.classList.add("movie-card");
    //     movieCard.innerHTML = `
    //         <img src="${movie.image}" alt="${movie.title}">
    //         <div class="movie-buttons">
    //             <button onclick="deleteMovie(${movie.id})"><i class="fas fa-trash"></i></button>
    //             <button onclick="getMovie('${movie.title}')"><i class="fas fa-info-circle"></i></button>
    //         </div>
    //     `;
    //     moviesGrid.appendChild(movieCard);
    // });

    const request = new FXMLHttpRequest();
    request.open('GET', '/api/movies', true);
    request.onload =  function() {
        const moviesResponse = JSON.parse(request.responseText);
        if (moviesResponse.status === 201 || moviesResponse.status === 200) {
            const moviesList = document.getElementById('moviesGrid');
            moviesList.innerHTML = '';
            moviesResponse.message.forEach(movie => {
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
            alert('הסרטים עלו בהצלחה');
        } else {
            alert('שגיאה בהעלאת הסרטים.');
        }
    };
    request.send();
}