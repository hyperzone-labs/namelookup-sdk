import { IService } from "./interfaces/IService";

class NameLookUp {
    constructor(
        private readonly network: string,
        private readonly rpc: string
    ) {
    }

    private async getNameByAddress(address: string): Promise<string> {
        return await (await this.getService(this.network)).getNameByAddress(address)
    }

    private getService = async (network: string): Promise<IService> => {
        const { default: service } = await import(`./services/${network}`)

        return service;
    }
}

export {
    NameLookUp
}
