import fs from "fs";
import { resolve } from "path";
import coloredConsole from "clcn";
import {revoltHandler} from '../revoltHandler'
const clcn = new coloredConsole();

export default function start(prop: any, handlerClient: any) {
  try {
    const commandsFolder: any = fs.readdirSync(prop.path);
    for (const folder of commandsFolder) {
      let commandFiles: any;
      let filetypesjs = fs
        .readdirSync(`${prop.path}/${folder}`)
        .filter((file: any) => file.endsWith(".js"));
      let filetypests = fs
        .readdirSync(`${prop.path}/${folder}`)
        .filter((file: any) => file.endsWith(".ts"));
      filetypests ? (commandFiles = filetypests) : (commandFiles = filetypesjs);
      for (const file of commandFiles) {
        const command = require(resolve(`${prop.path}/${folder}/${file}`));
        if (!command?.default?.name || !command?.default?.code) {
          clcn.log(
            "txt:red",
            `Failed Loaded command from ${resolve(
              prop.path + "/" + folder + "/" + file
            )} with revolthandler.js`
          );
        } else {
          clcn.log(
            "txt:blue",
            `Waking up '${command?.default?.name}' from ${resolve(
              prop.path + "/" + folder + "/" + file
            )} with revolthandler.js`
          );
          handlerClient.commands.set(command.default.name, command);
        }
      }
    }
    prop.client.on("message", (message: any) => {
      let owners = prop.owners;
      if (
        prop.client.users.get(message.author_id).bot ||
        !message.content.startsWith(prop.prefix) 
      )
        return;
      if (message.content.type) return;
      const args = message.content.slice(prop.prefix.length).trim().split(/ +/);
      revoltHandler(
        message,
        args,
        prop.client,
        handlerClient,
        owners
      );
    });
    clcn.log("txt:green", "revolthandler.js started");
  } catch (e: any) {
    console.log(new Error(e.message));
  }
}
