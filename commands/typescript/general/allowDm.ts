export default {
  name: "in-dm",
  allowDM: {
    status: false,
    errorMsg(msg: any, author: any, client: any) {
      msg.reply("You can't use this here");
    },
  },
  code(msg: any, args: any, client: any) {
    msg.reply("hello in dm");
  },
};
