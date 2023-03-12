"use strict";
const fs = require("fs");
const { resolve } = require("path");
const clcn_1 = require("clcn");
const clcn = new clcn_1();
const revoltHandler = require("../revoltHandler")
function start_1(prop, handlerClient) {
  try {
    const commandsFolder = fs.readdirSync(prop.path);
    for (const folder of commandsFolder) {
      let commandFiles;
      let filetypesjs = fs
        .readdirSync(`${prop.path}/${folder}`)
        .filter((file) => file.endsWith(".js"));
      let filetypests = fs
        .readdirSync(`${prop.path}/${folder}`)
        .filter((file) => file.endsWith(".ts"));
      filetypesjs ? (commandFiles = filetypesjs) : (commandFiles = filetypests);
      for (const file of commandFiles) {
        const command = require(resolve(`${prop.path}/${folder}/${file}`));
        if (!command?.default?.name || !command?.default?.code) {
          clcn.log(
            "txt:red",
            `Failed Loaded command from ${resolve(
              prop.path + "/" + folder + "/" + file
            )} with revolthandler.js`
          );
        } else {
          clcn.log(
            "txt:blue",
            `Waking up '${command?.default?.name}' from ${resolve(
              prop.path + "/" + folder + "/" + file
            )} with revolthandler.js`
          );
          handlerClient.commands.set(command.default.name, command);
        }
      }
    }
    prop.client.on("message", (message) => {
      let owners = prop.owners;
      if (
        !message.content.startsWith(prop.prefix) ||
        prop.client.users.get(message.author_id).bot
      )
        return;
      if (message.content.type) return;
      const args = message.content.slice(prop.prefix.length).trim().split(/ +/);
      revoltHandler(
        message,
        args,
        prop.client,
        handlerClient,
        owners
      );
    });
    clcn.log("txt:green", "revolthandler.js started");
  } catch (e) {
    console.log(new Error(e.message));
  }
}

module.exports = { start_1 };
