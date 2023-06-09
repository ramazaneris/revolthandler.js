declare class Handler {
  /**
   * {client:client,prefix:"!",owners:["id1","id2",...],path:"./commands"}
   * @see
   **/
  constructor(props: Prop);
  /**
   * Start the your handler
   * @see
   **/
  start(): void;
}

/**
 * alias
 * @see
 */
interface Prop {
  client: any;
  prefix: string;
  owners: string[];
  path?: string;
}

export { Handler };
