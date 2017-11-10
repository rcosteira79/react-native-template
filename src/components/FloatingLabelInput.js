import React from 'react';
import {
	View, 
	TextInput,
	Animated 
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const colorAccent = EStyleSheet.value('$colorAccent');
const colorText = EStyleSheet.value('$colorText');

class FloatingLabelInput extends React.Component {
	state = { 
		isFocused: false,
	};
	
	componentWillMount() {
		this.animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
	}
	
	componentDidUpdate() {
		Animated.timing(this.animatedIsFocused, {
			toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
			duration: 200,
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
		const { label, ...props } = this.props;
		const { viewStyle, labelStyle, textStyle } = styles;
		const labelStyleAnimations = {
			top: this.handleAnimation([36, 8]),
			fontSize: this.handleAnimation([14, 12]),
			color: this.handleAnimation([colorText, colorAccent])
		};
		
		const textStyleAnimations = {
			// Apparently, this can't be animated like the rest?
			borderBottomColor: (this.state.isFocused || this.props.value !== '') ? colorAccent : colorText
		};
		
		
		return (
			<View style={viewStyle}>
			<Animated.Text style={[labelStyle, labelStyleAnimations]}>
			{label}
			</Animated.Text>
			<TextInput
			{...props}
			style={[textStyle, textStyleAnimations]}
			underlineColorAndroid={'transparent'}
			onFocus={this.handleFocus}
			onBlur={this.handleBlur}
			blurOnSubmit
			/>
			</View>
		);
	}
}

const styles = EStyleSheet.create({
	viewStyle: {
		paddingTop: 18
	},
	labelStyle: {
		position: 'absolute',
		left: 0,
	},
	textStyle: {
		height: 40,
		fontSize: 14,
		color: colorText,
		borderBottomWidth: 1
	}
});

export { FloatingLabelInput };
