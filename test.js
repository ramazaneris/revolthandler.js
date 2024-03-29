const { Client } = require("revolt.js");
const { Handler } = require("./src/index");
require("dotenv/config");
const bot = new Client();
const handler = new Handler({
  client: bot,
  prefix: "/",
  owners: ["01FCXFBQPYCBZWX40NSBYXYAWW"],
  path: "./tests/javascript",
});

bot.once("ready", () => {
  console.log("Bot ready!");
  handler.start()
});

bot.on("messageReactionAdd", (msg, userId, emote) => {
  console.log(msg);
  console.log(userId);
  console.log(emote);
});

bot.loginBot(`${process.env.BOT_TOKEN}`);
