import { CHAIN_TYPE, LinkedWallet } from "@oneid-xyz/inspect";

class NameLookUp {
    resolver: any

    constructor(
        private readonly network: string,
        private readonly rpc: string
    ) {
        this.resolver = null
    }

    async init() {
        const Resolver = await this.getResolver(this.network)
        this.resolver = new Resolver(this.network, this.rpc)
        await this.resolver.initSystem()
    }


    async getNameByAddress(address: string): Promise<string> {
        return this.resolver.getNameByAddress(address)
    }

    async getLinkedWallet(name: string, chain?: CHAIN_TYPE): Promise<LinkedWallet[]> {
        return this.resolver.getLinkedWallet(name, chain)
    }

    private getResolver = async (network: string): Promise<any> => {
        const { default: resolver } = await import(`./resolvers/${network}`)

        return resolver;
    }
}

export {
    NameLookUp
}
