import { Contract, Provider, ethers } from "ethers"
import { ChainDefinition } from "../config";
import { namehash } from "../utils/namehash";
import { AddressByNameResponse, BaseResolver, NameByAddressResponse } from "./baseResolver";
import ResolverABI from "../ABIs/resolver.abi.json"
import EnsABI from "../ABIs/ens.abi.json"

export default class EVMResolver extends BaseResolver {
    provider: Provider
    ens: Contract

    constructor(
        chain: ChainDefinition,
        rpc: string
    ) {
        super(chain, rpc)
        this.provider = new ethers.JsonRpcProvider(rpc)
        this.ens = new Contract(chain.nameServiceContract, EnsABI, this.provider)
    }

    getResolverContract(address: string) {
        return new Contract(address, ResolverABI, this.provider)
    }
    
    public async getNameByAddress(address: string): Promise<NameByAddressResponse> {
        const nameByAddressOneId: NameByAddressResponse = await super.getNameByAddress(address)
        // return OneID
        if (nameByAddressOneId.found) {
            return nameByAddressOneId
        }
        
        // resolve on-chain
        try {
            const reverseNode = `${address.slice(2)}.addr.reverse`
            const reverseNamehash = namehash(reverseNode)

            const resolverAddr: string = await this.ens.resolver(reverseNamehash)

            const Resolver = this.getResolverContract(resolverAddr)
            const name = await Resolver.name(reverseNamehash)
            if (name && name.length > 0) {
                return {
                    found: true,
                    name
                }
            }
        } catch(err) {
            return {
                found: false,
                err
            }
        }

        return {
            found: false
        }
    }

    public async getAddressByName(name: string): Promise<AddressByNameResponse> {
        return super.getAddressByName(name)
    }
}