import React, { Component } from 'react';
import { View, Image, Text, Animated, TouchableOpacity,
  Dimensions, Platform, ActivityIndicator } from 'react-native';
import Sound from 'react-native-sound';
import { Button } from '../common';
import Styles from '../../Styles';

class HomeScreen extends Component {

  state = {
    name: '',
    offsetX: new Animated.Value(0),
    animating: false,
    playBtnActive: false,
    stopBtnActive: false,
    usePlayIcon: true,
    musicReady: false,
  }


  componentDidMount() {
    this.setState({
      name: this.props.navigation.state.params.currentUser.name,
      track: new Sound('http://rayvencreatives.com/work/mycrew/assets/unicorn.mp3', null, (e) => {
        if (e) {
          console.log('error loading track:', e);
        }
        this.setState({ playBtnActive: true, musicReady: true });
      })
    });
    this.startPosition();
  }

  startPosition() {
    Animated.timing(this.state.offsetX, {
      toValue: (deviceWidth / 2) + 40,
      duration: 0
    }).start();
  }

  cycleAnimation() {
    Animated.timing(this.state.offsetX, {
      toValue: -(deviceWidth / 2) - 40,
      duration: 1500,
    }).start(() => {
      if (this.state.animating === true) {
        this.startPosition();
        this.cycleAnimation();
      }
    });
  }

  pausePausePressed() {
    if (this.state.animating) {
      this.setState({ animating: false, usePlayIcon: true }, () => {
        this.state.track.pause();
        this.state.offsetX.stopAnimation();
      });
    } else {
      if (this.state.stopBtnActive) {
        this.state.track.play();
      } else {
        if (Platform.OS === 'ios') {
          this.state.track.setNumberOfLoops(-1);
        }
        this.state.track.play(() => {
          if (Platform.OS === 'ios') {
            this.state.track.play();
          }
        });
      }
      this.setState({ animating: true, usePlayIcon: false, stopBtnActive: true }, () => {
        this.cycleAnimation();
      });
    }
  }

  stopPressed() {
    this.setState({ animating: false, usePlayIcon: true, stopBtnActive: false }, () => {
      this.state.track.stop();
      this.startPosition();
      this.state.offsetX.stopAnimation();
    });
  }

  logout() {
    this.state.track.stop();
    this.stopPressed();
    this.props.navigation.navigate('LoginScreen');
  }

  renderIndicator() {
    if (!this.state.musicReady) {
      return (
        <View>
          <ActivityIndicator size="large" color={'#000'} />
          <Text>Downloading Song GGGG</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
         style={[styles.bgImageStyle]}
         source={global.image_bg2}
        />
        <View style={[styles.commonContainerStyle, {}]}>
            <Text style={styles.preTitleStyle}>Welcome</Text>
          <Text style={styles.homeTitleStyle}>{this.state.name}</Text>
            <Text style={styles.postTitleStyle}>to</Text>
          <Image
           style={[styles.unicornStyle, styles.unicornHomeStyle]}
           source={global.image_unicorn}
          />
          <Text style={styles.postTitleStyle}>Paradise!</Text>
          <View style={styles.mediaBtnsContainerStyle}>
            <TouchableOpacity
              disabled={!this.state.playBtnActive}
              style={[
                styles.mediaBtnStyle,
                this.state.playBtnActive ? styles.bgPink : styles.semiPink]}
              onPress={this.pausePausePressed.bind(this)}
            >
             <Image
              style={[styles.mediaBtnIconStyle]}
              source={this.state.usePlayIcon ? global.image_btn_play : global.image_btn_pause}
             />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!this.state.playBtnActive}
              style={[
                styles.mediaBtnStyle,
                this.state.stopBtnActive ? styles.bgPink : styles.semiPink]}
              onPress={this.stopPressed.bind(this)}
            >
             <Image
              style={[styles.mediaBtnIconStyle]}
              source={global.image_btn_stop}
             />
            </TouchableOpacity>
          </View>
          <View style={[{ alignItems: 'center' }]}>
            {this.renderIndicator()}
            <Animated.Image
              source={global.image_unicorn_anim}
              style={[
                styles.unicornStyle,
                styles.unicornHomeStyle,
                { transform: [{ translateX: this.state.offsetX }] }
              ]}
            />
          </View >
        </View>
        <View style={{ width: 300, alignSelf: 'center', marginBottom: 30 }}>
          <Button
            onPress={this.logout.bind(this)}
            style={[styles.bgPink]}
          >LOG OUT</Button>
        </View>
      </View>
    );
  }
}

const styles = Styles;

const deviceWidth = Dimensions.get('window').width;

export default HomeScreen;
