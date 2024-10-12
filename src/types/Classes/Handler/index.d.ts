import { Client } from "revolt.js";

declare class Handler {
    constructor(opts: {
        client: Client;
        prefix: string;
        owners?: string[];
        path?: string;
    });
    public start(): void;
}

export { Handler };
