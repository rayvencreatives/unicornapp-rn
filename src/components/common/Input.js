import React from 'react';
import { TextInput, View } from 'react-native';

const Input = (
  { value, onChangeText, placeholder, keyboardType,
    secureTextEntry, clearButtonMode, autoCapitalize }
) => (
    <View style={styles.containerStyle}>
      <TextInput
        clearButtonMode={clearButtonMode}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={styles.inputStyle}
        value={value}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholderTextColor='rgba(255,255,255,0.3)'
      />
    </View>
);

const styles = {
  inputStyle: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  }
};

export { Input };
