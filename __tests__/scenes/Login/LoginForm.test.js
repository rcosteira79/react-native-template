import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as LoginReducer from '../../../src/scenes/Login/reducer';
import LoginForm from '../../../src/scenes/Login/LoginForm';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  login: {
    ...LoginReducer.initialState
  },
  locale: {
    languages: [
      { code: 'pt', active: true },
      { code: 'en', active: false },
      { code: 'fr', active: false }
    ],
    translations: {}
  }
};

let state;

Enzyme.configure({ adapter: new Adapter() });

jest.unmock();

describe('Login Form tests', () => {
  let wrapper;

  beforeEach(() => {
    state = initialState;
  });

  it('renders the Login form', () => {
    wrapper = shallow(<LoginForm />, { context: { store: mockStore(state) } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('Displays the email address', () => {
    state.login.email = 'address@email.com';
    wrapper = shallow(<LoginForm />, { context: { store: mockStore(state) } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('Displays invalid email address', () => {
    state.login.email = 'address@';
    state.login.validEmail = false;
    wrapper = shallow(<LoginForm />, { context: { store: mockStore(state) } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('Displays the password', () => {
    state.login.password = 'password';
    wrapper = shallow(<LoginForm />, { context: { store: mockStore(state) } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('Displays invalid password', () => {
    state.login.password = '';
    state.login.validPassword = false;
    wrapper = shallow(<LoginForm />, { context: { store: mockStore(state) } });
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('Displays error on invalid login credentials', () => {
    state.login.error = 'Invalid login';
    wrapper = shallow(<LoginForm />, { context: { store: mockStore(state) } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
