import app from '../helpers/fastify_app';
import { Connection } from "../../src/models/connection.model";
import {
  ConnectionStoreInstance as connStore
} from "../../src/stores/connection.store";


describe('Connection API', () => {
  beforeEach(() => {
    connStore.deleteAll();
  });

  describe('Connecton#index', () => {

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
  })
});
