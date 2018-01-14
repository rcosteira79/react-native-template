import React from 'react';
import renderer from 'react-test-renderer';

import { FloatingLabelInput } from '../../src/components';

jest.mock('Animated', () => {
  const ActualAnimated = require.requireActual('Animated');
  return {
    ...ActualAnimated,
    timing: (value, config) => {
      return {
        start: callback => {
          value.setValue(config.toValue);
          callback && callback();
        }
      };
    }
  };
});

describe('FloatingLabelInput component', () => {
  it('Is rendered correctly', () => {
    const tree = renderer.create(<FloatingLabelInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Is focused', () => {
    const component = renderer.create(<FloatingLabelInput />).getInstance();
    component.handleFocus();
    expect(component.state.isFocused).toEqual(true);
  });

  it('Is unfocused', () => {
    const component = renderer.create(<FloatingLabelInput />).getInstance();
    component.handleBlur();
    expect(component.state.isFocused).toEqual(false);
  });
});
