class FXMLHttpRequest {
    constructor() {
        this.method = '';
        this.url = '';
        this.async = true;
        this.headers = {};
        this.responseText = '';
        this.status = 0;  // נוסיף שדה סטטוס
        this.onload = null;
    }

    open(method, url, async = true) {
        this.method = method;
        this.url = url;
        this.async = async;
    }

    setRequestHeader(header, value) {
        this.headers[header] = value;
    }

    send(data = null) {
        Network.sendRequest(this.method, this.url, this.headers, data, (response) => {
            this.responseText = JSON.stringify(response);
            this.status = response.status || 200;  // נוסיף סטטוס נכון
            if (this.onload) this.onload();
        });
    }
}