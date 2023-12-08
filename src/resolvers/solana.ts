import { ChainDefinition } from "../config";
import { BaseResolver } from "./baseResolver";

export default class SolanaResolver extends BaseResolver {
    constructor(
        chain: ChainDefinition,
        rpc: string
    ) {
        super(chain, rpc)
    }

    public async getNameByAddress(address: string): Promise<string> {
        return super.getNameByAddress(address)
    }

    public async getLinkedWallet(name: string): Promise<string> {
        return super.getLinkedWallet(name)
    }
}