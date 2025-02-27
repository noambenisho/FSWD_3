// // מחכה לטעינת העמוד ומגדיר ניתוב מתאים
// document.addEventListener('DOMContentLoaded', () => {
//     navigateTo(location.hash.slice(1) || 'login');
// });

// // מאזין לשינוי כתובת ה-URL
// window.addEventListener('hashchange', () => {
//     navigateTo(location.hash.slice(1) || 'login');
// });

// function navigateTo(page) {
//     // הסתרת כל המסכים
//     document.getElementById('loginPage').classList.add('hidden');
//     document.getElementById('registerPage').classList.add('hidden');
//     document.getElementById('moviesPage').classList.add('hidden');

//     // הצגת המסך הרלוונטי
//     switch (page) {
//         case 'register':
//             document.getElementById('registerPage').classList.remove('hidden');
//             break;
//         case 'movies':
//             if (currentUser) { // בודק אם יש משתמש מחובר
//                 document.getElementById('moviesPage').classList.remove('hidden');
//                 loadMovies();
//             } else {
//                 alert("עליך להתחבר קודם");
//                 navigateTo('login');
//             }
//             break;
//         default:
//             document.getElementById('loginPage').classList.remove('hidden');
//             break;
//     }

//     // עדכון ה-URL כדי לשקף את הניווט
//     history.pushState(null, "", `#${page}`);
// }

// // פונקציה להרשמה
// function registerUser(event) {
//     event.preventDefault();
//     alert('הרשמה בוצעה בהצלחה!');
//     navigateTo('login');
// }

// // פונקציה להתנתקות
// function logout() {
//     currentUser = null;
//     navigateTo('login');
// }

// // משתנה גלובלי לשמירת המשתמש המחובר
// let currentUser = null;