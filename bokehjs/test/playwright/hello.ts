import {expect} from "../unit/assertions"
import axe from "axe-core"

it("dummy foobar", () => {
  expect(2).to.not.be.null
})

it("chiemezuo foobar", async () => {
  const result = await axe.run()

  expect(result).to.not.be.null
})
