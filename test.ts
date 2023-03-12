import revolt, { Client } from "revolt.js";
import "dotenv/config";
import { Handler } from "./src/types/index";
var bot = new Client();
var handler = new Handler(bot, "!", ["01FCXFBQPYCBZWX40NSBYXYAWW"],"./commands/typescript");

bot.once("ready", () => {
  console.log("Bot ready!");
  handler.start();
});

bot.loginBot(`${process.env.BOT_TOKEN}`);
