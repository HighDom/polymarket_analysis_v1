import { Protobuf } from "as-proto/assembly";
import { Events as protoEvents } from "./pb/contract/v1/Events";
import {  } from "../generated/schema";
import { BigInt, log, crypto, Bytes} from "@graphprotocol/graph-ts";
import { PayoutRedemption } from "../generated/schema";

export function handleTriggers(bytes: Uint8Array): void {
  // Decode the Protobuf input into ProtoEvents
  const events = Protobuf.decode<protoEvents>(bytes, protoEvents.decode);

  // Iterate over each PayoutRedemption event
  for (let i = 0; i < events.polymarketconditionaltokensPayoutRedemptions.length; i++) {
    const event = events.polymarketconditionaltokensPayoutRedemptions[i];
    let id: string = `${event.conditionId}-${i}`

    // Initialize a new PayoutRedemption entity with the generated ID
    let entity = new PayoutRedemption(id);

    // Map the fields from the event to the entity
    entity.payout = event.payout;
    entity.blockNumber = BigInt.fromU64(event.evtBlockNumber);
    entity.transactionHash = event.evtTxHash;

    // Save the entity
    entity.save();
  }
}