import { IService } from "./interfaces/IService";

export default class NameLookUp {
    network: string
    rpc: string

    constructor(network: string, rpc: string) {
        this.network = network
        this.rpc = rpc
    }

    private async getNameByAddress(address: string): Promise<string> {
        return await (await this.getService(this.network)).getNameByAddress(address)
    }

    private async getService(network: string): Promise<IService> {
        const { default: service } = await import(`./services/${network}`)

        return service;
    }
}