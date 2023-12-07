import { CHAIN_TYPE } from "../config";
import { CHAIN_TYPE as ONE_ID_CHAIN_KEY } from "@oneid-xyz/base";

export const parseOneIDChainType = (selectedChain: string): ONE_ID_CHAIN_KEY => {
    switch (selectedChain) {
        case CHAIN_TYPE.ETHEREUM:
            return ONE_ID_CHAIN_KEY.ETHER
    
        default:
            return ONE_ID_CHAIN_KEY.ETHER
    }
}