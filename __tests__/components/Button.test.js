import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Button } from '../../src/components';

Enzyme.configure({ adapter: new Adapter() });

describe('Button component', () => {
  it('Is rendered enabled', () => {
    const tree = renderer.create(<Button enabled>Text</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Is rendered disabled', () => {
    const tree = renderer.create(<Button enabled={false}>Text</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Is clickable', () => {
    const handleClickMock = jest.fn();
    const buttonComponent = shallow(
      <Button enabled onPress={handleClickMock}>
        Text
      </Button>
    ).find('TouchableOpacity');

    buttonComponent.simulate('press');

    expect(handleClickMock).toBeCalled();
  });
});
