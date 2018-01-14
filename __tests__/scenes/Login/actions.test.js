import * as actions from '../../../src/scenes/Login/actions';
import * as actionTypes from '../../../src/scenes/Login/actionTypes';

describe('Login actions', () => {
  it('Create action to update invalid emails', () => {
    const invalidEmail = 'email';
    const expectedAction = {
      type: actionTypes.EMAIL_CHANGED,
      payload: {
        email: invalidEmail,
        validEmail: false,
        error: ''
      }
    };

    expect(actions.emailChanged(invalidEmail)).toEqual(expectedAction);

    const anotherInvalidEmail = 'email@test';
    expectedAction.payload.email = anotherInvalidEmail;

    expect(actions.emailChanged(anotherInvalidEmail)).toEqual(expectedAction);

    const yetAnotherInvalidEmail = 'email@test.c';
    expectedAction.payload.email = yetAnotherInvalidEmail;

    expect(actions.emailChanged(yetAnotherInvalidEmail)).toEqual(
      expectedAction
    );
  });

  it('Create action to update valid email', () => {
    const email = 'valid@email.com';
    const expectedAction = {
      type: actionTypes.EMAIL_CHANGED,
      payload: {
        email,
        validEmail: true,
        error: ''
      }
    };

    expect(actions.emailChanged(email)).toEqual(expectedAction);
  });

  it('Create action to update invalid password', () => {
    const password = '';
    const expectedAction = {
      type: actionTypes.PASSWORD_CHANGED,
      payload: {
        password,
        validPassword: false,
        error: ''
      }
    };

    expect(actions.passwordChanged(password)).toEqual(expectedAction);
  });

  it('Create action to update valid password', () => {
    const password = 'password';
    const expectedAction = {
      type: actionTypes.PASSWORD_CHANGED,
      payload: {
        password,
        validPassword: true,
        error: ''
      }
    };

    expect(actions.passwordChanged(password)).toEqual(expectedAction);
  });
});
