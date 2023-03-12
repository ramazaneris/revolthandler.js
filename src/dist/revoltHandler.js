"use strict";
module.exports = (message, args, client, handlerClient, owners) => {
  const commandName = args.shift().toLowerCase();
  const command =
    handlerClient.commands.get(commandName) ||
    handlerClient.commands.find(
      (cmd) =>
        cmd?.default?.aliases && cmd?.default?.aliases.includes(commandName)
    );
  try {
    if (!command?.default) return;
    if (client.channels.get(message.channel_id).server_id === null)
      return message.reply(
        "> I don't support in dm groups\nPlease wait new updates for dm group"
      );
    if (command?.default?.ownerOnly) {
      if (command?.default?.ownerOnly.status) {
        if (owners.includes(message.author_id) === false) {
          if (command?.default?.ownerOnly.errorMsg) {
            return command?.default?.ownerOnly.errorMsg(
              message,
              message.author,
              command?.default
            );
          } else {
            return message.reply("You can not do this!");
          }
        }
      }
    }
    command?.default?.code(message, args, client);
  } catch (error) {
    console.error(error);
  }
};
