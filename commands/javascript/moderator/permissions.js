exports.default = {
  name: "perm",
  onlyPerms: { perms: ["KickMembers"] },
  code(msg, args, client) {
    let perms = [""];
    console.log(typeof perms);
    msg.reply("hi");
  },
};
