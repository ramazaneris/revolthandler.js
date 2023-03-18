"use strict";
exports.Handler = void 0;
const { start_1 } = require("./functions/start");
var handlerClient = {};
handlerClient.commands = new Map();
function find(fn, thisArg) {
  if (typeof fn !== "function") throw new TypeError(`${fn} is not a function`);
  if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
  for (const [key, val] of handlerClient.commands) {
    if (fn(val, key, handlerClient.commands)) return val;
  }
  return void 0;
}
handlerClient.commands.find = find;
class Handler {
  constructor(client, prefix, owners, path = "./commands") {
    this.client = client;
    this.prefix = prefix;
    this.owners = owners;
    this.path = path;
  }
  /**
   * Start the your handler
   * @see
   **/
  start() {
    start_1(this, handlerClient);
  }
}
exports.Handler = Handler;
