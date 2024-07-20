interface Prop {
    client: any;
    prefix: string;
    owners: string[];
    path?: string;
}

declare class Handler {
    /**
     * {client:client,prefix:"!",owners:["id1","id2",...],path:"./commands"}
     * @see
     **/
    constructor(props: {
        client: any;
        prefix: string;
        owners?: string[];
        path?: string;
    });
    /**
     * Start the your handler
     * @see
     **/
    start(): void;
}

export { Handler };
