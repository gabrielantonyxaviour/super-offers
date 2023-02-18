import { BigInt, Bytes, store } from "@graphprotocol/graph-ts";
import {
  SuperOffers,
  SuperClaimStopped,
  SuperOfferClaimed,
  SuperOfferCreated,
  SuperOfferDeleted,
  SuperOfferStopped,
  SuperOfferUpdated,
} from "../generated/SuperOffers/SuperOffers";
import { Claim, Offer } from "../generated/schema";

export function handleSuperOfferCreated(event: SuperOfferCreated): void {
  let offer = Offer.load(event.params.offerId.toHexString());

  if (!offer) {
    offer = new Offer(event.params.offerId.toHexString());
  }

  offer.title = event.params._name;
  offer.description = event.params.description;
  offer.creator = event.params.creator;
  let arr: Array<Bytes> = new Array<Bytes>(0);
  for (let i = 0; i < event.params.contracts.length; i++) {
    arr.push(event.params.contracts[i]);
  }
  offer.contracts = arr;
  offer.resolvers = event.params.resolvers;
  offer.expected = event.params.expected;
  offer.claims = [];
  offer.flowRate = BigInt.fromI32(0);

  offer.start = event.params.startTime;
  offer.end = event.params.endTime;
  offer.initialBalance = event.params.amount;
  offer.updatedBalance = event.params.amount;

  offer.lastUpdated = event.params.lastUpdated;
  offer.isActive = true;

  offer.save();
}

export function handleSuperOfferUpdated(event: SuperOfferUpdated): void {
  let offer = Offer.load(event.params.offerId.toHexString());

  if (!offer) {
    offer = new Offer(event.params.offerId.toHexString());
  }

  offer.title = event.params._name;
  offer.description = event.params.description;
  offer.creator = event.params.creator;
  let arr: Array<Bytes> = new Array<Bytes>(0);
  for (let i = 0; i < event.params.contracts.length; i++) {
    arr.push(event.params.contracts[i]);
  }
  offer.contracts = arr;

  offer.resolvers = event.params.resolvers;
  offer.expected = event.params.expected;
  offer.claims = [];
  offer.flowRate = BigInt.fromI32(0);

  offer.start = event.params.startTime;
  offer.end = event.params.endTime;
  offer.initialBalance = event.params.amount;
  offer.updatedBalance = event.params.amount;

  offer.lastUpdated = event.params.lastUpdated;
  offer.isActive = true;

  offer.save();
}

export function handleSuperOfferDeleted(event: SuperOfferDeleted): void {
  let offer = Offer.load(event.params.offerId.toHexString());

  if (!offer) {
    offer = new Offer(event.params.offerId.toHexString());
  }
  store.remove("Offer", event.params.offerId.toHexString());
}

export function handleSuperOfferClaimed(event: SuperOfferClaimed): void {
  let offer = Offer.load(event.params.offerId.toHexString());

  if (!offer) {
    offer = new Offer(event.params.offerId.toHexString());
  }
  const offerId = event.params.offerId.toHexString();
  const claimer = event.params.claimer.toHexString();
  let claim = Claim.load(offerId + claimer);
  if (!claim) {
    claim = new Claim(offerId + claimer);
  }

  claim.claimer = event.params.claimer;
  claim.claimedAt = event.params.updatedTime;

  claim.save();
  offer.claims.push(
    event.params.offerId.toHexString() + event.params.claimer.toHexString()
  );
  offer.claimersCount = BigInt.fromI32(offer.claimersCount.toI32() + 1);
  offer.lastClaimTime = event.params.updatedTime;
  offer.updatedBalance = event.params.updatedAmount;
  offer.flowRate = event.params.updatedFlowRate;
  offer.save();
}

export function handleSuperClaimStopped(event: SuperClaimStopped): void {
  let offer = Offer.load(event.params.offerId.toHexString());

  if (!offer) {
    offer = new Offer(event.params.offerId.toHexString());
  }
  const offerId = event.params.offerId.toHexString();
  const receiver = event.params.receiver.toHexString();
  let arr: Array<string> = new Array<string>(0);
  for (let i = 0; i < offer.claims.length; i++) {
    if (offer.claims[i] != offerId + receiver) {
      arr.push(offer.claims[i]);
    }
  }
  offer.claims = arr;
  offer.claimersCount = BigInt.fromI32(offer.claimersCount.toI32() - 1);
  offer.flowRate = event.params.updatedFlowRate;
  offer.updatedBalance = event.params.updatedAmount;
  offer.lastUpdated = event.params.updatedTime;
  offer.save();
}

export function handleSuperOfferStopped(event: SuperOfferStopped): void {
  let offer = Offer.load(event.params.offerId.toHexString());

  if (!offer) {
    offer = new Offer(event.params.offerId.toHexString());
  }
  offer.updatedBalance = BigInt.fromI32(0);
  offer.flowRate = BigInt.fromI32(0);
  offer.isActive = false;
}
