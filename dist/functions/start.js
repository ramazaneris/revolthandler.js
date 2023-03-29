const { resolve } = require("path");
const coloredConsole = require("clcn");
const { revoltHandler } = require("../revoltHandler");
const { readdirSync } = require("fs");
const clcn = new coloredConsole();

function start(prop, handlerClient) {
  try {
    const commandsFolder = readdirSync(prop.path);
    for (const folder of commandsFolder) {
      let commandFiles = readdirSync(`${prop.path}/${folder}`).filter((file) =>
        file.endsWith(".js") || file.endsWith(".ts")
      );
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
        prop.client.users.get(message.author_id).bot ||
        message.system ||
        !message.content.startsWith(prop.prefix)
      )
        return;
      if (message.content.type) return;
      const args = message.content.slice(prop.prefix.length).trim().split(/ +/);
      revoltHandler(message, args, prop.client, handlerClient, owners);
    });
    clcn.log("txt:green", "revolthandler.js started");
  } catch (e) {
    console.log(new Error(e.message));
  }
}

module.exports = { start };
