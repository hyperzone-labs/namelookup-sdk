import { BaseResolver } from "./baseResolver";

export class EVMResolver extends BaseResolver {
    constructor(
        network: string,
        rpc: string
    ) {
        super(network, rpc)
    }

    public async getNameByAddress(address: string): Promise<string> {
        return super.getNameByAddress(address)
    }

    public async getLinkedWallet(name: string): Promise<string> {
        return super.getLinkedWallet(name)
    }
}