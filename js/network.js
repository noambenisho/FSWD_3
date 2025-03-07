const Network = {
    sendRequest: (method, url, data, callback) => {

        console.log(`Network: Sending ${method} request to ${url}`);

        const randomValue = Math.random();  // קבלת מספר רנדומלי בין 0 ל-1
        //if (randomValue < 0) {
        if (randomValue < 0.5) {
            callback({ status: 0, message: 'Failed to fetch' });
            return;
        }
        setTimeout(() => {
            if (url.startsWith('/api/movies')) {
                MovieServer.handleRequest(method, url, data, callback);
            } else if (url.startsWith('/api/auth')) {
                AuthServer.handleRequest(method, url, data, callback);
            } else {
                callback({ status: 404, message: 'Not Found' });
            }
            }, Math.random() * 2 + 1); // השהיה של 1-3 שניות
    }
};