import React from 'react';
import {StyleSheet, Alert, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {useAuthentication, useUser} from '../hooks/ApiHooks';
import useSignUpForm from '../hooks/RegisterHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import InputTextBox from '../components/InputTextBox';
import CustomButton from '../components/CustomButton';
import {Feather} from 'react-native-vector-icons';
import Colours from './../utils/Colours';

const RegisterForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {
    inputs,
    handleInputChange,
    handleInputEnd,
    checkUserAvailable,
    registerErrors,
    validateOnSend,
  } = useSignUpForm();
  const {postRegister} = useUser();
  const {postLogin} = useAuthentication();

  const doRegister = async () => {
    if (!validateOnSend()) {
      console.log('validator on send failed');
      return;
    }

    delete inputs.confirmPassword;

    try {
      const result = await postRegister(inputs);
      console.log('doRegister ok', result.message);
      Alert.alert(result.message);
      // do automatic login after registering
      const userData = await postLogin(inputs);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData.user);
    } catch (error) {
      console.log('registration error', error);
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <InputTextBox
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={(event) => {
          checkUserAvailable(event);
          handleInputEnd('username', event.nativeEvent.text);
        }}
        errorMessage={registerErrors.username}
        leftIcon={<Feather name="user" size={24} color={Colours.textDark} />}
      />
      <InputTextBox
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        onEndEditing={(event) =>
          handleInputEnd('password', event.nativeEvent.text)
        }
        secureTextEntry={true}
        errorMessage={registerErrors.password}
        leftIcon={<Feather name="lock" size={24} color={Colours.textDark} />}
      />
      <InputTextBox
        placeholder="confirm password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        onEndEditing={(event) =>
          handleInputEnd('confirmPassword', event.nativeEvent.text)
        }
        secureTextEntry={true}
        errorMessage={registerErrors.confirmPassword}
        leftIcon={<Feather name="lock" size={24} color={Colours.textDark} />}
      />
      <InputTextBox
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        onEndEditing={(event) =>
          handleInputEnd('email', event.nativeEvent.text)
        }
        errorMessage={registerErrors.email}
        leftIcon={<Feather name="mail" size={24} color={Colours.textDark} />}
      />
      <InputTextBox
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing={(event) =>
          handleInputEnd('full_name', event.nativeEvent.text)
        }
        errorMessage={registerErrors.full_name}
        leftIcon={<Feather name="users" size={24} color={Colours.textDark} />}
      />
      <CustomButton title="Register!" onPress={doRegister} />
    </ScrollView>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 60,
  },
});