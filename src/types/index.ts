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

interface Prop {
  client: any;
  prefix: string;
  owners: string[];
  path?: string;
}
class Handler {
  client: any;
  path: any;
  owners: string[];
  prefix: string;

  /**
   * @see {client:client,prefix:"!",owners:["id1","id2",...],path:"./commands"}
   **/
  constructor(props: Prop) {
    this.client = props.client;
    this.prefix = props.prefix;
    this.owners = props.owners;
    this.path = props.path || "./commands";
  }
  /**
   * Start the your handler
   * @see
   **/
  start() {
    start(this, handlerClient);
  }
}

export { Handler };
