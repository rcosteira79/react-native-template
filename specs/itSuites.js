import * as itActions from './itActions.js';

const INVALID_TEST_EMAIL = 'invalidTestEmail';
const VALID_TEST_EMAIL = 'test@email.com';
const VALID_TEST_PASSWORD = 'password';
const INVALID_TEST_PASSWORD = '';

const invalidEmail = spec => {
  spec.suite('Login - Invalid email', () => {
    itActions.inputEmail(spec, INVALID_TEST_EMAIL);
    itActions.inputPassword(spec, VALID_TEST_PASSWORD);
    itActions.loginButtonDisabled(spec);
  });
};

const invalidCredentials = spec => {
  spec.suite('Login - Invalid credentials', () => {
    itActions.inputEmail(spec, INVALID_TEST_EMAIL);
    itActions.inputPassword(spec, INVALID_TEST_PASSWORD);
    itActions.loginButtonDisabled(spec);
  });
};

const invalidPassword = spec => {
  spec.suite('Login - Invalid password', () => {
    itActions.inputEmail(spec, VALID_TEST_EMAIL);
    itActions.inputPassword(spec, INVALID_TEST_PASSWORD);
    itActions.loginButtonDisabled(spec);
  });
};

const validCredentials = spec => {
  spec.suite('Login - Valid credentials', () => {
    itActions.inputEmail(spec, VALID_TEST_EMAIL);
    itActions.inputPassword(spec, VALID_TEST_PASSWORD);
    itActions.loginButtonEnabled(spec);
  });
};

const invalidLogin = spec => {
  spec.suite('Login - Login with wrong credentials', () => {
    itActions.inputEmail(spec, VALID_TEST_EMAIL);
    itActions.inputPassword(spec, VALID_TEST_PASSWORD);
    itActions.clickLoginButton(spec);
    itActions.checkErrorMessage(spec);
  });
};

const validLogin = spec => {
  spec.suite('Login - Login with correct credentials', () => {
    itActions.inputEmail(spec, 'correct@credentials.com');
    itActions.inputPassword(spec, '123456');
    itActions.clickLoginButton(spec);
    itActions.checkIfScreenIsActivityFeed(spec);
  });
};

const logout = spec => {
  spec.suite('Logout', () => {
    itActions.navigateToSettings(spec);
    itActions.pressLogoutButton(spec);
  });
};

export {
  invalidEmail,
  invalidCredentials,
  invalidPassword,
  validCredentials,
  invalidLogin
  //validLogin, -- commented out for obvious reasons :)
  //logout
};
