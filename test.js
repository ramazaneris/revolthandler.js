"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const revolt_js_1 = require("revolt.js");
require("dotenv/config");
const index_1 = require("./src/dist/index");
var bot = new revolt_js_1.Client();
var handler = new index_1.Handler(bot, "!", ["01FCXFBQPYCBZWX40NSBYXYAWW"], "./commands/javascript");
bot.once("ready", () => {
    console.log("Bot ready!");
    handler.start();
});
bot.loginBot(`${process.env.BOT_TOKEN}`);
