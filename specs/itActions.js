import { expect } from 'chai';
import { getTranslate } from 'react-localize-redux';
import { NavigationActions } from 'react-navigation';

import Locales from '../src/resources/locales';

import TestKeys from './itKeys';

export const inputEmail = (spec, text) => {
  const description = `write '${text}' on email input`;
  spec.describe(description, () => {
    spec.it('PASS', async () => {
      await writeToInput(spec, TestKeys.login.emailInput, text);
      const emailInput = await spec.findComponent(TestKeys.login.emailInput);
      expect(emailInput.props.value).to.equal(text);
      expect(spec.getCurrentStore().login.email).to.equal(text);
    });
  });
};

export const inputPassword = (spec, text) => {
  const description = `write '${text}' on password input`;
  spec.describe(description, () => {
    spec.it('PASS', async () => {
      await writeToInput(spec, TestKeys.login.passwordInput, text);
      const passwordInput = await spec.findComponent(TestKeys.login.passwordInput);
      expect(passwordInput.props.value).to.equal(text);
      expect(spec.getCurrentStore().login.password).to.equal(text);
    });
  });
};

export const loginButtonDisabled = spec => {
  spec.describe('Login button is disabled', () => {
    spec.it('PASS', async () => {
      const button = await spec.findComponent(TestKeys.login.loginButton);
      expect(button.props.enabled).to.equal(false);
    });
  });
};

export const loginButtonEnabled = spec => {
  spec.describe('Login button is enabled', () => {
    spec.it('PASS', async () => {
      const button = await spec.findComponent(TestKeys.login.loginButton);
      expect(button.props.enabled).to.equal(true);
    });
  });
};

export const clickLoginButton = spec => {
  spec.describe('Click login button', () => {
    spec.it('PASS', async () => {
      await pressButton(spec, TestKeys.login.loginButton);
      await spec.pause(5000);
    });
  });
};

export const checkErrorMessage = spec => {
  spec.describe('Check error message', () => {
    spec.it('PASS', async () => {
      await spec.exists(TestKeys.login.errorMessage);
      const errorMessage = await spec.findComponent(TestKeys.login.errorMessage);
      const store = await spec.getCurrentStore();
      const translate = getTranslate(store.locale);
      expect(errorMessage.props.children).to.equal(
        translate(Locales.login.error_invalid_email_password)
      );
    });
  });
};

export const checkIfScreenIsActivityFeed = spec => {
  spec.describe('Check if activity feed is visible', () => {
    spec.it('PASS', async () => {
      await spec.notExists(TestKeys.login.emailInput); // TODO: check for activity feed components
    });
  });
};

export const navigateToSettings = spec => {
  spec.describe('Navigate to settings', () => {
    spec.it('PASS', async () => {
      await spec.dispatchToStore(NavigationActions.navigate({ routeName: 'Settings' }));
      await spec.exists(TestKeys.settings.logoutButton);
    });
  });
};

export const pressLogoutButton = spec => {
  spec.describe('Press logout button', () => {
    spec.it('PASS', async () => {
      await pressButton(spec, TestKeys.settings.logoutButton);
      await spec.exists(TestKeys.login.emailInput);
      const store = await spec.getCurrentStore();
      expect(store.session.token).to.equal('');
      expect(store.session.user).to.equal(null);
    });
  });
};

const writeToInput = async (spec, identifier, text) => {
  await spec.exists(identifier);
  await spec.fillIn(identifier, text);
};

const pressButton = async (spec, identifier) => {
  await spec.exists(identifier);
  await spec.press(identifier);
};
