import { OneID } from "@oneid-xyz/inspect"
import { ChainDefinition } from "../config"

export interface NameByAddressResponse {
    found: boolean,
    name?: string,
    err?: any
}

export interface AddressByNameResponse {
    found: boolean,
    address?: string
}

export abstract class BaseResolver {
    oneId: OneID
    constructor(
        readonly chain: ChainDefinition,
        readonly rpc: string
    ) {
        this.oneId = new OneID()
    }

    async initSystem() {
        await this.oneId.systemConfig.initConfig()
    }

    async getNameByAddress(address: string): Promise<NameByAddressResponse> {
        try {
            const name: string = await this.oneId.getPrimaryName(address)
            let found = false

            if (name && name.length > 0) {
                found = true
            }

            return {
                found,
                name
            }
        } catch(err) {
            return {
                found: false,
                err
            }
        }
    }

    async getAddressByName(name: string): Promise<AddressByNameResponse> {
        try {
            const allLinkedWallets = await this.oneId.getWalletsByID(name, this.chain.oneIdChainType)

            return {
                found: true,
                address: allLinkedWallets[0].address
            }
        } catch(err) {
            return {
                found: false
            }
        }
    }
}