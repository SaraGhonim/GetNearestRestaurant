import React from 'react';
import { View, ActivityIndicator,TouchableWithoutFeedback } from 'react-native';

const Loading = ({ size }) => {
  return (

    <View style={styles.spinnerContainer}>
      <ActivityIndicator size={size} color={"#D83C54"}/>
    </View>

  );
};

const styles = {
  spinnerContainer: {
    flex: -1,
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'center',
// position: 'absolute',
//             right: 0,
//             left: 0,
//             bottom: 0,
//             paddingBottom: 10,
//             marginHorizontal: 7,
  }
};

export default Loading ;