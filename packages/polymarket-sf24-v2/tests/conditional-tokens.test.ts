import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { ConditionPreparation } from "../generated/schema"
import { ConditionPreparation as ConditionPreparationEvent } from "../generated/ConditionalTokens/ConditionalTokens"
import { handleConditionPreparation } from "../src/conditional-tokens"
import { createConditionPreparationEvent } from "./conditional-tokens-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let conditionId = Bytes.fromI32(1234567890)
    let oracle = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let questionId = Bytes.fromI32(1234567890)
    let outcomeSlotCount = BigInt.fromI32(234)
    let newConditionPreparationEvent = createConditionPreparationEvent(
      conditionId,
      oracle,
      questionId,
      outcomeSlotCount
    )
    handleConditionPreparation(newConditionPreparationEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ConditionPreparation created and stored", () => {
    assert.entityCount("ConditionPreparation", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ConditionPreparation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "conditionId",
      "1234567890"
    )
    assert.fieldEquals(
      "ConditionPreparation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oracle",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ConditionPreparation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "questionId",
      "1234567890"
    )
    assert.fieldEquals(
      "ConditionPreparation",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "outcomeSlotCount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
