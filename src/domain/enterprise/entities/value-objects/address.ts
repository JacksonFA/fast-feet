import { ValueObject } from "@/core/entities/value-object"

export type AddressProps = {
  street: string
  city: string
  state: string
  zip: string
  latitude: number
  longitude: number
}

export class Address extends ValueObject<AddressProps> {
  static create(value: AddressProps) {
    if (!value.latitude || !value.longitude) throw new Error('Endereço inválido.')
    return new Address(value)
  }
}
