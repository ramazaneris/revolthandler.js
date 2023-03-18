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
  - [OwnerOnly](#only-owner-command-example)
  - [PermsOnly](#only-perms-command-example)

## About

command handler for revolt.js bot project

## Badges

[![NPM Downloads](https://img.shields.io/npm/dt/revolthandler.js.svg?style=flat-square)](https://www.npmjs.com/package/revolthandler.js)

## Install

> npm i revolthandler.js

## Example

### Setup

CommonJS

```js
const revolt = require("revolt.js");
const client = new revolt.Client();
const revoltHandler = require("revolthandler.js");
const handler = new revoltHandler.Handler(
  client, //required
  "!", //required
  ["Your Revolt ID"], //required , optional add more owner Id
  "./commands" //optional, (default : "./commands")
);
client.once("ready", () => {
  handler.start();
});
client.loginBot("YOUR_BOT_TOKEN_HERE");
```

EsModule

```ts
//...
import {Handler} from 'revolthandler.js'
cosnt handler = new Handler(client,"!",["Your Revolt ID"],"./commands")
//...
```

### Standart using example

CommonJS

```js
//"./commands/general/ping.js"
exports.default = {
  name: "ping",
  description: "Ping!", //description :P
  //Be careful
  code(message, args, client) {
    //Your code here
    message.channel.sendMessage("Pong");
  },
};
```

EsModule

```ts
export default {
  name:"ping",
  description:"Ping!"
  code(message:any,args:string[],client:any){
    message.channel.sendMessage("Pong")
  }
}
```

### Aliases example

```js
//"./commands/general/ping.js"
exports.default = {
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
exports.default = {
  name: "test",
  aliases: ["eval"],
  ownerOnly: {
    status: true,
    errorMsg(message, author, command) {
      //optional
      message.reply("You can't use this command");
    },
  },
  code(message, args, client) {
    message.reply("pong");
  },
};
```

### Only perm(s) command example

```js
//"./commands/moderate/perm.js"
exports.default = {
  name: "perm",
  ownerPerms: {
    perms: ["KickMembers"], //You can see the perm names in : https://revolt.js.org/modules/permissions_definitions.html#Permission (onlyString)
    errorMsg(message, member, command, perms) {
      //optional
      message.reply(
        `You must have ${perms.join(",")} permission(s) to use this command`
      );
    },
  },
};
```

- [Come to my server](https://rvlt.gg/zrmFWtJz)

# Will add new features in the future

# revolthandler.js
