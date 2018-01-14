import { setMockApi, testDoubles } from '../../../__mocks__/mockApi';

import * as session from '../../../src/services/session/';
import * as sessionSelectors from '../../../src/services/session/selectors';

setMockApi();

describe('Testing session api requests', () => {
  it('Error on incorrect credentials', () => {
    session.authenticate('bad@email.com', 'password').catch(error => {
      expect(error.status).toEqual(401);
      expect(sessionSelectors.get().token).toEqual('');
    });
  });

  it('Get token with correct credentials', () => {
    session
      .authenticate(testDoubles.credentials.email, testDoubles.credentials.password)
      .then(() => {
        expect(sessionSelectors.get().token).toEqual(testDoubles.token);
      });
  });

  it('Get user with correct token', () => {
    session.getUser().then(() => {
      expect(sessionSelectors.get().user).toEqual(testDoubles.user);
    });
  });
});
