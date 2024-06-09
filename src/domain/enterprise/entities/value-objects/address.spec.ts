import { ValueObject } from "@/core/entities/value-object"
import { Address } from "./address"

describe('Address Value Object', () => {
  it('should be able to create a valid Address VO', () => {
    const address = Address.create({
      street: 'Street 123',
      city: 'Test',
      state: 'SC',
      zip: '123456',
      longitude: -21.123,
      latitude: -21.123,
    })
    expect(address).toBeInstanceOf(Address)
    expect(address).toBeInstanceOf(ValueObject)
  })

  it('should throw an error if latitude is missing', () => {
    const invalidAddressProps = {
      street: '123 Main St',
      city: 'Anytown',
      state: 'Anystate',
      zip: '12345',
      latitude: 0,
      longitude: -74.0060
    };
    expect(() => Address.create(invalidAddressProps)).toThrow('Endereço inválido.');
  });

  it('should throw an error if longitude is missing', () => {
    const invalidAddressProps = {
      street: '123 Main St',
      city: 'Anytown',
      state: 'Anystate',
      zip: '12345',
      latitude: 40.7128,
      longitude: 0
    };
    expect(() => Address.create(invalidAddressProps)).toThrow('Endereço inválido.');
  });
})