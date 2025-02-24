const AuthServer = {
    handleRequest: (method, url, data, callback) => {
        const users = AuthDB.getUsers();
        
        if (url.endsWith('/register') && method === 'POST') {
            const user = JSON.parse(data);
            const usersArray = Object.values(users);

            // בדיקה אם המשתמש כבר קיים
            if (usersArray.some(u => u.username === user.username)) {
                callback({ status: 400, message: 'User already exists' });
            } else {
                AuthDB.addUser(user); // הוספת המשתמש לבסיס הנתונים
                callback({ status: 200, message: 'User registered successfully', success: true, username: user.username });
            }
        } else if (url.endsWith('/login') && method === 'POST') {
            // המרת הנתונים לאובייקט אחד (ולא מערך)
            const user = JSON.parse(data);

            // אם users הוא אובייקט, השתמש ב-Object.values כדי להמיר אותו למערך
            const usersArray = Object.values(users);
            
            // חיפוש המשתמש בנתונים
            const validUser = usersArray.find(u => u.username === user.username && u.password === user.password);
            if (validUser) {
                callback({ status: 200, message: 'Login successful' });
            } else {
                callback({ status: 401, message: 'Invalid credentials' });
            }
        } else if (url.endsWith('/logout') && method === 'POST') {
            callback({ status: 200, message: 'Logout successful', success: true });
        }
        
    }
};

const failedAttempts = {}; // מפת משתמשים שנכשלו

app.post("/login", (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const user = findUser(usernameOrEmail);

    if (!user) {
        return res.status(400).json({ success: false, message: "User does not exist." });
    }

    const now = Date.now();
    const lockDuration = 2 * 60 * 1000; // 2 דקות

    if (failedAttempts[user.username] && failedAttempts[user.username].lockUntil > now) {
        const remainingTime = Math.ceil((failedAttempts[user.username].lockUntil - now) / 1000);
        return res.status(403).json({ success: false, locked: true, remainingTime });
    }

    if (user.password === password) {
        delete failedAttempts[user.username]; // מאפסים ניסיונות כושלים
        return res.json({ success: true, username: user.username });
    } else {
        failedAttempts[user.username] = failedAttempts[user.username] || { count: 0, lockUntil: 0 };
        failedAttempts[user.username].count++;

        if (failedAttempts[user.username].count >= 3) {
            failedAttempts[user.username].lockUntil = now + lockDuration;
            failedAttempts[user.username].count = 0;
            return res.status(403).json({ success: false, locked: true, remainingTime: lockDuration / 1000 });
        } else {
            return res.status(401).json({
                success: false,
                message: `סיסמה שגויה. נותרו עוד ${3 - failedAttempts[user.username].count} ניסיונות.`,
            });
        }
    }
});