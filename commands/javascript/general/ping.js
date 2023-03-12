"use strict";
exports.default = {
  name: "ping",
  aliases: ["ramco"],
  code(msg, args, bot) {
    msg.reply("pong");
  },
};
