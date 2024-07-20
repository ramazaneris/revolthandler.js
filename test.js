const { Client } = require("revolt.js");
const { Handler } = require("./src/index");
const { Uploader } = require("./src/index");

require("dotenv/config");
const bot = new Client();
const handler = new Handler({
    client: bot,
    prefix: "/",
    owners: ["01FCXFBQPYCBZWX40NSBYXYAWW"],
    path: "./tests",
});

bot.once("ready", () => {
    console.log("Bot ready!");
    handler.start();
});

bot.loginBot(`${process.env.BOT_TOKEN}`);
