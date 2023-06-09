const revoltjs = require("revolt.js");
const { Handler } = require("./src/index");
require("dotenv/config");
const bot = new revoltjs.Client();
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
bot.loginBot(`${process.env.BOT_TOKEN}`);
