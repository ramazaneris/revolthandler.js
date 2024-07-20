export declare class Uploader {
    client: any;
    autumn: string;
    constructor(client: any);
    /**
     *
     * @param file must be an url or file buffer
     * @param filename should be a string
     */
    upload(file: string, filename?: string): Promise<void>;
}
