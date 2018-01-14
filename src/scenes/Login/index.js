import React from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LoginForm from './LoginForm';
import { Card } from '../../components';

const Login = () => {
  return (
    <View style={styles.backgroundStyle}>
      <Card style={styles.cardStyle}>
        <LoginForm />
      </Card>
    </View>
  );
};

const styles = EStyleSheet.create({
  backgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$colorPrimary'
  },
  cardStyle: {
    marginTop: 88,
    marginBottom: 87,
    marginLeft: 10,
    marginRight: 10
  }
});

export default Login;
