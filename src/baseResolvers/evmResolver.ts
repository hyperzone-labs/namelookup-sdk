import { BaseResolver } from "./baseResolver";

export class EVMResolver extends BaseResolver {
    constructor(
        rpc: string
    ) {
        super(rpc)
    }

    public async getNameByAddress(address: string): Promise<string> {
        return "terry.eth"
    }
}