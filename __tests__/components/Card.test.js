import React from 'react';
import renderer from 'react-test-renderer';

import { Card } from '../../src/components';

describe('Card component', () => {
  it('Is rendered correctly', () => {
    const tree = renderer.create(<Card />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
