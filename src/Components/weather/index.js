import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {weatherConditions} from '../../utils/weatherConditions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Weather = ({weather, temperature}) => {
  if (weather != null) {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: weatherConditions[weather].color},
        ]}>
        <View style={styles.headerContainer}>
          <Icon
            size={80}
            name={weatherConditions[weather].icon}
            color={'#fff'}
          />
          <Text style={styles.tempText}>{temperature}°</Text>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{weatherConditions[weather].title}</Text>
          <Text style={styles.subtitle}>
            {weatherConditions[weather].subtitle}
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>error occured while getting data</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {flex: 1},
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tempText: {
    fontSize: 60,
    color: '#fff',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 60,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
});
Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
};
export default Weather;
