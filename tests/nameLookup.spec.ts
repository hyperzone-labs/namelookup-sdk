import { NameLookUp, CHAIN_TYPE } from "../src"

describe("Name Lookup", () => {
    let nameLookUp: NameLookUp

    beforeEach(async () => {
        nameLookUp = new NameLookUp(CHAIN_TYPE.SOLANA, "")
        await nameLookUp.init()
    })

    it("resolver name", async () => {
        const name = await nameLookUp.getNameByAddress("0x4FFF0f708c768a44050f9b96c46C265729D1a62f")
        console.log(name)
    })

    it("resolve linked wallet", async () => {
        const linkedWallet = await nameLookUp.getAddressByName("sansfg.c98")
        console.log(linkedWallet)
    })
})