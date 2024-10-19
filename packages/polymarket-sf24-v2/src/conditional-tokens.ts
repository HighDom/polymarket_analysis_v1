import {
  ConditionPreparation as ConditionPreparationEvent,
  ConditionResolution as ConditionResolutionEvent,
  PositionSplit as PositionSplitEvent,
  PositionsMerge as PositionsMergeEvent,
  PayoutRedemption as PayoutRedemptionEvent,
  TransferSingle as TransferSingleEvent,
  TransferBatch as TransferBatchEvent,
  ApprovalForAll as ApprovalForAllEvent,
  URI as URIEvent
} from "../generated/ConditionalTokens/ConditionalTokens"
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
} from "../generated/schema"

export function handleConditionPreparation(
  event: ConditionPreparationEvent
): void {
  let entity = new ConditionPreparation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.conditionId = event.params.conditionId
  entity.oracle = event.params.oracle
  entity.questionId = event.params.questionId
  entity.outcomeSlotCount = event.params.outcomeSlotCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleConditionResolution(
  event: ConditionResolutionEvent
): void {
  let entity = new ConditionResolution(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.conditionId = event.params.conditionId
  entity.oracle = event.params.oracle
  entity.questionId = event.params.questionId
  entity.outcomeSlotCount = event.params.outcomeSlotCount
  entity.payoutNumerators = event.params.payoutNumerators

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePositionSplit(event: PositionSplitEvent): void {
  let entity = new PositionSplit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.stakeholder = event.params.stakeholder
  entity.collateralToken = event.params.collateralToken
  entity.parentCollectionId = event.params.parentCollectionId
  entity.conditionId = event.params.conditionId
  entity.partition = event.params.partition
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePositionsMerge(event: PositionsMergeEvent): void {
  let entity = new PositionsMerge(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.stakeholder = event.params.stakeholder
  entity.collateralToken = event.params.collateralToken
  entity.parentCollectionId = event.params.parentCollectionId
  entity.conditionId = event.params.conditionId
  entity.partition = event.params.partition
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePayoutRedemption(event: PayoutRedemptionEvent): void {
  let entity = new PayoutRedemption(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.redeemer = event.params.redeemer
  entity.collateralToken = event.params.collateralToken
  entity.parentCollectionId = event.params.parentCollectionId
  entity.conditionId = event.params.conditionId
  entity.indexSets = event.params.indexSets
  entity.payout = event.params.payout

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ConditionalTokens_id = event.params.id
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  entity.ConditionalTokens_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
