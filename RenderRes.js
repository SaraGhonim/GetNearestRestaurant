import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Block, Text, Button} from './atoms';
import {theme} from './constants';

import {restaurants} from './constants/mocks';

class RenderRestaurants extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);

    this.state = {
      FlatListItems: restaurants,

      active: null,

      click: 1,
    };
  }
  select() {
    this.setState({click: 0}, () => {
      this.props.changeClick(this.state.click);
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
            paddingBottom: theme.sizes.base,
            marginHorizontal: 7,
          }}>
          <Block middle flex={0.5} margin={[0, theme.sizes.padding]}>
            <Button gradient onPress={this.select}>
              <Text h3 center semibold white>
                back
              </Text>
            </Button>
          </Block>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderRestaurants = item => {
    return (
      <TouchableWithoutFeedback
        key={`restaurant-${item.id}`}
        onPress={() => this.setState({active: item.id})}>
        <View style={[styles.restaurant, styles.shadow]}>
          {/* <View style={{flexDirection: 'row-reverse'}}> */}
          {/* 
          </View> */}
          <View style={{justifyContent: 'flex-start'}}>
            {/* <Image
              source={item.image}
              style={{width: item.width, height: item.height}}></Image> */}
            <Text h2 bold>
              {item.name}
            </Text>
            <Text>In {item.place}</Text>
            <Text>
              Price range between : {item.startingPrice} & {item.endingPrice}{' '}
              EGP
            </Text>
            <Text>Estimated time : {item.timeToarrive} min</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderRestaurantss = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.restaurants}
        data={this.state.FlatListItems}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => this.renderRestaurants(item)}
      />
    );
  };
  render() {
    return (
      <React.Fragment>
        {this.renderRestaurantss()}
        {this.renderButton()}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurants: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: theme.sizes.base * 3,
  },
  restaurant: {
    marginBottom: 40,
    backgroundColor: 'rgba(255,255,255,.8)',
    borderRadius: 20,
    padding: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
    width: 345 - 24 * 2,
  },
});

export default RenderRestaurants;
