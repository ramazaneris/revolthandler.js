const { Client } = require("revolt.js");
const { Handler, EmbedBuilder } = require("./src/index.js");
const { config } = require("dotenv");
config();

const client = new Client({ debug: false });
const handler = new Handler({
    client: client,
    prefix: "!",
    owners: [],
});

client.on("ready", () => {
    console.log("Ready");
    handler.start();
});

client.loginBot(`${process.env.BOT_TOKEN}`);
