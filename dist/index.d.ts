export declare class Handler {
  constructor(props: Prop);

  start(): void;
}

interface Prop {
  client: any;
  prefix: string;
  owners: string[];
  path?: string;
}
