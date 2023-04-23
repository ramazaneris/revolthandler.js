"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
  name: "withoutprefix",
  nonPrefixed: true,
  code(msg, args, client) {
    msg.reply("hello");
  },
};
