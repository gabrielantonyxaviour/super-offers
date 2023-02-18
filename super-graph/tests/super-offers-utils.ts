import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  SuperClaimStopped,
  SuperOfferClaimed,
  SuperOfferCreated,
  SuperOfferDeleted,
  SuperOfferStopped,
  SuperOfferUpdated
} from "../generated/SuperOffers/SuperOffers"

export function createSuperClaimStoppedEvent(
  offerId: BigInt,
  receiver: Address,
  updatedAmount: BigInt,
  updatedFlowRate: BigInt,
  updatedTime: BigInt
): SuperClaimStopped {
  let superClaimStoppedEvent = changetype<SuperClaimStopped>(newMockEvent())

  superClaimStoppedEvent.parameters = new Array()

  superClaimStoppedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  superClaimStoppedEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  superClaimStoppedEvent.parameters.push(
    new ethereum.EventParam(
      "updatedAmount",
      ethereum.Value.fromUnsignedBigInt(updatedAmount)
    )
  )
  superClaimStoppedEvent.parameters.push(
    new ethereum.EventParam(
      "updatedFlowRate",
      ethereum.Value.fromSignedBigInt(updatedFlowRate)
    )
  )
  superClaimStoppedEvent.parameters.push(
    new ethereum.EventParam(
      "updatedTime",
      ethereum.Value.fromUnsignedBigInt(updatedTime)
    )
  )

  return superClaimStoppedEvent
}

export function createSuperOfferClaimedEvent(
  offerId: BigInt,
  updatedAmount: BigInt,
  updatedFlowRate: BigInt,
  updatedTime: BigInt,
  claimer: Address
): SuperOfferClaimed {
  let superOfferClaimedEvent = changetype<SuperOfferClaimed>(newMockEvent())

  superOfferClaimedEvent.parameters = new Array()

  superOfferClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  superOfferClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "updatedAmount",
      ethereum.Value.fromUnsignedBigInt(updatedAmount)
    )
  )
  superOfferClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "updatedFlowRate",
      ethereum.Value.fromSignedBigInt(updatedFlowRate)
    )
  )
  superOfferClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "updatedTime",
      ethereum.Value.fromUnsignedBigInt(updatedTime)
    )
  )
  superOfferClaimedEvent.parameters.push(
    new ethereum.EventParam("claimer", ethereum.Value.fromAddress(claimer))
  )

  return superOfferClaimedEvent
}

export function createSuperOfferCreatedEvent(
  offerId: BigInt,
  _name: string,
  creator: Address,
  amount: BigInt,
  contracts: Array<Address>,
  resolvers: Array<Bytes>,
  expected: Array<Bytes>,
  startTime: BigInt,
  endTime: BigInt,
  lastUpdated: BigInt,
  description: string
): SuperOfferCreated {
  let superOfferCreatedEvent = changetype<SuperOfferCreated>(newMockEvent())

  superOfferCreatedEvent.parameters = new Array()

  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam("_name", ethereum.Value.fromString(_name))
  )
  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "contracts",
      ethereum.Value.fromAddressArray(contracts)
    )
  )
  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "resolvers",
      ethereum.Value.fromFixedBytesArray(resolvers)
    )
  )
  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "expected",
      ethereum.Value.fromFixedBytesArray(expected)
    )
  )
  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "lastUpdated",
      ethereum.Value.fromUnsignedBigInt(lastUpdated)
    )
  )
  superOfferCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )

  return superOfferCreatedEvent
}

export function createSuperOfferDeletedEvent(
  offerId: BigInt
): SuperOfferDeleted {
  let superOfferDeletedEvent = changetype<SuperOfferDeleted>(newMockEvent())

  superOfferDeletedEvent.parameters = new Array()

  superOfferDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )

  return superOfferDeletedEvent
}

export function createSuperOfferStoppedEvent(
  offerId: BigInt
): SuperOfferStopped {
  let superOfferStoppedEvent = changetype<SuperOfferStopped>(newMockEvent())

  superOfferStoppedEvent.parameters = new Array()

  superOfferStoppedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )

  return superOfferStoppedEvent
}

export function createSuperOfferUpdatedEvent(
  offerId: BigInt,
  _name: string,
  creator: Address,
  amount: BigInt,
  contracts: Array<Address>,
  resolvers: Array<Bytes>,
  expected: Array<Bytes>,
  startTime: BigInt,
  endTime: BigInt,
  lastUpdated: BigInt,
  description: string
): SuperOfferUpdated {
  let superOfferUpdatedEvent = changetype<SuperOfferUpdated>(newMockEvent())

  superOfferUpdatedEvent.parameters = new Array()

  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "offerId",
      ethereum.Value.fromUnsignedBigInt(offerId)
    )
  )
  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam("_name", ethereum.Value.fromString(_name))
  )
  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "contracts",
      ethereum.Value.fromAddressArray(contracts)
    )
  )
  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "resolvers",
      ethereum.Value.fromFixedBytesArray(resolvers)
    )
  )
  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "expected",
      ethereum.Value.fromFixedBytesArray(expected)
    )
  )
  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTime",
      ethereum.Value.fromUnsignedBigInt(endTime)
    )
  )
  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "lastUpdated",
      ethereum.Value.fromUnsignedBigInt(lastUpdated)
    )
  )
  superOfferUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )

  return superOfferUpdatedEvent
}
