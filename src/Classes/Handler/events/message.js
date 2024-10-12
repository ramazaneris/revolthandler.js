const messageCreate = (handler, clientCommands) => {
    let { client, prefix } = handler;
    client.on("messageCreate", (message) => {
        let args = message.content.slice(prefix.length).trim().split(/ +/);
        let argsWithoutPrefix = message.content.trim().split(/ +/);
        let commandName = args.shift().toLowerCase();
        let commandNameWithoutPrefix = argsWithoutPrefix.shift();

        let command;

        if (clientCommands.has(commandName)) {
            command = clientCommands.get(commandName);
            if (command.nonPrefixed) {
                return;
            }
        } else if (clientCommands.has(commandNameWithoutPrefix)) {
            command = clientCommands.get(commandNameWithoutPrefix);
            if (!command.nonPrefixed) {
                return;
            }
        } else return;

        try {
            if (!command) return;
            if (command?.ownerOnly) {
                if (handler?.owners.includes(message.author.id)) return;
                if (command?.ownerOnly?.errorMessage) {
                    command.ownerOnly.errorMessage(message, args, client);
                    return;
                } else {
                    message.reply(
                        "You don't have permission to execute this command."
                    );
                    return;
                }
            }
            if (command?.guildOnly && !message.server?.id) {
                if (command?.guildOnly?.errorMessage) {
                    command.guildOnly.errorMessage(message, args, client);
                    return;
                } else {
                    message.reply("This command can only be used in servers.");
                    return;
                }
            }
            if (
                command?.permissions?.length > 0 ||
                command?.permissions?.perms?.length > 0
            ) {
                if (
                    !message.member.hasPermission(
                        message.channel,
                        ...(command.permissions || command.permissions.perms)
                    )
                ) {
                    if (command?.permissions?.errorMessage) {
                        command.permissions.errorMessage(
                            message,
                            args,
                            client,
                            command.permissions.perms
                        );
                        return;
                    } else {
                        message.reply(
                            "You don't have permission to execute this command."
                        );
                        return;
                    }
                }
            }
            command.code(message, args, handler.client);
        } catch (err) {
            console.error(err);
        }
    });
};

module.exports = {
    messageCreate,
};
