import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Geolocation from '@react-native-community/geolocation';
import {API_KEY} from '../../utils/APIkey';
import Weather from '../../Components/weather';

const HomeScreen = () => {
  const getGeolocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (info) => resolve(info.coords),
        (error) => reject(error),
      );
    });
  };
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState(null);

  const fetchWeather = async ({lat, lon}) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`,
      );
      const responseJson = await response.json();
      console.log(responseJson);
      setWeatherCondition(responseJson.weather[0].main);
      setTemperature(responseJson.main.temp);
      return responseJson;
    } catch (error) {
      return null;
    }
  };
  const getWeather = async () => {
    try {
      const geoLocation = await getGeolocation();
      const weather = await fetchWeather({
        lat: geoLocation.latitude,
        lon: geoLocation.longitude,
      });
    } catch (error) {
      console.log('Error: cannot get  current weather condition');
    }
  };
  useEffect(() => {
    getWeather();
    console.log(temperature);
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Weather weather={weatherCondition} temperature={temperature} />
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
