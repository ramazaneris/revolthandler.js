const { init } = require("./functions/init");

class Handler {
    client;
    prefix;
    owners;
    path;
    constructor(opts) {
        this.client = opts.client;
        if (!this.client) throw new Error("client is required");
        this.prefix = opts.prefix;
        if (!this.prefix) throw new Error("prefix is required");
        this.owners = opts.owners || [];
        this.path = opts.path || "./commands";
        return this;
    }
    start() {
        init(this, this.path);
    }
}

module.exports = { Handler };
