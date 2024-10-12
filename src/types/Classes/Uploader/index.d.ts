import { Client } from "revolt.js";

class Uploader {
    constructor(client: Client);
    upload(fileOrUrl: string, filename?: string): Promise<string>;
}
