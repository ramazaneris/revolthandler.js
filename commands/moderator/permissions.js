"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "perm",
    onlyPerms: { perms: ["KickMembers", "ManageServer"] },
    code(msg, args, client) {
        msg.reply("hi");
    },
};
