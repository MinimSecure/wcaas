import app from '../helpers/fastify_app';
import { Connection, ConnectionType } from "../../src/models/connection.model";
import {
  ConnectionStoreInstance as connStore
} from "../../src/stores/connection.store";


describe('Connection API', () => {
  beforeEach(() => {
    connStore.deleteAll();
  });

  describe('Connecton#index', () => {
    test('returns all connections in the store', async () => {
      let num = 6;

      for(let i=0; i<num; i++) {
        connStore.add(new Connection('foobar', 'adored!!'));
      }

      const response = await app.inject({ method: 'GET', url: '/api/v1/connections' });

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body).length).toEqual(num);
    });
  });

  describe('Connecton#create', () => {
    test('We can successfully create a connection', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/connections',
        payload: {
          ssid: 'Apples',
          passphrase: 'AreGood',
        }
      });

      let connectionID: string = JSON.parse(response.body).uuid;

      expect(response.statusCode).toEqual(201);
      expect(connStore.find(connectionID)).toBeInstanceOf(Connection);
    });

    test('Responds with a 400 for invalid parameters and does not create the Connection', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/connections',
        payload: {
          ssid: 'Apples',
        }
      });

      let connectionID: string = JSON.parse(response.body).uuid;

      expect(response.statusCode).toEqual(400);
      expect(connStore.find(connectionID)).toBeUndefined();
    });
  });

  describe('Connecton#show', () => {
    test('it returns the object you requested', async () => {
      let conn = connStore.add(new Connection('foobar', 'adored!!'));
      connStore.add(new Connection('baztaz', 'reallynotme'));

      const response = await app.inject({ method: 'GET', url: `/api/v1/connections/${conn.uuid}` });

      let data: ConnectionType = JSON.parse(response.body);

      expect(response.statusCode).toEqual(200);
      expect(data.uuid).toEqual(conn.uuid);
      expect(data.passphrase).toEqual(conn.passphrase);
      expect(data.status).toEqual(conn.status);
    });

    test('it returns 404 if the object doesnt exist', async () => {
      connStore.add(new Connection('foobar', 'adored!!'));
      connStore.add(new Connection('baztaz', 'reallynotme'));

      const response = await app.inject({ method: 'GET', url: `/api/v1/connections/hahanope` });

      expect(response.statusCode).toEqual(404);
    });
  });

  describe('Connecton#destroy', () => {
    test('It calls Connection#disconnect on the found connecton', async () => {
      let conn = connStore.add(new Connection('foobar', 'adored!!'));
      jest.spyOn(conn, 'disconnect');

      const response = await app.inject({
        method: 'DELETE',
        url: `/api/v1/connections/${conn.uuid}`,
        payload: {
          ssid: 'Apples',
          passphrase: 'AreGood',
        }
      });

      expect(response.statusCode).toEqual(200);
      expect(conn.disconnect).toBeCalled();
    });

    test('Responds with a 404 if the connection isnt found', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/v1/connections/foobarbazz',
        payload: {
          ssid: 'Apples',
        }
      });

      expect(response.statusCode).toEqual(404);
    });
  });
});
