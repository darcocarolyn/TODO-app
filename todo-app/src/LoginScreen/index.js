import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');

      if (username === storedUsername && password === storedPassword) {
        navigation.navigate('TODO App', { username });
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        testID='login-username'
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        testID='login-register'
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
        value={password}
      />
        {loginError !== '' && <Text style={{padding: 10}}>{loginError}</Text>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}         
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20
  },
  buttonContainer: {
   flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'medium',
  },
  InputTitle: {
    justifyContent: 'flex-end'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
    margin: 10,
    width: '80%',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'medium',
    fontSize: 18,
  },
});

export default LoginScreen