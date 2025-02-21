const AuthServer = {
    handleRequest: (method, url, data, callback) => {
        const users = DB.getUsers();
        if (url.endsWith('/register') && method === 'POST') {
            const user = JSON.parse(data);
            if (users.some(u => u.username === user.username)) {
                callback({ status: 400, message: 'User already exists' });
            } else {
                DB.addUser(user);
                callback({ status: 201, message: 'User registered successfully' });
            }
        } else if (url.endsWith('/login') && method === 'POST') {
            const user = JSON.parse(data);
            const validUser = users.find(u => u.username === user.username && u.password === user.password);
            if (validUser) {
                callback({ status: 200, message: 'Login successful' });
            } else {
                callback({ status: 401, message: 'Invalid credentials' });
            }
        }
    }
};