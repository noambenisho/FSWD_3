window.addEventListener('hashchange', () => navigateTo(location.hash.slice(1)));
document.addEventListener('DOMContentLoaded', () => navigateTo(location.hash.slice(1) || 'login'));

function navigateTo(page) {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('registerPage').style.display = 'none';
    document.getElementById('moviesPage').style.display = 'none';

    switch (page) {
        case 'register':
            document.getElementById('registerPage').style.display = 'block';
            break;
        case 'movies':
            document.getElementById('moviesPage').style.display = 'block';
            loadMovies();
            break;
        default:
            document.getElementById('loginPage').style.display = 'block';
            break;
    }
}