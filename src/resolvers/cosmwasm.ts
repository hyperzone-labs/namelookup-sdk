import { ChainDefinition } from "../config";
import { BaseResolver } from "./baseResolver";

export default class CosmWasmResolver extends BaseResolver {
    constructor(
        chain: ChainDefinition,
        rpc: string
    ) {
        super(chain, rpc)
    }
}