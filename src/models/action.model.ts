import { v4 as uuidv4 } from 'uuid';
import { Static, Type } from '@sinclair/typebox'
import { Entity } from './interfaces.model';

export enum Status {
  Pending,
  Running,
  Finished,
  Err
};

export const ActionSchema = Type.Object({
  uuid: Type.Optional(Type.String()),
  name: Type.String(),
  args: Type.String(),
  status: Type.Optional(Type.Number()),
  error: Type.Optional(Type.String()),
});

export type ActionType = Static<typeof ActionSchema>;

export class Action implements Entity {
  uuid: String;
  name: String;
  err_string: String;
  status: Status;

  constructor(name: string) {
    this.uuid = uuidv4();
    this.name = name;
    this.status = Status.Pending;
  }
}
