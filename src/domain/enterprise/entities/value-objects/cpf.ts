import { ValueObject } from "@/core/entities/value-object";

export class CPF extends ValueObject<string> {
  static create(value: string) {
    const cpfRegex = /^\d{3}\d{3}\d{3}\d{2}$/;
    if (!cpfRegex.test(value)) throw new Error('Invalid CPF');
    return new CPF(value);
  }
}