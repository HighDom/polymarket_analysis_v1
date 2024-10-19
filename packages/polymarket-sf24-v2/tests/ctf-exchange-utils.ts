import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  FeeCharged,
  NewAdmin,
  NewOperator,
  OrderCancelled,
  OrderFilled,
  OrdersMatched,
  ProxyFactoryUpdated,
  RemovedAdmin,
  RemovedOperator,
  SafeFactoryUpdated,
  TokenRegistered,
  TradingPaused,
  TradingUnpaused
} from "../generated/CTFExchange/CTFExchange"

export function createFeeChargedEvent(
  receiver: Address,
  tokenId: BigInt,
  amount: BigInt
): FeeCharged {
  let feeChargedEvent = changetype<FeeCharged>(newMockEvent())

  feeChargedEvent.parameters = new Array()

  feeChargedEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  feeChargedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  feeChargedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return feeChargedEvent
}

export function createNewAdminEvent(
  newAdminAddress: Address,
  admin: Address
): NewAdmin {
  let newAdminEvent = changetype<NewAdmin>(newMockEvent())

  newAdminEvent.parameters = new Array()

  newAdminEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminAddress",
      ethereum.Value.fromAddress(newAdminAddress)
    )
  )
  newAdminEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )

  return newAdminEvent
}

export function createNewOperatorEvent(
  newOperatorAddress: Address,
  admin: Address
): NewOperator {
  let newOperatorEvent = changetype<NewOperator>(newMockEvent())

  newOperatorEvent.parameters = new Array()

  newOperatorEvent.parameters.push(
    new ethereum.EventParam(
      "newOperatorAddress",
      ethereum.Value.fromAddress(newOperatorAddress)
    )
  )
  newOperatorEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )

  return newOperatorEvent
}

export function createOrderCancelledEvent(orderHash: Bytes): OrderCancelled {
  let orderCancelledEvent = changetype<OrderCancelled>(newMockEvent())

  orderCancelledEvent.parameters = new Array()

  orderCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "orderHash",
      ethereum.Value.fromFixedBytes(orderHash)
    )
  )

  return orderCancelledEvent
}

export function createOrderFilledEvent(
  orderHash: Bytes,
  maker: Address,
  taker: Address,
  makerAssetId: BigInt,
  takerAssetId: BigInt,
  makerAmountFilled: BigInt,
  takerAmountFilled: BigInt,
  fee: BigInt
): OrderFilled {
  let orderFilledEvent = changetype<OrderFilled>(newMockEvent())

  orderFilledEvent.parameters = new Array()

  orderFilledEvent.parameters.push(
    new ethereum.EventParam(
      "orderHash",
      ethereum.Value.fromFixedBytes(orderHash)
    )
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam("maker", ethereum.Value.fromAddress(maker))
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam("taker", ethereum.Value.fromAddress(taker))
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam(
      "makerAssetId",
      ethereum.Value.fromUnsignedBigInt(makerAssetId)
    )
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam(
      "takerAssetId",
      ethereum.Value.fromUnsignedBigInt(takerAssetId)
    )
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam(
      "makerAmountFilled",
      ethereum.Value.fromUnsignedBigInt(makerAmountFilled)
    )
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam(
      "takerAmountFilled",
      ethereum.Value.fromUnsignedBigInt(takerAmountFilled)
    )
  )
  orderFilledEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return orderFilledEvent
}

export function createOrdersMatchedEvent(
  takerOrderHash: Bytes,
  takerOrderMaker: Address,
  makerAssetId: BigInt,
  takerAssetId: BigInt,
  makerAmountFilled: BigInt,
  takerAmountFilled: BigInt
): OrdersMatched {
  let ordersMatchedEvent = changetype<OrdersMatched>(newMockEvent())

  ordersMatchedEvent.parameters = new Array()

  ordersMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "takerOrderHash",
      ethereum.Value.fromFixedBytes(takerOrderHash)
    )
  )
  ordersMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "takerOrderMaker",
      ethereum.Value.fromAddress(takerOrderMaker)
    )
  )
  ordersMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "makerAssetId",
      ethereum.Value.fromUnsignedBigInt(makerAssetId)
    )
  )
  ordersMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "takerAssetId",
      ethereum.Value.fromUnsignedBigInt(takerAssetId)
    )
  )
  ordersMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "makerAmountFilled",
      ethereum.Value.fromUnsignedBigInt(makerAmountFilled)
    )
  )
  ordersMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "takerAmountFilled",
      ethereum.Value.fromUnsignedBigInt(takerAmountFilled)
    )
  )

  return ordersMatchedEvent
}

export function createProxyFactoryUpdatedEvent(
  oldProxyFactory: Address,
  newProxyFactory: Address
): ProxyFactoryUpdated {
  let proxyFactoryUpdatedEvent = changetype<ProxyFactoryUpdated>(newMockEvent())

  proxyFactoryUpdatedEvent.parameters = new Array()

  proxyFactoryUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldProxyFactory",
      ethereum.Value.fromAddress(oldProxyFactory)
    )
  )
  proxyFactoryUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newProxyFactory",
      ethereum.Value.fromAddress(newProxyFactory)
    )
  )

  return proxyFactoryUpdatedEvent
}

export function createRemovedAdminEvent(
  removedAdmin: Address,
  admin: Address
): RemovedAdmin {
  let removedAdminEvent = changetype<RemovedAdmin>(newMockEvent())

  removedAdminEvent.parameters = new Array()

  removedAdminEvent.parameters.push(
    new ethereum.EventParam(
      "removedAdmin",
      ethereum.Value.fromAddress(removedAdmin)
    )
  )
  removedAdminEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )

  return removedAdminEvent
}

export function createRemovedOperatorEvent(
  removedOperator: Address,
  admin: Address
): RemovedOperator {
  let removedOperatorEvent = changetype<RemovedOperator>(newMockEvent())

  removedOperatorEvent.parameters = new Array()

  removedOperatorEvent.parameters.push(
    new ethereum.EventParam(
      "removedOperator",
      ethereum.Value.fromAddress(removedOperator)
    )
  )
  removedOperatorEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )

  return removedOperatorEvent
}

export function createSafeFactoryUpdatedEvent(
  oldSafeFactory: Address,
  newSafeFactory: Address
): SafeFactoryUpdated {
  let safeFactoryUpdatedEvent = changetype<SafeFactoryUpdated>(newMockEvent())

  safeFactoryUpdatedEvent.parameters = new Array()

  safeFactoryUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldSafeFactory",
      ethereum.Value.fromAddress(oldSafeFactory)
    )
  )
  safeFactoryUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newSafeFactory",
      ethereum.Value.fromAddress(newSafeFactory)
    )
  )

  return safeFactoryUpdatedEvent
}

export function createTokenRegisteredEvent(
  token0: BigInt,
  token1: BigInt,
  conditionId: Bytes
): TokenRegistered {
  let tokenRegisteredEvent = changetype<TokenRegistered>(newMockEvent())

  tokenRegisteredEvent.parameters = new Array()

  tokenRegisteredEvent.parameters.push(
    new ethereum.EventParam("token0", ethereum.Value.fromUnsignedBigInt(token0))
  )
  tokenRegisteredEvent.parameters.push(
    new ethereum.EventParam("token1", ethereum.Value.fromUnsignedBigInt(token1))
  )
  tokenRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "conditionId",
      ethereum.Value.fromFixedBytes(conditionId)
    )
  )

  return tokenRegisteredEvent
}

export function createTradingPausedEvent(pauser: Address): TradingPaused {
  let tradingPausedEvent = changetype<TradingPaused>(newMockEvent())

  tradingPausedEvent.parameters = new Array()

  tradingPausedEvent.parameters.push(
    new ethereum.EventParam("pauser", ethereum.Value.fromAddress(pauser))
  )

  return tradingPausedEvent
}

export function createTradingUnpausedEvent(pauser: Address): TradingUnpaused {
  let tradingUnpausedEvent = changetype<TradingUnpaused>(newMockEvent())

  tradingUnpausedEvent.parameters = new Array()

  tradingUnpausedEvent.parameters.push(
    new ethereum.EventParam("pauser", ethereum.Value.fromAddress(pauser))
  )

  return tradingUnpausedEvent
}
