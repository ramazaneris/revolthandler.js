const { readdirSync, statSync } = require("fs");
const { resolve } = require("path");
const { messageCreate } = require("../events/message");
const clcn = require("clcn");
let clientCommands = new Map();

function init(handler, path) {
    try {
        function loadRoutes(handler, path) {
            let normalizedPathDir = "./" + path.replace(/^(\.\/|\/)?/, "");
            const commandsFolder = readdirSync(resolve(normalizedPathDir));
            commandsFolder.map((file) => {
                let fullRoute = `${normalizedPathDir}/${file}`;
                let fullPath = resolve(fullRoute);
                let stats = statSync(fullPath);

                if (stats.isDirectory()) {
                    loadRoutes(handler, `${path}/${file}`);
                } else {
                    let command = require(fullPath);
                    if (command.default.name && command.default.code) {
                        if (
                            typeof command.default.name === "object" &&
                            command.default.name.length > 0 &&
                            command.default.name.every(
                                (name) => typeof name === "string"
                            )
                        ) {
                            command.default.name.map((name) => {
                                clientCommands.set(name, command.default);
                                console.log(
                                    `Command ${clcn.bgCyan(
                                        '"' + name + '"'
                                    )} loaded from ${clcn.txtCyan(
                                        '"' +
                                            normalizedPathDir +
                                            "/" +
                                            file +
                                            '"'
                                    )}`
                                );
                            });
                            return;
                        } else if (typeof command.default.name === "string") {
                            clientCommands.set(
                                command.default.name,
                                command.default
                            );
                            console.log(
                                `Command ${clcn.bgBlue(
                                    '"' + command.default.name + '"'
                                )} loaded from ${clcn.txtBlue(
                                    '"' + normalizedPathDir + "/" + file + '"'
                                )}`
                            );
                        } else {
                            console.error(
                                `Command ${clcn.bgRed(
                                    '"' + command.default.name + '"'
                                )} from ${clcn.txtRed(
                                    '"' + normalizedPathDir + "/" + file + '"'
                                )} has an invalid name.`
                            );
                        }
                    } else {
                        console.error(
                            `Command from "${
                                normalizedPathDir + "/" + file
                            }" has an invalid name or code.`
                        );
                    }
                }
            });
        }

        loadRoutes(handler, path);
        messageCreate(handler, clientCommands);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { init };
