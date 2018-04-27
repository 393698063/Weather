/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
} from 'react-native';

import Forecast from './Forcast';
import Location from './locationButton';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {

  /**
   * Mounting
   * constructor()
    static getDerivedStateFromProps()
    componentWillMount() / UNSAFE_componentWillMount()
    render()
    componentDidMount()


    Updating
    componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()
    static getDerivedStateFromProps()
    shouldComponentUpdate()
    componentWillUpdate() / UNSAFE_componentWillUpdate()
    render()
    getSnapshotBeforeUpdate()
    componentDidUpdate()

    Unmounting
    componentWillUnmount()

    Error Handling
    componentDidCatch()
   */
  constructor(props) {
    super(props);
    this.state = {
      zip: '北京市',
      forecast:null, 
    };
  }
  
  componentDidMount() {
    console.log('componentDidMount');
    console.log(this.state);
    this.getForecast(this.state.zip);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  _handleTextChange(event) {
    // console.log(event.nativeEvent.text);
    // //可能出现this非this的情况
    // this.setState({ zip: event.nativeEvent.text });
    /**
     * { date: '20180425',
  message: 'Success !',
  status: 200,
  city: '北京',
  count: 1052,
  data: 
   { shidu: '41%',
     pm25: 23,
     pm10: 55,
     quality: '良',
     wendu: '16',
     ganmao: '极少数敏感人群应减少户外活动',
     yesterday: 
      { date: '24日星期二',
        sunrise: '05:26',
        high: '高温 23.0℃',
        low: '低温 10.0℃',
        sunset: '19:01',
        aqi: 38,
        fx: '北风',
        fl: '3-4级',
        type: '多云',
        notice: '阴晴之间，谨防紫外线侵扰' },
     forecast: 
      [ { date: '25日星期三',
          sunrise: '05:25',
          high: '高温 25.0℃',
          low: '低温 11.0℃',
          sunset: '19:02',
          aqi: 63,
          fx: '西南风',
          fl: '3-4级',
          type: '晴',
          notice: '愿你拥有比阳光明媚的心情' },
        { date: '26日星期四',
          sunrise: '05:23',
          high: '高温 26.0℃',
          low: '低温 13.0℃',
          sunset: '19:03',
          aqi: 69,
          fx: '西南风',
          fl: '<3级',
          type: '多云',
          notice: '阴晴之间，谨防紫外线侵扰' },
        { date: '27日星期五',
          sunrise: '05:22',
          high: '高温 25.0℃',
          low: '低温 14.0℃',
          sunset: '19:04',
          aqi: 64,
          fx: '西南风',
          fl: '<3级',
          type: '晴',
          notice: '愿你拥有比阳光明媚的心情' },
        { date: '28日星期六',
          sunrise: '05:21',
          high: '高温 27.0℃',
          low: '低温 17.0℃',
          sunset: '19:05',
          aqi: 85,
          fx: '西南风',
          fl: '3-4级',
          type: '晴',
          notice: '愿你拥有比阳光明媚的心情' },
        { date: '29日星期日',
          sunrise: '05:19',
          high: '高温 28.0℃',
          low: '低温 16.0℃',
          sunset: '19:06',
          aqi: 96,
          fx: '东南风',
          fl: '<3级',
          type: '多云',
          notice: '阴晴之间，谨防紫外线侵扰' } ] } }

     */
    var zip = event.nativeEvent.text;
    this.setState({ zip: zip });
    this.getForecast(zip);
  }

  getForecast(location) {
    let _this = this;
    console.log(this.state);
    let city = encodeURI(location);
    //https://www.sojson.com/blog/234.html  天气接口
    let url = 'https://www.sojson.com/open/api/weather/json.shtml?city=' +
    city
    console.log('请求天气的url：' + 'https://www.sojson.com/open/api/weather/json.shtml?city=' +
    city);
    fetch(url)
      .then((response) => response.json())
      .then((responseJSON) => {
        // 如果你愿意，可以看看这个格式。 console.log(responseJSON); 
        console.log('天气返回值responseJSON：');
        console.log(responseJSON);
        let data = responseJSON.data;
        let forecast = {
          main: data.quality,
          description: data.ganmao,
          temp: data.wendu
        }
        console.log(forecast);
        _this.setState({ forecast:{
          main: data.quality,
          description: data.ganmao,
          temp: data.wendu
        } });
        // _this.setState({forecast:null});
      })
      .catch((error) => {
        console.log('天气返回值error：');
        console.warn(error);
      });
  }

  _getLocation (latitude,longtitude,city) {
    console.log('----------地址：');
    console.log(latitude,longtitude,city);
    this.setState({zip: city});
    this.getForecast(city);
  }

  render() {
    var content = null;
    console.log('----------------');
    console.log(this.state.forecast);
    if (this.state.forecast !== null) {
      console.log('------------neirong');
      content = <Forecast
      style = {{flex:1}}
        main={this.state.forecast.main}
        description={this.state.forecast.description}
        temp={this.state.forecast.temp} />;
    }
    return (
      <ImageBackground
        source={require('./img/timg-2.jpeg')}
        resizeMode='cover'
        style={styles.backdrop}
      >
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={styles.mainText}>
              Current weather for
             </Text>
            <View style={styles.zipContainer}>
              <TextInput
                style={[styles.zipCode,]}
                returnKeyType='go'
                onSubmitEditing={this._handleTextChange.bind(this)} 
                value={this.state.zip}/>
            </View>
          </View> 
          <Location onGetLocation = {this._getLocation.bind(this)}/>
        </View>
        {content}
      </ImageBackground>
    );
  }
}
let baseFontSize = 16;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: 'red',
  },
  backdrop: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center',
    height: 260,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30,
    height:60,
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 100,
    height: baseFontSize,
    color: '#FFFFFF'
  },
  mainText: {
    flex: 1,
    height:30,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  },
});
