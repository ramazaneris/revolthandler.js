const { resolve } = require("path");
const clcn = require("clcn");
const { revoltHandler } = require("../revoltHandler");
const { readdirSync } = require("fs");

function start(prop, handlerClient) {
  try {
    const commandsFolder = readdirSync(prop.path);
    for (const folder of commandsFolder) {
      let commandFiles = readdirSync(`${prop.path}/${folder}`).filter(
        (file) => file.endsWith(".js") || file.endsWith(".ts")
      );
      for (const file of commandFiles) {
        const command = require(resolve(`${prop.path}/${folder}/${file}`));
        if (!command?.default?.name || !command?.default?.code) {
          console.log(
            clcn.txtRed(
              `Failed Loaded command from ${resolve(
                prop.path + "/" + folder + "/" + file
              )} with revolthandler.js`
            )
          );
        } else {
          console.log(
            clcn.txtBlue(
              `Waking up '${command?.default?.name}' from ${resolve(
                prop.path + "/" + folder + "/" + file
              )} with revolthandler.js`
            )
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
    console.log(clcn.txtGreen("revolthandler.js started"));
  } catch (e) {
    console.log(new Error(e.message));
  }
}

module.exports = { start };
