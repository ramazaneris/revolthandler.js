export default {
  name: "owner",
  ownerOnly: {
    status: true,
    errorMsg(msg: any, author: any,command:any) {
      msg.reply(`Heyy ${author.username} you can not use ${command.name} command`);
    },
  },
  code(msg: any, args: any, bot: any) {
    msg.reply("hello");
  },
};
