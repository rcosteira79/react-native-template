import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { hook, wrap } from 'cavy';

import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Image,
  Dimensions
} from 'react-native';

import { FloatingLabelInput, Button } from '../../components';
import { emailChanged, passwordChanged, loginUser } from './actions';
import Locales from '../../resources/locales';

import { GLOBAL } from '../../services/helpers';
import TestKeys from '../../../specs/itKeys';

const logo = require('../../resources/images/logo.png');

const SCREEN_WIDTH = Dimensions.get('window').width;

class LoginForm extends React.Component {
  onLoginButtonPress() {
    const { email, password } = this.props;

    dismissKeyboard();
    this.props.loginUser(email, password);
  }

  onEmailChange = email => this.props.emailChanged(email);
  onPasswordChange = password => this.props.passwordChanged(password);

  setInputReference = input => {
    this.passwordInput = input;
  };

  getErrorMessage() {
    return this.props.error !== '' ? this.props.translate(this.props.error) : ' ';
  }

  focusPassword = () => {
    this.passwordInput.focus();
  };

  testRef = identifier => {
    return GLOBAL.DEV ? this.props.generateTestHook(identifier) : null;
  };

  render() {
    const ButtonWrapper = wrap(Button, GLOBAL.DEV);

    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.logoStyle} source={logo} resizeMode={'contain'} />
          </View>

          <FloatingLabelInput
            style={styles.emailContainer}
            ref={this.testRef(TestKeys.login.emailInput)}
            unfocusedColor={EStyleSheet.value('$colorGrey')}
            focusedColor={EStyleSheet.value('$colorPrimary')}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            label={this.props.translate(`${Locales.login.email}`)}
            value={this.props.email}
            onChangeText={this.onEmailChange.bind(this)}
            blurOnSubmit={false}
            onSubmitEditing={this.focusPassword.bind(this)}
          />

          <View style={styles.passwordContainer}>
            <FloatingLabelInput
              ref={this.testRef(TestKeys.login.passwordInput)}
              unfocusedColor={EStyleSheet.value('$colorGrey')}
              focusedColor={EStyleSheet.value('$colorPrimary')}
              label={this.props.translate(`${Locales.login.password}`)}
              secureTextEntry
              returnKeyType="done"
              value={this.props.password}
              withRef
              refField={this.setInputReference.bind(this)}
              onChangeText={this.onPasswordChange.bind(this)}
              blurOnSubmit
              onSubmitEditing={dismissKeyboard}
            />

            <Text ref={this.testRef(TestKeys.login.errorMessage)} style={styles.errorStyle}>
              {this.getErrorMessage()}
            </Text>
          </View>
          <ButtonWrapper
            ref={this.testRef(TestKeys.login.loginButton)}
            enabled={this.props.validEmail && this.props.validPassword}
            style={styles.loginButtonStyle}
            onPress={this.onLoginButtonPress.bind(this)}
          >
            {this.props.translate(`${Locales.login.login}`)}
          </ButtonWrapper>

          <TouchableOpacity style={styles.recoverPasswordButtonContainer}>
            <Text style={styles.recoverPasswordButtonText}>
              {this.props.translate(`${Locales.login.recover_password}`)}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    minHeight: 50,
    maxHeight: 500,
    width: SCREEN_WIDTH * 0.5,
    marginTop: 40,
    marginBottom: 50
  },
  logoStyle: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  emailContainer: {
    marginBottom: 15
  },
  passwordContainer: {
    marginBottom: 40,
    alignSelf: 'stretch'
  },
  errorStyle: {
    fontSize: 11,
    marginTop: 2,
    alignSelf: 'flex-start',
    fontFamily: 'Montserrat-Regular',
    color: '$colorError'
  },
  loginButtonStyle: {
    marginBottom: 30
  },
  recoverPasswordButtonContainer: {
    marginBottom: 50
  },
  recoverPasswordButtonText: {
    fontSize: 11,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '$colorPrimaryDark'
  }
});

const mapStateToProps = ({ login, locale }) => {
  const { email, password, validEmail, validPassword, error, isLoading } = login;

  const translate = getTranslate(locale);

  return {
    translate,
    email,
    password,
    validEmail,
    validPassword,
    error,
    isLoading
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(hook(LoginForm, GLOBAL.DEV));
