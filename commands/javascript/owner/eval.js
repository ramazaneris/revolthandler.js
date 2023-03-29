"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "owner",
    ownerOnly: {
        status: true,
        errorMsg(msg, author, command) {
            msg.reply(`Heyy ${author.username} you can not use ${command.name} command`);
        },
    },
    code(msg, args, bot) {
        msg.reply("hello");
    },
};
