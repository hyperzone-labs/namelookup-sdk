import { OneID } from "@oneid-xyz/inspect"
import { parseOneIDChainType } from "../utils/parseOneIDChain"

export abstract class BaseResolver {
    oneId: OneID
    constructor(
        readonly network: string,
        readonly rpc: string
    ) {
        this.oneId = new OneID()
    }

    async initSystem() {
        await this.oneId.systemConfig.initConfig()
    }

    async getNameByAddress(address: string): Promise<string> {
        try {
            return await this.oneId.getPrimaryName(address)

        } catch(err) {
            return ""
        }
    }

    async getLinkedWallet(name: string): Promise<string> {
        try {
            const oneIdChain = parseOneIDChainType(this.network)
            const allLinkedWallets = await this.oneId.getWalletsByID(name, oneIdChain)

            return allLinkedWallets[0].address
        } catch(err) {
            return ""
        }
    }
}