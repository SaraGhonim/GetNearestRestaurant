import React, {Component} from 'react';
import {Modal, ScrollView} from 'react-native';
import {Block, Text, Button} from './atoms';
import {theme} from './constants';
import {restaurants} from './constants/mocks';

class RenderNearest extends Component {
  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
    this.state = {
      click: 0,
      showNearest: true,
    };
  }

  select() {
    this.setState({showNearest: false}, () => {
      console.log('showNearest' + this.state.showNearest);
      this.props.changeState(this.state.showNearest);
    });
  }

  renderNearestService(Near) {
    return (
      <Modal animationType="slide" style={{height: 100}}>
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between">
          <ScrollView style={{marginVertical: theme.sizes.padding}}>
            <Text h2 bold style={{marginBottom: theme.sizes.base}}>
              {Near[0].name}{' '}
            </Text>
            <Text gray height={24} style={{marginBottom: theme.sizes.base}}>
              The Nearest Restaurant to your current Location is '
              {restaurants[Near[0].id].name}' in {restaurants[Near[0].id].place}
            </Text>
            <Button gradient onPress={this.select}>
              <Text h3 center semibold white>
                Back
              </Text>
            </Button>
          </ScrollView>
        </Block>
      </Modal>
    );
  }
  render() {
    const {Near} = this.props;
    return <React.Fragment>{this.renderNearestService(Near)}</React.Fragment>;
  }
}

export default RenderNearest;
