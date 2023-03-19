function revoltHandler(
  message: any,
  args: any,
  client: any,
  handlerClient: any,
  owners: string[]
) {
  const commandName = args.shift().toLowerCase();
  const command =
    handlerClient.commands.get(commandName) ||
    handlerClient.commands.find(
      (cmd: any) =>
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
    if (command?.default?.onlyPerms) {
      let perms:string [] = command?.default?.onlyPerms?.perms
      if (!perms)
        return new Error("You must write at least one perm");
      if (
        !message.member.hasPermission(
          message.member.server,
          ...perms
        )
      ) {
        if (command?.default?.onlyPerms?.errorMsg) {
          return command.default?.onlyPerms.errorMsg(
            message,
            message.member,
            command?.default,
            perms
          );
        } else {
          return message.reply(
            `You must have \`${perms.join(",")}\` permission(s) to use this command`
          );
        }
      }
    }
    command?.default?.code(message, args, client);
  } catch (error) {
    console.error(error);
  }
}

export { revoltHandler };
