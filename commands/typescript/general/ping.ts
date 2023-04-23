export default {
  name: "ping",
  aliases: ["delay"],
  code(msg: any, args: any, bot: any) {
    msg.reply("pong");
  },
};
