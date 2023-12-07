import { expect } from "chai"
import { NameLookUp } from "../src"

describe("Name Lookup", () => {
    let nameLookUp: NameLookUp
    before(async () => {
        nameLookUp = await new NameLookUp("ethereum", "").init()
    })
    it("get name", async () => {
        const name = await nameLookUp.getNameByAddress("")

        expect(name).to.equal("terry.eth")
    })
})