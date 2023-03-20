import revolt, { Client } from "revolt.js";
import "dotenv/config";
import { Handler } from "./src/types/index";
var bot = new Client();
var handler = new Handler({
  client: bot,
  prefix: "!",
  owners: ["01FCXFBQPYCBZWX40NSBYXYAWW"],
  path: "./commands/typescript",
});

bot.once("ready", () => {
  console.log("Bot ready!");
  handler.start();
});

bot.loginBot(`${process.env.BOT_TOKEN}`);
