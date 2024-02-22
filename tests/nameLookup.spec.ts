import { NameLookUp, CHAIN_TYPE } from "../src"
import dotenv from "dotenv"

dotenv.config()

describe("Name Lookup", () => {
    let nameLookUp: NameLookUp

    beforeEach(async () => {
        nameLookUp = new NameLookUp(CHAIN_TYPE.VICTION, process.env.TEST_RPC || "")
        await nameLookUp.init()
    })

    it("resolver name", async () => {
        const address = await nameLookUp.getAddressByName("sang.c98")
        console.log(address)
    })
})
