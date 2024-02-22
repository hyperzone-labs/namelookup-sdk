import { CHAIN_TYPE as ONE_ID_CHAIN_TYPE } from "@oneid-xyz/base"

export interface ChainDefinition {
    resolverType: string
    oneIdChainType: ONE_ID_CHAIN_TYPE
}

interface ChainType {
    ETHEREUM: ChainDefinition
    BINANCE_SMART_CHAIN: ChainDefinition
    SOLANA: ChainDefinition
}

export const CHAIN_TYPE: ChainType = {
    ETHEREUM: {
        resolverType: "evm",
        oneIdChainType: ONE_ID_CHAIN_TYPE.ETHER,
    },
    BINANCE_SMART_CHAIN: {
        resolverType: "evm",
        oneIdChainType: ONE_ID_CHAIN_TYPE.BINANCE_SMART,
    },
    SOLANA: {
        resolverType: "solana",
        oneIdChainType: ONE_ID_CHAIN_TYPE.SOLANA,
    }
} as const