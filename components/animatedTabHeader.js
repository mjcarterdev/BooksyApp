import React, {useRef, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import {MainContext} from '../contexts/MainContext';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const AnimatedTabHeader = () => {
  const tabAnimation1 = require('../assets/lottie/WatchingNoText.json');
  const tabAnimation2 = require('../assets/lottie/MyPostNoText.json');

  const watchingAnimation = useRef();
  const myPostAnimation = useRef();
  const {isWatchingVisible, setIsWatchingVisible} = useContext(MainContext);

  const playWatchingAnimation = () => {
    watchingAnimation.current.play(0, 149);
  };

  const playMyPostAnimation = () => {
    myPostAnimation.current.play(0, 149);
  };

  useEffect(() => {
    isWatchingVisible ? playWatchingAnimation() : playMyPostAnimation();
  }, [isWatchingVisible]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" style="light" />
      <View style={styles.componentContainer}>
        <View style={styles.animationContainer}>
          {isWatchingVisible ? (
            <LottieView
              ref={watchingAnimation}
              source={tabAnimation1}
              loop={false}
              autoPlay={false}
              progress={0}
              style={styles.animation}
              speed={1.5}
            />
          ) : (
            <LottieView
              ref={myPostAnimation}
              source={tabAnimation2}
              loop={false}
              autoPlay={false}
              progress={0}
              style={[styles.animation, {marginLeft: 0}]}
              speed={1.5}
            />
          )}
        </View>
        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsWatchingVisible(true);
              console.log('pressed');
            }}
          >
            <Text style={styles.text}>Watching</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsWatchingVisible(false);
              console.log('pressed');
            }}
          >
            <Text style={styles.text}>My Posts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  componentContainer: {},
  animationContainer: {
    width: windowWidth * 0.91,
    marginLeft: 20,
    overflow: 'hidden',
  },
  animation: {
    width: windowWidth * 1.1,
    marginLeft: -3,
  },
  textContainer: {
    width: windowWidth * 0.7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 50,
    position: 'absolute',
    top: 10,
  },
  text: {
    fontFamily: 'ProximaSoftRegular',
    fontSize: 24,
    marginRight: 50,
  },
});

export default AnimatedTabHeader;