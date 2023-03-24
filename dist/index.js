"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const start_1 = __importDefault(require("./functions/start"));
var handlerClient = {};
handlerClient.commands = new Map();
function find(fn, thisArg) {
    if (typeof fn !== "function")
        throw new TypeError(`${fn} is not a function`);
    if (typeof thisArg !== "undefined")
        fn = fn.bind(thisArg);
    for (const [key, val] of handlerClient.commands) {
        if (fn(val, key, handlerClient.commands))
            return val;
    }
    return void 0;
}
handlerClient.commands.find = find;
class Handler {
    /**
     * @see {client:client,prefix:"!",owners:["id1","id2",...],path:"./commands"}
     **/
    constructor(props) {
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
        (0, start_1.default)(this, handlerClient);
    }
}
exports.Handler = Handler;
