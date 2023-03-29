"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "in-dm",
    allowDM: {
        status: false,
        errorMsg(msg, author, client) {
            msg.reply("You can't use this here");
        },
    },
    code(msg, args, client) {
        msg.reply("hello in dm");
    },
};
