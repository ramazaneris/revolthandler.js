"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revoltHandler = void 0;
function revoltHandler(message, args, client, handlerClient, owners) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const commandName = args.shift().toLowerCase();
    const command = handlerClient.commands.get(commandName) ||
        handlerClient.commands.find((cmd) => { var _a, _b; return ((_a = cmd === null || cmd === void 0 ? void 0 : cmd.default) === null || _a === void 0 ? void 0 : _a.aliases) && ((_b = cmd === null || cmd === void 0 ? void 0 : cmd.default) === null || _b === void 0 ? void 0 : _b.aliases.includes(commandName)); });
    try {
        if (!(command === null || command === void 0 ? void 0 : command.default))
            return;
        if ((_a = command === null || command === void 0 ? void 0 : command.default) === null || _a === void 0 ? void 0 : _a.ownerOnly) {
            if ((_b = command === null || command === void 0 ? void 0 : command.default) === null || _b === void 0 ? void 0 : _b.ownerOnly.status) {
                if (owners.includes(message.author_id) === false) {
                    if ((_c = command === null || command === void 0 ? void 0 : command.default) === null || _c === void 0 ? void 0 : _c.ownerOnly.errorMsg) {
                        return (_d = command === null || command === void 0 ? void 0 : command.default) === null || _d === void 0 ? void 0 : _d.ownerOnly.errorMsg(message, message.author, command === null || command === void 0 ? void 0 : command.default);
                    }
                    else {
                        return message.reply("You can not do this!");
                    }
                }
            }
        }
        if ((_e = command === null || command === void 0 ? void 0 : command.default) === null || _e === void 0 ? void 0 : _e.allowDM) {
            if (((_f = command === null || command === void 0 ? void 0 : command.default) === null || _f === void 0 ? void 0 : _f.allowDM.status) !== true) {
                if (client.channels.get(message.channel_id).server_id === null) {
                    if ((_g = command === null || command === void 0 ? void 0 : command.default) === null || _g === void 0 ? void 0 : _g.allowDM.errorMsg) {
                        return (_h = command === null || command === void 0 ? void 0 : command.default) === null || _h === void 0 ? void 0 : _h.allowDM.errorMsg(message, message.author, client);
                    }
                    else {
                        return message.reply("You can't use this command in dm");
                    }
                }
            }
        }
        if ((_j = command === null || command === void 0 ? void 0 : command.default) === null || _j === void 0 ? void 0 : _j.onlyPerms) {
            let perms = (_l = (_k = command === null || command === void 0 ? void 0 : command.default) === null || _k === void 0 ? void 0 : _k.onlyPerms) === null || _l === void 0 ? void 0 : _l.perms;
            if (!perms)
                return new Error("You must write at least one perm");
            if (!message.member.hasPermission(message.member.server, ...perms)) {
                if ((_o = (_m = command === null || command === void 0 ? void 0 : command.default) === null || _m === void 0 ? void 0 : _m.onlyPerms) === null || _o === void 0 ? void 0 : _o.errorMsg) {
                    return (_p = command.default) === null || _p === void 0 ? void 0 : _p.onlyPerms.errorMsg(message, message.member, command === null || command === void 0 ? void 0 : command.default, perms);
                }
                else {
                    return message.reply(`You must have \`${perms.join(",")}\` permission(s) to use this command`);
                }
            }
        }
        (_q = command === null || command === void 0 ? void 0 : command.default) === null || _q === void 0 ? void 0 : _q.code(message, args, client);
    }
    catch (error) {
        console.error(error);
    }
}
exports.revoltHandler = revoltHandler;
