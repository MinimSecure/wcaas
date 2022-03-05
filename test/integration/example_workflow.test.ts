import build from '../../src/app';
import {
  ConnectionStoreInstance as connStore
} from "../../src/stores/connection.store";

describe('Connection API', () => {
  beforeEach(() => {
    connStore.deleteAll();
  });

  test('Test the entire workflow', async () => {
    const app = build();

    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/connections',
      payload: {
        ssid: 'Apples',
        passphrase: 'AreGood',
      }
    });

    let respData = JSON.parse(response.body);
    expect(response.body).not.toBeNull();
  });
});
