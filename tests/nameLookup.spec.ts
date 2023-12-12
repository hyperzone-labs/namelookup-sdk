import { NameLookUp, CHAIN_TYPE } from "../src"
import dotenv from "dotenv"
dotenv.config()

describe("Name Lookup", () => {
    let nameLookUp: NameLookUp

    beforeEach(async () => {
        nameLookUp = new NameLookUp(CHAIN_TYPE.ETHEREUM, process.env.TEST_RPC || "")
        await nameLookUp.init()
    })

    it("resolver name", async () => {
        const name = await nameLookUp.getNameByAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045")
        console.log(name)
    })

    it("resolve linked wallet", async () => {
        const linkedWallet = await nameLookUp.getAddressByName("vitalik.eth")
    })
})
