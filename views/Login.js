import React, {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import AppLoading from 'expo-app-loading';
import {StyleSheet, Text, ImageBackground, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import TitleOutline from '../assets/svg/TitleOutline';

const Login = () => {
  const {loaded} = useContext(MainContext);

  if (!loaded) {
    console.log('loaded: ', loaded);
    return <AppLoading onError={console.warn} />;
  }
  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/images/loginBackground.png')}
    >
      <StatusBar backgroundColor="black" style="light" />
      <View style={styles.titleContainer}>
        <TitleOutline width="350" height="120" />
      </View>

      <Text style={styles.text}>Login Page</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 40,
  },
  text: {
    fontFamily: 'McLarenRegular',
    fontSize: 30,
    color: 'white',
  },
});

export default Login;
