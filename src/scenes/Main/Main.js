import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
});
export default class Main extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>I'm the Main scene</Text>
            </View>
        );
    }
}
