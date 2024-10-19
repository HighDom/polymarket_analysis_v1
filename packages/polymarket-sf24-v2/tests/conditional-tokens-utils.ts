import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ConditionPreparation,
  ConditionResolution,
  PositionSplit,
  PositionsMerge,
  PayoutRedemption,
  TransferSingle,
  TransferBatch,
  ApprovalForAll,
  URI
} from "../generated/ConditionalTokens/ConditionalTokens"

export function createConditionPreparationEvent(
  conditionId: Bytes,
  oracle: Address,
  questionId: Bytes,
  outcomeSlotCount: BigInt
): ConditionPreparation {
  let conditionPreparationEvent = changetype<ConditionPreparation>(
    newMockEvent()
  )

  conditionPreparationEvent.parameters = new Array()

  conditionPreparationEvent.parameters.push(
    new ethereum.EventParam(
      "conditionId",
      ethereum.Value.fromFixedBytes(conditionId)
    )
  )
  conditionPreparationEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )
  conditionPreparationEvent.parameters.push(
    new ethereum.EventParam(
      "questionId",
      ethereum.Value.fromFixedBytes(questionId)
    )
  )
  conditionPreparationEvent.parameters.push(
    new ethereum.EventParam(
      "outcomeSlotCount",
      ethereum.Value.fromUnsignedBigInt(outcomeSlotCount)
    )
  )

  return conditionPreparationEvent
}

export function createConditionResolutionEvent(
  conditionId: Bytes,
  oracle: Address,
  questionId: Bytes,
  outcomeSlotCount: BigInt,
  payoutNumerators: Array<BigInt>
): ConditionResolution {
  let conditionResolutionEvent = changetype<ConditionResolution>(newMockEvent())

  conditionResolutionEvent.parameters = new Array()

  conditionResolutionEvent.parameters.push(
    new ethereum.EventParam(
      "conditionId",
      ethereum.Value.fromFixedBytes(conditionId)
    )
  )
  conditionResolutionEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )
  conditionResolutionEvent.parameters.push(
    new ethereum.EventParam(
      "questionId",
      ethereum.Value.fromFixedBytes(questionId)
    )
  )
  conditionResolutionEvent.parameters.push(
    new ethereum.EventParam(
      "outcomeSlotCount",
      ethereum.Value.fromUnsignedBigInt(outcomeSlotCount)
    )
  )
  conditionResolutionEvent.parameters.push(
    new ethereum.EventParam(
      "payoutNumerators",
      ethereum.Value.fromUnsignedBigIntArray(payoutNumerators)
    )
  )

  return conditionResolutionEvent
}

export function createPositionSplitEvent(
  stakeholder: Address,
  collateralToken: Address,
  parentCollectionId: Bytes,
  conditionId: Bytes,
  partition: Array<BigInt>,
  amount: BigInt
): PositionSplit {
  let positionSplitEvent = changetype<PositionSplit>(newMockEvent())

  positionSplitEvent.parameters = new Array()

  positionSplitEvent.parameters.push(
    new ethereum.EventParam(
      "stakeholder",
      ethereum.Value.fromAddress(stakeholder)
    )
  )
  positionSplitEvent.parameters.push(
    new ethereum.EventParam(
      "collateralToken",
      ethereum.Value.fromAddress(collateralToken)
    )
  )
  positionSplitEvent.parameters.push(
    new ethereum.EventParam(
      "parentCollectionId",
      ethereum.Value.fromFixedBytes(parentCollectionId)
    )
  )
  positionSplitEvent.parameters.push(
    new ethereum.EventParam(
      "conditionId",
      ethereum.Value.fromFixedBytes(conditionId)
    )
  )
  positionSplitEvent.parameters.push(
    new ethereum.EventParam(
      "partition",
      ethereum.Value.fromUnsignedBigIntArray(partition)
    )
  )
  positionSplitEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return positionSplitEvent
}

export function createPositionsMergeEvent(
  stakeholder: Address,
  collateralToken: Address,
  parentCollectionId: Bytes,
  conditionId: Bytes,
  partition: Array<BigInt>,
  amount: BigInt
): PositionsMerge {
  let positionsMergeEvent = changetype<PositionsMerge>(newMockEvent())

  positionsMergeEvent.parameters = new Array()

  positionsMergeEvent.parameters.push(
    new ethereum.EventParam(
      "stakeholder",
      ethereum.Value.fromAddress(stakeholder)
    )
  )
  positionsMergeEvent.parameters.push(
    new ethereum.EventParam(
      "collateralToken",
      ethereum.Value.fromAddress(collateralToken)
    )
  )
  positionsMergeEvent.parameters.push(
    new ethereum.EventParam(
      "parentCollectionId",
      ethereum.Value.fromFixedBytes(parentCollectionId)
    )
  )
  positionsMergeEvent.parameters.push(
    new ethereum.EventParam(
      "conditionId",
      ethereum.Value.fromFixedBytes(conditionId)
    )
  )
  positionsMergeEvent.parameters.push(
    new ethereum.EventParam(
      "partition",
      ethereum.Value.fromUnsignedBigIntArray(partition)
    )
  )
  positionsMergeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return positionsMergeEvent
}

export function createPayoutRedemptionEvent(
  redeemer: Address,
  collateralToken: Address,
  parentCollectionId: Bytes,
  conditionId: Bytes,
  indexSets: Array<BigInt>,
  payout: BigInt
): PayoutRedemption {
  let payoutRedemptionEvent = changetype<PayoutRedemption>(newMockEvent())

  payoutRedemptionEvent.parameters = new Array()

  payoutRedemptionEvent.parameters.push(
    new ethereum.EventParam("redeemer", ethereum.Value.fromAddress(redeemer))
  )
  payoutRedemptionEvent.parameters.push(
    new ethereum.EventParam(
      "collateralToken",
      ethereum.Value.fromAddress(collateralToken)
    )
  )
  payoutRedemptionEvent.parameters.push(
    new ethereum.EventParam(
      "parentCollectionId",
      ethereum.Value.fromFixedBytes(parentCollectionId)
    )
  )
  payoutRedemptionEvent.parameters.push(
    new ethereum.EventParam(
      "conditionId",
      ethereum.Value.fromFixedBytes(conditionId)
    )
  )
  payoutRedemptionEvent.parameters.push(
    new ethereum.EventParam(
      "indexSets",
      ethereum.Value.fromUnsignedBigIntArray(indexSets)
    )
  )
  payoutRedemptionEvent.parameters.push(
    new ethereum.EventParam("payout", ethereum.Value.fromUnsignedBigInt(payout))
  )

  return payoutRedemptionEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}
