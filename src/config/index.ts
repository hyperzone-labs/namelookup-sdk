import { CHAIN_TYPE as ONE_ID_CHAIN_TYPE } from "@oneid-xyz/base"

export interface ChainDefinition {
    resolverType: string
    oneIdChainType: ONE_ID_CHAIN_TYPE,
    nameServiceContract: string
}

interface ChainType {
    ETHEREUM: ChainDefinition
    BINANCE_SMART_CHAIN: ChainDefinition
    SOLANA: ChainDefinition
    VICTION: ChainDefinition
}

export const CHAIN_TYPE: ChainType = {
    ETHEREUM: {
        resolverType: "evm",
        oneIdChainType: ONE_ID_CHAIN_TYPE.ETHER,
        nameServiceContract: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    BINANCE_SMART_CHAIN: {
        resolverType: "evm",
        oneIdChainType: ONE_ID_CHAIN_TYPE.BINANCE_SMART,
        nameServiceContract: "0x08CEd32a7f3eeC915Ba84415e9C07a7286977956"
    },
    SOLANA: {
        resolverType: "solana",
        oneIdChainType: ONE_ID_CHAIN_TYPE.SOLANA,
        nameServiceContract: ""
    },
    VICTION: {
        resolverType: "evm",
        oneIdChainType: ONE_ID_CHAIN_TYPE.TOMO,
        nameServiceContract: ""
    },

} as const