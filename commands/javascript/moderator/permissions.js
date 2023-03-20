exports.default = {
  name: "perm",
  onlyPerms: { perms: ["KickMembers"] },
  code(msg, args, client) {
    msg.reply("hi");
  },
};
