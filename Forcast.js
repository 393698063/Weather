import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

export default class Forcast extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Text style={styles.bigText}>
                    {this.props.main}
                </Text>
                <Text style={styles.mainText}>
                    Current conditions: {this.props.description}
                </Text>
                <Text style={styles.bigText}> {this.props.temp}°F
             </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bigText: {
      flex: 1,
      fontSize: 45,
      textAlign: 'center',
      margin: 10,
      color: '#3EA6FA'
    },
    mainText: {
        marginLeft:20,
        marginRight:20,
      flex: 1,
      fontSize: 30,
      textAlign: 'center',
      color: '#3EA6FA'
} })