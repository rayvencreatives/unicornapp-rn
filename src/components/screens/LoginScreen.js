import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { Input, Button } from '../common';
import Styles from '../../Styles';

class LoginScreen extends Component {

  state = {
    email: '',
    password: '',
    emailValid: false,
    passwordValid: false,
    users: []
  };

  componentDidMount() {
    AsyncStorage.getItem('users').then((value) => {
      if (value) {
        this.setState({ users: JSON.parse(value) });
      }
    });
  }

  changeToRegister() {
    this.props.navigation.navigate('Register');
  }

  validateEmail(email) {
    this.setState({ email });
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/;
    const result = pattern.test(email);
    if (result === true) {
      this.setState({ emailValid: true });
    } else {
      this.setState({ emailValid: false });
    }
  }

  validatePassword(password) {
    this.setState({ password });
    if (password.length >= 6) {
      this.setState({ passwordValid: true });
    } else {
      this.setState({ passwordValid: false });
    }
  }

  loginPressed() {
    if (!this.state.emailValid) {
      Alert.alert('Email Not Valid', 'Please enter a valid email address');
    } else if (!this.state.passwordValid) {
      Alert.alert('Password Not Valid', 'Please enter at least 6 characters for password');
    } else if (this.state.users) {
      let userFound = false;
      for (let i = 0; i < this.state.users.length; i++) {
        if (this.state.users[i]) {
          if (this.state.users[i].email === this.state.email) {
            userFound = true;
            if (this.state.users[i].password === this.state.password) {
              this.props.navigation.navigate('HomeScreen', {
                currentUser: this.state.users[i]
              });
              break;
            } else {
              Alert.alert('Unable to login', 'Password is Incorrect');
              break;
            }
          }
        }
      }
      if (!userFound) {
        Alert.alert('Unable to login', `User with email ${this.state.email} does not exist`);
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
         style={styles.bgImageStyle}
         source={global.image_bg1}
        />
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <Image
           style={[styles.unicornStyle, { marginBottom: 60 }]}
           source={global.image_unicorn}
          />
          <View style={styles.inputContainerStyle}>
            <Input
              placeholder="Email Address"
              value={this.state.email}
              clearButtonMode="while-editing"
              autoCapitalize='none'
              onChangeText={(text) => this.validateEmail(text)}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <Input
              secureTextEntry
              placeholder="Password"
              value={this.state.password}
              clearButtonMode="while-editing"
              onChangeText={(text) => this.validatePassword(text)}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <Button
              onPress={
                this.loginPressed.bind(this)}
                style={this.state.emailValid && this.state.passwordValid ?
                  { } : { backgroundColor: 'rgba(255, 50, 125, 0.2)' }
              }
            >LOGIN</Button>
          </View>
          <TouchableOpacity
            onPress={this.changeToRegister.bind(this)} style={styles.otherBtnStyle}
          >
            <Text style={[styles.otherTextStyle, { fontWeight: '300' }]}>
              {'Don\'t have an account yet? '}</Text>
            <Text style={[styles.otherTextStyle, { fontWeight: '700' }]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = Styles;

export default LoginScreen;
