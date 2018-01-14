import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from '../../../src/scenes/Login';

Enzyme.configure({ adapter: new Adapter() });

// Don't bother trying to DRY this. In a mock you can only require things
// locally and you aren't allowed to access external variables.
jest.mock('../../../src/navigation/routes', () => ({
  AppNavigator: {
    router: {
      getStateForAction: jest.fn(),
      getActionForPathAndParams: jest.fn()
    }
  }
}));

jest.mock('../../../src/navigation/reducer', () => ({
  AppNavigator: {
    router: {
      getStateForAction: jest.fn(),
      getActionForPathAndParams: jest.fn()
    }
  }
}));

describe('Login tests', () => {
  it('Renders the LoginScreen', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
