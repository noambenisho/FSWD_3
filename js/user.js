// פונקציה להחלפת תצוגת דפים ב-SPA
function navigateTo(section, type = "") {
    const page = document.getElementById(section);
    if (!page) {
        console.error(`Error: Page '${section}' not found.`);
        return;
    }

    if (section === "moviesPage") {
        document.getElementById("background").style.display = "none";
    } else {
        document.getElementById("background").style.display = "block";
    }

    if (section === "moviesManagementPage") {              
        if (type === "add") {
            document.getElementById("addBtn").style.display = "";
            document.getElementById("editBtn").style.display = "none";
            document.getElementById("movie-title").value = "";
            document.getElementById("movie-year").value = "";
            document.getElementById("movie-rating").value = "";
            document.getElementById("movie-poster").value = "";         
            document.getElementById("movie-adult").checked = false;
            document.querySelectorAll("#movie-genre input[name='genres']:checked").forEach(checkbox => checkbox.checked = false);
        } else if (type === "update") {
            document.getElementById("addBtn").style.display = "none";
            document.getElementById("editBtn").style.display = "";
        }
    }

    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    page.classList.remove("hidden");
}

// מחכה לטעינת העמוד ומגדיר ניתוב מתאים
document.addEventListener('DOMContentLoaded', () => {
    navigateTo(location.hash.slice(1) || 'login');
});

// מאזין לשינוי כתובת ה-URL
window.addEventListener('hashchange', () => {
    navigateTo(location.hash.slice(1) || 'login');
});

// פונקציה לרישום משתמשים
function registerUser(event) {
    event.preventDefault();

    const username = document.querySelector("#signup-form input[placeholder='Username']").value;
    const email = document.querySelector("#signup-form input[placeholder='Email']").value;
    const password = document.querySelector("#signup-form input[placeholder='Password']").value;
    const age = document.querySelector("#signup-form input[placeholder='Enter your age']").value;
    const gender = document.querySelector("#gender-toggle").checked ? "Female" : "Male";
    const genres = Array.from(document.querySelectorAll("#signup-form input[name='genres']:checked")).map(checkbox => checkbox.value);

    const requestData = { username, email, password, age, gender, genres };

    const xhr = new FXMLHttpRequest();
    xhr.open("POST", "/api/auth/register");
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && response.success) {
            localStorage.setItem("currentUser", response.username);
            alert("Registration successful! Redirecting...");
            navigateTo("moviesPage");
        } else {
            alert(response.message);
        }
    };
    xhr.send(JSON.stringify(requestData));
}

// פונקציה לעדכון הודעה למשתמש
function updateMessage(messageElement, message) {
    messageElement.innerHTML = message;
    messageElement.style.display = "block";
}

function loginUser(event) {
    event.preventDefault();

    const username = document.querySelector("#loginPage input[placeholder='Username']").value;
    const password = document.querySelector("#loginPage input[placeholder='Password']").value;
    const messageElement = document.getElementById("login-message");

    const requestData = { username, password };

    const xhr = new FXMLHttpRequest();
    xhr.open("POST", "/api/auth/login");
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);

        if (xhr.status === 403 && response.remainingTime) {
            // קריאה לפונקציה שתעדכן את זמן החסימה בצד הלקוח
            handleLoginResponse(response);
        } else if (xhr.status === 200 && response.success) {
            // התחברות מוצלחת - שמירת המשתמש והפניה לעמוד הסרטים
            localStorage.setItem("currentUser", response.username);
            messageElement.style.display = "none";
            navigateTo("moviesPage");
        } else {
            // התחברות נכשלה - הצגת הודעה על ניסיונות כושלים
            updateMessage(messageElement, response.message);
        }
    };
    xhr.send(JSON.stringify(requestData));
}

// פונקציה שמעדכנת את המשתמש על הזמן שנותר לנעילה
function handleLoginResponse(response) {
    if (response.status === 403 && response.remainingTime) {
        let remainingTime = response.remainingTime;
        
        // עדכון ראשוני של ההודעה
        document.getElementById("login-message").innerText = `User locked. Try again in ${remainingTime} seconds.`;

        const countdown = setInterval(() => {
            remainingTime--;
            document.getElementById("login-message").innerText = `User locked. Try again in ${remainingTime} seconds.`;

            if (remainingTime <= 0) {
                clearInterval(countdown);
                document.getElementById("login-message").innerText = "You can try logging in now.";
            }
        }, 1000);
    }
}

function logoutUser() {
    const xhr = new FXMLHttpRequest();
    xhr.open("POST", "/api/auth/logout");
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status === 200 && response.success) {
            localStorage.removeItem("currentUser");
            navigateTo("loginPage");
        } else {
            alert("Logout failed. Please try again.");
        }
    };
    xhr.send();
}

// אתחול דף לפי סטטוס המשתמש
document.addEventListener("DOMContentLoaded", function() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        navigateTo("moviesPage");
    } else {
        navigateTo("loginPage");
    }
});