import React from 'react';
import renderer from 'react-test-renderer';

import { Letter } from '../../src/components/Letter';

jest.unmock();

describe('Letter component', () => {
  it('Is rendered correctly', () => {
    const tree = renderer
      .create(
        <Letter key={0} spacing={0} textSyle={{ flex: 1 }}>
          T
        </Letter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
