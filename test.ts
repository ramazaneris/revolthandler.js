import { Client } from "revolt.js";
import "dotenv/config";
import { Handler } from "./dist/index";
var bot = new Client();
var handler = new Handler({
  client: bot,
  prefix: "!",
  owners: ["01FCXFBQPYCBZWX40NSBYXYAWW"],
  path: "./commands",
});

bot.on("ready", () => {
  console.log("Bot ready!");
  handler.start();
});

bot.loginBot(`${process.env.BOT_TOKEN}`);
