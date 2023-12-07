export abstract class BaseResolver {
    constructor(
        private readonly rpc: string
    ) {
    }

    abstract getNameByAddress(address: string): Promise<string>;

    async getNameByAddressOneId(address: string): Promise<string> {
        return "terry.c98"
    }
}