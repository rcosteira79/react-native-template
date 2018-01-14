import React from 'react';
import renderer from 'react-test-renderer';

import { TextWithLetterSpacing } from '../../src/components/TextWithLetterSpacing';

jest.unmock();

describe('TextWithLetterSpacing component', () => {
  it('Is rendered correctly', () => {
    const tree = renderer
      .create(
        <TextWithLetterSpacing spacing={2.4} viewStyle={{ flex: 1 }} textStyle={{ flex: 1 }}>
          Text
        </TextWithLetterSpacing>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
