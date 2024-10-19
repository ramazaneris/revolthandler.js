class Uploader {
    client;
    autumn;
    constructor(client) {
        this.client = client;
        this.autumn = client.configuration.features.autumn.url;
        return this;
    }
    upload(file, fileName = "uploaded") {
        let urlRegex =
            /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gi;

        if (String(file).match(urlRegex)) {
            return new Promise((resolve, reject) => {
                fetch(file, { method: "GET" })
                    .then((response) => response.blob())
                    .then((blob) => {
                        let form = new FormData();
                        form.append("file", blob, fileName);
                        fetch(`${this.autumn}/attachments`, {
                            method: "POST",
                            body: form,
                        })
                            .then((response) => response.json())
                            .then((json) => {
                                resolve(json.id);
                            });
                    });
            });
        } else {
            return new Promise((resolve, reject) => {
                const form = new FormData();
                form.append("file", new Blob([file]), fileName);
                fetch(`${this.autumn}/attachments`, {
                    method: "POST",
                    body: form,
                })
                    .then((response) => response.json())
                    .then((json) => {
                        resolve(json.id);
                    });
            });
        }
    }
}

module.exports = { Uploader };
