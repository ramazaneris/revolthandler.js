export default {
  name: "perm",
  onlyPerms: { perms: ["KickMembers"] },
  code(msg: any, args: any, client: any) {
    let perms = [""];
    console.log(typeof perms);
    msg.reply("hi");
  },
};
