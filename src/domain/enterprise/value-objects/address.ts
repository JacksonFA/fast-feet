import { ValueObject } from "@/core/entities/value-object"

export type AddressProps = {
  street: string,
  city: string,
  state: string,
  zip: string
}

export class Address extends ValueObject<AddressProps> {
  static create(value: AddressProps) {
    return new Address(value)
  }
}
