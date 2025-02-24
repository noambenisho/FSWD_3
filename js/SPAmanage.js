// מחכה לטעינת העמוד ומגדיר ניתוב מתאים
document.addEventListener('DOMContentLoaded', () => {
    navigateTo(location.hash.slice(1) || 'login');
});

// מאזין לשינוי כתובת ה-URL
window.addEventListener('hashchange', () => {
    navigateTo(location.hash.slice(1) || 'login');
});

function navigateTo(page) {
    // הסתרת כל המסכים
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('registerPage').classList.add('hidden');
    document.getElementById('moviesPage').classList.add('hidden');

    // הצגת המסך הרלוונטי
    switch (page) {
        case 'register':
            document.getElementById('registerPage').classList.remove('hidden');
            break;
        case 'movies':
            if (currentUser) { // בודק אם יש משתמש מחובר
                document.getElementById('moviesPage').classList.remove('hidden');
                loadMovies();
            } else {
                alert("עליך להתחבר קודם");
                navigateTo('login');
            }
            break;
        default:
            document.getElementById('loginPage').classList.remove('hidden');
            break;
    }

    // עדכון ה-URL כדי לשקף את הניווט
    history.pushState(null, "", `#${page}`);
}

// // פונקציה להתחברות
// function loginUser(event) {
//     event.preventDefault();
//     const username = event.target[0].value;
//     const password = event.target[1].value;

//     if (username === "admin" && password === "1234") { // לדוגמה בלבד
//         currentUser = { username };
//         navigateTo('movies');
//     } else {
//         alert("שם משתמש או סיסמה שגויים");
//     }
// }

// פונקציה להרשמה
function registerUser(event) {
    event.preventDefault();
    alert('הרשמה בוצעה בהצלחה!');
    navigateTo('login');
}

// פונקציה להתנתקות
function logout() {
    currentUser = null;
    navigateTo('login');
}

// משתנה גלובלי לשמירת המשתמש המחובר
let currentUser = null;

// // פונקציה לטעינת סרטים
// function loadMovies() {
//     const movieList = document.getElementById('movie-list');
//     movieList.innerHTML = '';

//     const movies = [
//         { title: "סרט 1", description: "תיאור של סרט 1" },
//         { title: "סרט 2", description: "תיאור של סרט 2" },
//     ];

//     movies.forEach(movie => {
//         const div = document.createElement("div");
//         div.classList.add("movie-item");
//         div.innerHTML = `${movie.title} - ${movie.description}`;
//         movieList.appendChild(div);
//     });
// }

// // פונקציה להוספת סרט חדש
// function addMovie() {
//     const title = document.getElementById('movie-title').value;
//     if (title) {
//         alert(`הסרט "${title}" נוסף בהצלחה!`);
//         loadMovies();
//     }
// }