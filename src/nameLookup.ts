import { CHAIN_TYPE } from "@oneid-xyz/inspect";
import { ChainDefinition } from "./config";
import { AddressByNameResponse, NameByAddressResponse } from "./resolvers/baseResolver";

class NameLookUp {
    resolver: any

    constructor(
        private readonly chain: ChainDefinition,
        private readonly rpc: string
    ) {
        if (!chain) {
            throw Error("Chain doesn't support")
        }

        this.resolver = null
    }

    async init() {
        const Resolver = await this.getResolver(this.chain.resolverType)
        this.resolver = new Resolver(this.chain, this.rpc)
        await this.resolver.initSystem()
    }


    async getNameByAddress(address: string): Promise<NameByAddressResponse> {
        return this.resolver.getNameByAddress(address)
    }

    async getAddressByName(name: string, chain?: CHAIN_TYPE): Promise<AddressByNameResponse> {
        return this.resolver.getAddressByName(name, chain)
    }

    private getResolver = async (resolverType: string): Promise<any> => {
        const { default: resolver } = await import(`./resolvers/${resolverType}`)

        return resolver;
    }
}

export {
    NameLookUp
}
