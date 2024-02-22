import { AbstractProvider, Contract, Provider, ethers } from "ethers"
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
        try {
            const nameByAddressOneId: NameByAddressResponse = await super.getNameByAddress(address)
            // return OneID
            if (nameByAddressOneId.found) {
                return nameByAddressOneId
            }

            // resolve on-chain
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
        
        // fallback
        return {
            found: false
        }
    }

    public async getAddressByName(name: string): Promise<AddressByNameResponse> {
        try {
            const addressByNameOneId: AddressByNameResponse = await super.getAddressByName(name)
            if (addressByNameOneId.found) {
                return addressByNameOneId
            }

            // resolve on-chain
            const nameHash = namehash(name)
            const resolverAddr = await this.ens.resolver(nameHash)
            if (parseInt(resolverAddr, 16) === 0) {
                throw "Address not found"
            }

            const resolver = new ethers.EnsResolver(this.provider as AbstractProvider, resolverAddr, name)
            const address = await resolver.getAddress()

            console.log(address)

            if (!address) {
                throw "Address not found"
            } else {
                return {
                    found: true,
                    address
                }
            }
        } catch (err) {
            return {
                found: false,
                err
            }
        }
    }
}