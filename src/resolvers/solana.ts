import { ChainDefinition } from "../config";
import { AddressByNameResponse, BaseResolver, NameByAddressResponse } from "./baseResolver";

export default class SolanaResolver extends BaseResolver {
    constructor(
        chain: ChainDefinition,
        rpc: string
    ) {
        super(chain, rpc)
    }

    public async getNameByAddress(address: string): Promise<NameByAddressResponse> {
        return super.getNameByAddress(address)
    }

    public async getAddressByName(name: string): Promise<AddressByNameResponse> {
        return super.getAddressByName(name)
    }
}