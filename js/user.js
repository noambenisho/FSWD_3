// פונקציה להחלפת תצוגת דפים ב-SPA
function navigateTo(section) {
    document.querySelectorAll(".form-container").forEach(page => page.classList.add("hidden"));
    document.getElementById(section).classList.remove("hidden");
}

// פונקציה לרישום משתמשים
function registerUser(event) {
    event.preventDefault();

    const username = document.querySelector("#signup-form input[placeholder='Username']").value;
    const email = document.querySelector("#signup-form input[placeholder='Email']").value;
    const password = document.querySelector("#signup-form input[placeholder='Password']").value;

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const userData = JSON.parse(localStorage.getItem("userData")) || {};

    if (users[username]) {
        alert("Username already exists. Please choose a different one.");
        return;
    }

    users[username] = password;
    userData[username] = {
        email: email
    };

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("currentUser", username);

    alert("Registration successful! Redirecting...");
    navigateTo("moviesPage");
}

// פונקציה לעדכון הודעה למשתמש
function updateMessage(messageElement, message) {
    messageElement.innerHTML = message;
    messageElement.style.display = "block";
}

// פונקציה לנעילת משתמש לאחר ניסיונות כושלים
function handleLockout(username, failedAttempts, messageElement) {
    const interval = setInterval(() => {
        const now = Date.now();
        const remainingTime = Math.ceil((failedAttempts[username].lockUntil - now) / 1000);
        if (remainingTime > 0) {
            updateMessage(messageElement, `Too many failed attempts. Please try again in ${remainingTime} seconds.`);
        } else {
            failedAttempts[username].lockUntil = 0;
            localStorage.setItem("failedAttempts", JSON.stringify(failedAttempts));
            messageElement.innerHTML = "";
            messageElement.style.display = "none";
            clearInterval(interval);
        }
    }, 1000);
}

// פונקציה להתחברות משתמשים
function loginUser(event) {
    event.preventDefault();

    const usernameOrEmail = document.querySelector("#loginPage input[placeholder='Username or Email']").value;
    const password = document.querySelector("#loginPage input[placeholder='Password']").value;
    const messageElement = document.getElementById("login-message");

    const users = JSON.parse(localStorage.getItem("users")) || {};
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const failedAttempts = JSON.parse(localStorage.getItem("failedAttempts")) || {};

    const lockDuration = 2 * 60 * 100; 
    const now = Date.now();
    messageElement.innerHTML = "";

    const username = Object.keys(users).find(user => 
        user === usernameOrEmail || (userData[user] && userData[user].email === usernameOrEmail)
    );

    if (!username) {
        updateMessage(messageElement, "User does not exist. Please register first.");
        return;
    }

    if (failedAttempts[username] && failedAttempts[username].lockUntil > now) {
        handleLockout(username, failedAttempts, messageElement);
        return;
    }

    if (users[username] === password) {
        delete failedAttempts[username];
        localStorage.setItem("failedAttempts", JSON.stringify(failedAttempts));        
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("currentUser", username);
        navigateTo("moviesPage");
    } else {
        failedAttempts[username] = failedAttempts[username] || { count: 0, lockUntil: 0 };
        failedAttempts[username].count++;
        if (failedAttempts[username].count >= 3) {
            failedAttempts[username].lockUntil = now + lockDuration;
            failedAttempts[username].count = 0;
            updateMessage(messageElement, "Too many failed attempts. You are locked out for 2 minutes.");
            handleLockout(username, failedAttempts, messageElement);
        } else {
            updateMessage(messageElement, `Incorrect username or password. ${3 - failedAttempts[username].count} attempts remaining.`);
        }
        localStorage.setItem("failedAttempts", JSON.stringify(failedAttempts));
    }
}

// פונקציה להתנתקות
function logoutUser() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentSessionStart");
    navigateTo("loginPage");
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