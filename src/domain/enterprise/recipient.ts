import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Address } from "./value-objects/address";

export type RecipientProps = {
  name: string
  address: Address
}

export class Recipient extends Entity<RecipientProps> {
  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id)
    return recipient
  }
}
