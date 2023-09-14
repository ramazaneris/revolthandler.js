import { Client, Message } from "revolt.js/lib/esm";
const { Handler } = require("./src/index");
require("dotenv/config");
const bot = new Client({});
var handler = new Handler({
  client: bot,
  prefix: "!",
  owners: ["01FCXFBQPYCBZWX40NSBYXYAWW"],
  path: "./tests/javascript",
});
bot.once("ready", () => {
  handler.start();
  console.log("Bot ready!");
});

bot.on("messageCreate", (msg: Message) => {
  console.log(msg.authorId);
});

bot.loginBot(`${process.env.BOT_TOKEN}`);
