import fs from "fs";
import { Client } from "revolt.js";
import start from "./functions/start";

var handlerClient: any = {};
handlerClient.commands = new Map();

function find(fn: any, thisArg: any) {
  if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
  if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
  for (const [key, val] of handlerClient.commands) {
    if (fn(val, key, handlerClient.commands)) return val;
  }
  return void 0;
}

handlerClient.commands.find = find;
class Handler {
  client: any;
  path: string;
  owners: string[];
  prefix: string;
  constructor(
    client: any,
    prefix: string,
    owners: string[],
    path: string = "./commands"
  ) {
    this.client = client;
    this.prefix = prefix;
    this.owners = owners;
    this.path = path;
  }
  /**
   * Connect to the your handler
   * @see
   **/
  start() {
    start(this, handlerClient);
  }
}

export { Handler };
