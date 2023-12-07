import { BaseResolver } from "./baseResolvers/baseResolver";

class NameLookUp {
    resolver: any

    constructor(
        private readonly network: string,
        private readonly rpc: string
    ) {
        this.resolver = null
    }

    async init(): Promise<NameLookUp> {
        const Resolver = await this.getResolver(this.network)
        this.resolver = new Resolver(this.rpc)

        return this
    }


    async getNameByAddress(address: string): Promise<string> {
        return await this.resolver.getNameByAddress(address)
    }

    private getResolver = async (network: string): Promise<any> => {
        const { default: resolver } = await import(`./resolvers/${network}`)

        return resolver;
    }
}

export {
    NameLookUp
}
