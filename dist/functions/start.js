"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const clcn_1 = __importDefault(require("clcn"));
const revoltHandler_1 = require("../revoltHandler");
const clcn = new clcn_1.default();
function start(prop, handlerClient) {
    var _a, _b, _c;
    try {
        const commandsFolder = fs_1.default.readdirSync(prop.path);
        for (const folder of commandsFolder) {
            let commandFiles;
            let filetypesjs = fs_1.default
                .readdirSync(`${prop.path}/${folder}`)
                .filter((file) => file.endsWith(".js"));
            let filetypests = fs_1.default
                .readdirSync(`${prop.path}/${folder}`)
                .filter((file) => file.endsWith(".ts"));
            filetypests ? (commandFiles = filetypests) : (commandFiles = filetypesjs);
            for (const file of commandFiles) {
                const command = require((0, path_1.resolve)(`${prop.path}/${folder}/${file}`));
                if (!((_a = command === null || command === void 0 ? void 0 : command.default) === null || _a === void 0 ? void 0 : _a.name) || !((_b = command === null || command === void 0 ? void 0 : command.default) === null || _b === void 0 ? void 0 : _b.code)) {
                    clcn.log("txt:red", `Failed Loaded command from ${(0, path_1.resolve)(prop.path + "/" + folder + "/" + file)} with revolthandler.js`);
                }
                else {
                    clcn.log("txt:blue", `Waking up '${(_c = command === null || command === void 0 ? void 0 : command.default) === null || _c === void 0 ? void 0 : _c.name}' from ${(0, path_1.resolve)(prop.path + "/" + folder + "/" + file)} with revolthandler.js`);
                    handlerClient.commands.set(command.default.name, command);
                }
            }
        }
        prop.client.on("message", (message) => {
            let owners = prop.owners;
            if (prop.client.users.get(message.author_id).bot ||
                message.system ||
                !message.content.startsWith(prop.prefix))
                return;
            if (message.content.type)
                return;
            const args = message.content.slice(prop.prefix.length).trim().split(/ +/);
            (0, revoltHandler_1.revoltHandler)(message, args, prop.client, handlerClient, owners);
        });
        clcn.log("txt:green", "revolthandler.js started");
    }
    catch (e) {
        console.log(new Error(e.message));
    }
}
exports.default = start;
