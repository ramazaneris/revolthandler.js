function revoltHandler(message, client, handlerClient, owners, prefix) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdNamefNP = message.content.trim().split(/ +/).shift();
  const commandName = args.shift().toLowerCase();
  let command;

  let withPrefix =
    handlerClient.commands.get(commandName) ||
    handlerClient.commands.find(
      (cmd) =>
        cmd?.default?.aliases && cmd?.default?.aliases.includes(commandName)
    );
  let withOutPrefix =
    handlerClient.commands.get(cmdNamefNP) &&
    handlerClient.commands.get(cmdNamefNP)?.default?.nonPrefixed
      ? handlerClient.commands.get(cmdNamefNP)
      : undefined ||
        handlerClient.commands.find((cmd) =>
          cmd?.default?.aliases &&
          cmd?.default?.aliases.includes(cmdNamefNP) &&
          cmd?.default?.nonPrefixed
            ? cmd?.default?.aliases.includes(cmdNamefNP)
            : undefined
        );
  if (withPrefix) {
    command = withPrefix;
  } else if (withOutPrefix) {
    command = withOutPrefix;
  }
  console.log(command);
  try {
    if (!command?.default) return;
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
    if (command?.default?.allowDM) {
      if (command?.default?.allowDM.status !== true) {
        if (client.channels.get(message.channel_id).server_id === null) {
          if (command?.default?.allowDM.errorMsg) {
            return command?.default?.allowDM.errorMsg(
              message,
              message.author,
              client
            );
          } else {
            return message.reply("You can't use this command in dm");
          }
        }
      }
    }
    if (command?.default?.onlyPerms) {
      let perms = command?.default?.onlyPerms?.perms;
      if (!perms) return new Error("You must write at least one perm");
      if (!message.member.hasPermission(message.member.server, ...perms)) {
        if (command?.default?.onlyPerms?.errorMsg) {
          return command.default?.onlyPerms.errorMsg(
            message,
            message.member,
            command?.default,
            perms
          );
        } else {
          return message.reply(
            `You must have \`${perms.join(
              ","
            )}\` permission(s) to use this command`
          );
        }
      }
    }
    command?.default?.code(message, args, client);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { revoltHandler };
