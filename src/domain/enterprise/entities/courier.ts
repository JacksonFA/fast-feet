import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { CPF } from "./value-objects/cpf";

export type CourierProps = {
  name: string
  document: CPF
  password: string
}

export class Courier extends Entity<CourierProps> {
  static create(props: CourierProps, id?: UniqueEntityID) {
    const courier = new Courier(props, id)
    return courier
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get document() {
    return this.props.document
  }

  set document(document: CPF) {
    this.props.document = document
  }

  get password() {
    return this.props.password
  }
}
