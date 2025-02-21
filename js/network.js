const Network = {
    sendRequest: (method, url, headers, data, callback) => {
        console.log(`Network: Sending ${method} request to ${url}`);
        setTimeout(() => {
            if (url.startsWith('/api/movies')) {
                MovieServer.handleRequest(method, url, data, callback);
            } else if (url.startsWith('/api/auth')) {
                AuthServer.handleRequest(method, url, data, callback);
            } else {
                callback({ status: 404, message: 'Not Found' });
            }
        }, Math.random() * 2000 + 1000);  // השהיה של 1-3 שניות
    }
};