# revolthandler.js

## Description

Easy command handling for revolt.js

## Table of contents

- [About](#about)
- [Installation](#install)
- [Example Usage](#example)
  - [Setup](#setup)
  - [Standart](#standart-using-example)
  - [Aliases](#aliases-example)

## About

command handler for revolt.js bot project

## Install

> npm i revolthandler.js

## Example

### Setup

```js
const revolt = require("revolt.js");
const client = new revolt.Client();
const revoltHandler = require("revolthandler.js");
const handler = new revoltHandler.Handler({
  client: client, //required
  prefix: "!", //required
  folder: "./commands", //optional, (default : "./commands")
  owners: ["Your ID"], //required , optional add more owner Id
});
client.once("ready", () => {
  handler.start();
});
client.loginBot("YOUR_BOT_TOKEN_HERE");
```

### Standart using example

```js
//"./commands/general/ping.js"
module.exports = {
  name: "ping",
  description: "Ping!", //description :P
  //Be careful
  code(message, args, client) {
    //Your code here
    message.channel.sendMessage("Pong");
  },
};
```

### Aliases example

```js
//"./commands/general/ping.js"
module.exports = {
  name: "ping",
  aliases: ["delay"],
  description: "Ping!", //description :P
  //Be careful
  code(message, args, client) {
    //Your code here
    message.channel.sendMessage("Pong");
  },
};
```

### Only owner command example

```js
//"./commands/owner/test.js"
module.exports = {
  name: "test",
  aliases: ["eval"],
  ownerOnly: {
    status: true,
    errorMsg(message, author, command) {
      message.reply("You don't use this command");
    },
  },
  code(message, args, client) {
    message.reply("pong");
  },
};
```


- [Come to my server](https://rvlt.gg/zrmFWtJz)

# Will add new features in the future
# revolthandler.js
