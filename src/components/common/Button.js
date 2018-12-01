import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, style]}
    >
      <Text style={styles.textStyle}>
        { children }
      </Text>
    </TouchableOpacity>
  );

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 3,
  },
  buttonStyle: {
    backgroundColor: '#ff327d',
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  }
};

export { Button };
