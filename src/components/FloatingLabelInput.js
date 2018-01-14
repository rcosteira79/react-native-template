import React from 'react';
import { View, TextInput, Animated } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

class FloatingLabelInput extends React.Component {
  state = {
    isFocused: false
  };

  componentWillMount() {
    this.animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  componentDidUpdate() {
    Animated.timing(this.animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200
    }).start();
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  handleAnimation(outputRange) {
    return this.animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange
    });
  }

  render() {
    const { label, unfocusedColor, focusedColor, refField, style, ...props } = this.props;
    const { viewStyle, labelStyle, textStyle } = styles;
    const labelStyleAnimations = {
      top: this.handleAnimation([35, 12]),
      fontSize: this.handleAnimation([14, 10]),
      color: this.handleAnimation([unfocusedColor, focusedColor])
    };

    const textStyleAnimations = {
      // Apparently, this can't be animated like the rest?
      borderBottomColor:
        this.state.isFocused || this.props.value !== '' ? focusedColor : unfocusedColor
    };

    return (
      <View style={[viewStyle, style]}>
        <Animated.Text style={[labelStyle, labelStyleAnimations]}>{label}</Animated.Text>
        <TextInput
          {...props}
          ref={refField}
          style={[textStyle, textStyleAnimations]}
          underlineColorAndroid={'transparent'}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  viewStyle: {
    alignSelf: 'stretch',
    paddingTop: 18
  },
  labelStyle: {
    position: 'absolute',
    height: 40,
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    left: 0
  },
  textStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    color: '$colorGrey',
    borderBottomWidth: 1
  }
});

export { FloatingLabelInput };
