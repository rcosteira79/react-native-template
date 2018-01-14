import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import { TouchableOpacity } from 'react-native';
import { TextWithLetterSpacing } from './TextWithLetterSpacing';

const getButtonColor = enabled => {
  return EStyleSheet.value(
    enabled ? '$colorPrimary' : '$colorPrimaryDarkDisabled'
  );
};

const Button = ({ onPress, children, style, enabled }) => {
  const { buttonStyle, textViewStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      style={[buttonStyle, style, { backgroundColor: getButtonColor(enabled) }]}
      disabled={!enabled}
      onPress={onPress}
    >
      <TextWithLetterSpacing
        spacing={2.4}
        viewStyle={textViewStyle}
        textStyle={textStyle}
      >
        {children}
      </TextWithLetterSpacing>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    letterSpacing: 2.4
  },
  textViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    height: 50,
    borderRadius: 3,
    alignSelf: 'stretch'
  }
});

export { Button };
