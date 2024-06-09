import { CPF } from './cpf';

describe('CPF', () => {
  it('should create a valid CPF object', () => {
    const validCPF = '12345678909';
    const cpf = CPF.create(validCPF);
    expect(cpf.value).toBe(validCPF);
  });

  it('should throw an error for an invalid CPF', () => {
    const invalidCPF = '1234567890';
    expect(() => CPF.create(invalidCPF)).toThrow('Invalid CPF');
  });

  it('should throw an error for another invalid CPF format', () => {
    const invalidCPF = 'abcdefghijk';
    expect(() => CPF.create(invalidCPF)).toThrow('Invalid CPF');
  });
});