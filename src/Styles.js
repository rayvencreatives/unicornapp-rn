import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bgImageStyle: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  unicornStyle: {
    marginTop: 100,
    width: 120,
    height: 120,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  unicornHomeStyle: {
    marginTop: 0,
    width: 80,
    height: 80,
  },
  screenTitleStyle: {
    color: '#fff',
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainerStyle: {
    marginTop: 15,
    width: 280,
  },
  otherBtnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    height: 40
  },
  otherTextStyle: {
    color: '#fff',
    fontSize: 14,
  },
  preTitleStyle: {
    fontSize: 22,
    marginTop: 80,
    color: '#fff',
  },
  postTitleStyle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20
  },
  homeTitleStyle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  commonContainerStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  mediaBtnsContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  mediaBtnIconStyle: {
    width: 40,
    height: 40,
  },
  mediaBtnStyle: {
    width: 100,
    height: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  bgPink: {
    backgroundColor: '#ff327d',
  },
  semiPink: {
    backgroundColor: 'rgba(255, 50, 125, 0.5)'
  }
});
