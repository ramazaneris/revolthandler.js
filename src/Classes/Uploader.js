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

    if (file.match(urlRegex)) {
      return new Promise((resolve, reject) => {
        fetch(file, { method: "GET" })
          .then((response) => response.blob())
          .then((blob) => {
            let form = new FormData();
            form.append("file", blob, {
              filename: fileName,
              name: "file",
            });
            console.log(form);
            fetch(`${this.autumn}/attachments`, { method: "POST", body: form })
              .then((response) => response.json())
              .then((json) => {
                resolve(json.id);
              });
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append("file", file, {
          filename: fileName,
          name: "file",
        });
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
