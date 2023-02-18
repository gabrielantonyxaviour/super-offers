import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { ExampleEntity } from "../generated/schema"
import { SuperClaimStopped } from "../generated/SuperOffers/SuperOffers"
import { handleSuperClaimStopped } from "../src/super-offers"
import { createSuperClaimStoppedEvent } from "./super-offers-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let offerId = BigInt.fromI32(234)
    let receiver = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let updatedAmount = BigInt.fromI32(234)
    let updatedFlowRate = BigInt.fromI32(234)
    let updatedTime = BigInt.fromI32(234)
    let newSuperClaimStoppedEvent = createSuperClaimStoppedEvent(
      offerId,
      receiver,
      updatedAmount,
      updatedFlowRate,
      updatedTime
    )
    handleSuperClaimStopped(newSuperClaimStoppedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExampleEntity created and stored", () => {
    assert.entityCount("ExampleEntity", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "offerId",
      "234"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "receiver",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "updatedAmount",
      "234"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "updatedFlowRate",
      "234"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "updatedTime",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
