import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableHighlight,
} from 'react-native';

export default class locationButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zip1: '100010',
            forecast1: null,
        };
    }
    _onPress() {
        console.log('--------------this');
        console.log(this.state);
        navigator.geolocation.getCurrentPosition(
            async (initialPosition) => {
                console.log(initialPosition);

                let data = await this.reloveLocation(initialPosition.coords.latitude, initialPosition.coords.longitude);
                console.log('返回的地理位置---'+ JSON.stringify(data));
                console.log(data);
                var city = data.result.addressComponent.city;
                this.props.onGetLocation(initialPosition.coords.latitude,
                    initialPosition.coords.longitude,city);
            },
            (error) => { alert(error.message) },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }
    async reloveLocation(latitude, longitude) {
        var res = null;
        let url = 'http://api.map.baidu.com/geocoder/v2/?output=json&pois=1&ak=vnfojn0ekoZooO3dAtpCDdhSN8lqXM87&location=' + 
        // '39.92,116.46';
            latitude + ',' + longitude;
        console.log('请求url' + url);
        // http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=vnfojn0ekoZooO3dAtpCDdhSN8lqXM87 //GET请求
         await fetch(url)
            .then((response) => response.json())
            .then((responseJSON) => {
                // 如果你愿意，可以看看这个格式。 console.log(responseJSON); 
                res = responseJSON;
            })
            .catch((error) => {
                console.log('错误信息--------------');
                console.warn(error);
            });
        console.log('网络返回值--------------')
        console.log(res);
        return res;
    }
    render() {
        return (
            <TouchableHighlight onPress={this._onPress.bind(this)}
            >
                <View style={styles.locationButton}>
                    <Text
                        style={[styles.title]}
                    >Use CurrentLocation</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    locationButton: {
        backgroundColor: 'red',
        width: 200,
        height: 60,
        // padding: 25,
        borderRadius: 5,
        // flex:1,
        alignItems: 'center',
    },
    title: {
        height: 60,
        lineHeight: 60,
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
    },
})