import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { Input, Button } from '../common';
import Styles from '../../Styles';

class RegisterScreen extends Component {

  state = {
    email: '',
    password: '',
    name: '',
    emailValid: false,
    passwordValid: false,
    nameValid: false,
    users: []
  };

  componentDidMount() {
    AsyncStorage.getItem('users').then((value) => {
      if (value) {
        this.setState({ users: JSON.parse(value) });
      }
    });
  }

  changeToLogin() {
    this.props.navigation.navigate('LoginScreen', {
      currentUser: 'Ray'
    });
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

  validateName(name) {
    this.setState({ name });
    const pattern = /^[a-zA-Z\s]*$/;
    const result = pattern.test(name);
    if (result === true) {
      this.setState({ nameValid: true });
    } else {
      this.setState({ nameValid: false });
    }
  }

  registerPressed() {
    if (!this.state.emailValid) {
      Alert.alert('Email Not Valid', 'Please enter a valid email address');
    } else if (!this.state.passwordValid) {
      Alert.alert('Password Not Valid', 'Please enter at least 6 characters for password');
    } else if (!this.state.nameValid) {
      Alert.alert('Name Not Valid', 'Name must only contain letters');
    } else {
      let allowRegister = true;
      if (this.state.users) {
        for (let i = 0; i < this.state.users.length; i++) {
          if (this.state.users[i]) {
            if (this.state.users[i].email === this.state.email) {
              Alert.alert('Unable to register', 'User with the same email address already exist');
              allowRegister = false;
              break;
            }
          }
        }
      }
      if (allowRegister) {
        const newUser = {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        };
        const userState = [...this.state.users, newUser];
        AsyncStorage.setItem('users', JSON.stringify(userState));
        this.props.navigation.navigate('HomeScreen', {
          currentUser: newUser
        }, () => {
          this.setState({ email: '', password: '', name: '' });
        });
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
           style={styles.unicornStyle}
           source={global.image_unicorn}
          />
          <Text style={styles.screenTitleStyle}>Create New Account</Text>
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
              clearButtonMode="while-editing"
              value={this.state.password}
              onChangeText={(text) => this.validatePassword(text)}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <Input
              placeholder="Name"
              value={this.state.name}
              clearButtonMode="while-editing"
              autoCapitalize="words"
              onChangeText={(text) => this.validateName(text)}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <Button
              onPress={this.registerPressed.bind(this)}
              style={this.state.emailValid && this.state.passwordValid && this.state.nameValid ?
                { } : styles.semiPink}
            >REGISTER</Button>
          </View>
          <TouchableOpacity
            onPress={this.changeToLogin.bind(this)} style={styles.otherBtnStyle}
          >
            <Text style={[styles.otherTextStyle, { fontWeight: '300' }]}>
              Already have an account? </Text>
            <Text style={[styles.otherTextStyle, { fontWeight: '700' }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = Styles;

export default RegisterScreen;
