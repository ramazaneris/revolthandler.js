declare module "start" {
  import { Client } from "revolt.js";
  export default function start(prop: {
    client: Client;
    path?: string;
    prefix: string;
    owners: string[];
  }): void;
}
