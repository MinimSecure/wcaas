import { v4 as uuidv4 } from 'uuid';
import { Static, Type } from '@sinclair/typebox'
import { ActionIndex, ActionType, Action } from './action.model';

export enum Status {
  Pending,
  Connected,
  Disconnected,
  Err
};

export const ConnectionSchema = Type.Object({
  uuid: Type.Optional(Type.String()),
  ssid: Type.String(),
  passphrase: Type.String(),
  status: Type.Optional(Type.Number()),
  error: Type.Optional(Type.String()),
});

export type ConnectionType = Static<typeof ConnectionSchema>;

export class Connection {
  uuid: String;
  ssid: String;
  passphrase: String;
  error: String;
  status: Status;
  actions: ActionIndex;

  constructor(ssid: String, passphrase: String) {
    this.uuid = uuidv4();
    this.status = Status.Pending;
    this.ssid = ssid;
    this.passphrase = passphrase;
  }

  disconnect() {
    this.status = Status.Disconnected;
  }

  addAction(actionData: ActionType) : Boolean {
    if(this.status == Status.Connected) {
      let action = new Action(actionData.name);
      this.actions[action.uuid as string] = action;
      return true;
    } else {
      return false;
    }
  }
}
