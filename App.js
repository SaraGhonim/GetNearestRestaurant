import React, {Component} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import MapView, {
  ProviderPropType,
  Marker,
  Polyline,
  AnimatedRegion,
} from 'react-native-maps';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {Block, Text, Button, Loading} from './atoms';
import {restaurants} from './constants/mocks';
import RenderRestaurants from './RenderRes.js';
import RenderNearest from './modal.js';

class Inputs extends Component {
  state = {
    isLoading: true,
    finding: false,
    showTerms1: false,
    Nearest: null,
    clicked: 0,
    latlng: new AnimatedRegion({latitude: 31.0, longitude: 30.79}),
  };

  changeState = showTerms1 => {
    this.setState({showTerms1: showTerms1});
  };
  changeClick = clicked => {
    this.setState({clicked: clicked});
  };

  async componentDidMount() {
    //Geolocation.requestAuthorization();
    await this.requestLocationPermission();
    Geolocation.getCurrentPosition(info => {
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        isLoading: false,
      });
    });
  }

  renderButton = () => {
    return (
      <TouchableWithoutFeedback>
        <View
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 0,
            paddingBottom: 10,
            marginHorizontal: 7,
          }}>
          <Block middle flex={0.5} margin={10}>
            <Button
              onPress={() => {
                this.setState({clicked: 1});
                console.log('clicked' + this.state.clicked);
              }}>
              <Text h3 center semibold white>
                Near by Restaurants
              </Text>
            </Button>
            <Button gradient onPress={this.find}>
              <Text h3 center semibold white>
                Find Nearest Restaurant
              </Text>
            </Button>

            {this.state.showTerms1 && (
              <RenderNearest
                changeState={this.changeState}
                Near={this.state.Nearest}
              />
            )}
          </Block>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  deg2rad = deg => {
    return deg * (Math.PI / 180);
  };
  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  find = () => {
    console.log('lat:' + this.state.latitude + ' long:' + this.state.longitude);
    // this.setState({isLoading:true})
    let distances = [];
    let places = [];
    restaurants.map(restaurant => {
      let c = this.getDistanceFromLatLonInKm(
        this.state.latitude,
        this.state.longitude,
        restaurant.coordinate.latitude,
        restaurant.coordinate.longitude,
      );
      console.log('distance between you and ' + restaurant.name + ' ' + c);
      places.push({id: restaurant.id, name: restaurant.name, distance: c});
      distances.push(c);
    });

    distances.sort(function(a, b) {
      return a - b;
    });

    let x = places.filter(place => {
      return place.distance === distances[0];
    });
    this.setState({Nearest: x}, () => {
      console.log(this.state.Nearest);
      console.log(x);
      this.setState({showTerms1: true});
    });
  };

  async requestLocationPermission() {
    try {
      let granted = 0;
      console.log(granted);

      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'App needs access to your Location ' + 'so you can request rides.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You Can use The location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <MapView
            showsMyLocationButton
            style={styles.map}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.00506,
              longitudeDelta: 0.00506,
            }}>
            {this.state.finding ? <Loading /> : null}
            <Marker
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}>
              <View style={styles.myMarker}>
                <View style={styles.myMarkerDot} />
              </View>
            </Marker>

            {restaurants.map(restaurant => (
              <Marker
                pinColor="green"
                key={`marker-${restaurant.id}`}
                coordinate={restaurant.coordinate}
              />
            ))}

            {/* <Polyline
              coordinates={this.state.routeCoordinates}
              strokeWidth={5}
            /> */}
          </MapView>
        )}
        {this.state.clicked === 0 ? this.renderButton() : null}
        {this.state.clicked === 1 ? (
          <RenderRestaurants changeClick={this.changeClick} />
        ) : null}
      </View>
    );
  }
}
Inputs.propTypes = {
  provider: ProviderPropType,
};
export default Inputs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 3,
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(201, 53, 50, 0.1)',
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#D83C54',
  },
});
