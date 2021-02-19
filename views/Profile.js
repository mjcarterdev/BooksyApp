import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AppLoading from 'expo-app-loading';
import {StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {StatusBar} from 'expo-status-bar';
import PropTypes from 'prop-types';
import Colours from './../utils/Colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AccountInfoHeader from '../components/AccountInfoHeader';
import AccountInfoCard from '../components/AccountInfoCard';
import CustomButton from '../components/CustomButton';
import AccountStatisticCard from '../components/AccountStatisticCard';
import {uploadsUrl} from '../utils/Variable';
import {useTag, useUser} from '../hooks/ApiHooks';
import SectionHeader from './../components/AccountInfoHeader';

const Profile = ({navigation}) => {
  const {loaded, setIsLoggedIn, user, setUser, update} = useContext(
    MainContext
  );
  const {getFilesByTag} = useTag();
  const {checkCurrentUserToken} = useUser();
  const [avatar, setAvatar] = useState('http://placekitten.com/640');

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
  };

  if (!loaded) {
    console.log('loaded: ', loaded);
    return <AppLoading onError={console.warn} />;
  }

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarList = await getFilesByTag('avatar_' + user.user_id);
        if (avatarList.length > 0) {
          setAvatar(uploadsUrl + avatarList.pop().filename);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAvatar();
  }, []);

  useEffect(() => {
    const updateUserData = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        try {
          const userData = await checkCurrentUserToken(userToken);
          setUser(userData);
        } catch (error) {
          console.error(error.message);
        }
      }
    };
    updateUserData();
  }, [update]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="black" style="light" />
      <Avatar
        size={250}
        source={{
          uri: avatar,
        }}
        imageProps={{
          borderRadius: 5,
          borderWidth: 3,
          borderColor: Colours.accentOrange,
        }}
      ></Avatar>

      <AccountInfoHeader
        content="Account Information"
        toggleIcon
        navigation={navigation}
      />
      <AccountInfoCard accountInfo={user} />
      <SectionHeader content="Account Statistics" />
      <AccountStatisticCard />
      <SectionHeader content="Current Posts" />
      <SectionHeader content="Books Swapped" />

      <CustomButton
        extraStyle={styles.logoutBtn}
        title="Logout"
        onPress={() => {
          logout();
        }}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colours.secondaryNeutral,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 60,
  },
  text: {
    fontFamily: 'ProximaSoftMedium',
    fontSize: 30,
  },
  editIcon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderWidth: 0,
    borderRadius: 50,
    padding: 5,
    backgroundColor: Colours.accentOrange,
    color: Colours.primaryBlue,
    elevation: 2,
  },
  logoutBtn: {
    width: '91%',
    marginRight: 20,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
