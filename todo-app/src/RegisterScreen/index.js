import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';

function RegisterScreen() {
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    email: '',
    zipCode: '',
    selectedRadio: ''
  });

  const [errorMessage, setErrorMessage] = useState({
    firstNameError: '',
    lastNameError: '',
    usernameError: '',
    phoneNumberError: '',
    passwordError: '',
    confirmPasswordError: '',
    emailError: '',
    zipCodeError: '',
    selectedRadioError: ''
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);


  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const isValidInput = () => {
    return Object.values(formData).every(value => value);
  };

  const handleBlur = (name) => {
  switch (name) {
    case 'firstName':
      const nameRegex = /^[^\d=?\\/@#%^&*()]+$/;
      if (!nameRegex.test(formData.firstName)) {
        setErrorMessage({...errorMessage, firstNameError: 'Error: Invalid first name'});
      } else {
        setErrorMessage({...errorMessage, firstNameError: ''});
      }
      break;
    case 'lastName':
      const lastNameRegex = /^[^\d=?\\/@#%^&*()]+$/;
      if (!lastNameRegex.test(formData.lastName)) {
        setErrorMessage({...errorMessage, lastNameError: 'Error: Invalid last name'});
      } else {
        setErrorMessage({...errorMessage, lastNameError: ''});
      }
      break;
    case 'username':
      const usernameRegex = /^[a-zA-Z0-9]+$/;
      if (!usernameRegex.test(formData.username)) {
        setErrorMessage({...errorMessage, usernameError: 'Error: Invalid username'});
      } else {
        setErrorMessage({...errorMessage, usernameError: ''});
      }
      break;
    case 'phoneNumber':
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
      if (!phoneRegex.test(formData.phoneNumber)) {
        setErrorMessage({...errorMessage, phoneNumberError: 'Error: Invalid phone number'});
      } else {
        setErrorMessage({...errorMessage, phoneNumberError: ''});
      }
      break;
    case 'password':
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{4,}$/;
      if (!passwordRegex.test(formData.password)) {
        setErrorMessage({...errorMessage, passwordError: 'Error: Invalid password'});
      } else {
        setErrorMessage({...errorMessage, passwordError: ''});
      }
      break;
    case 'confirmPassword':
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage({...errorMessage, confirmPasswordError: 'Error: Passwords do not match'});
      } else {
        setErrorMessage({...errorMessage, confirmPasswordError: ''});
      }
      break;
    case 'email':
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage({...errorMessage, emailError: 'Error: Invalid email'});
      } else {
        setErrorMessage({...errorMessage, emailError: ''});
      }
      break;
    case 'zipCode':
      const zipCodeRegex = /^\d{5}$/;
      if (!zipCodeRegex.test(formData.zipCode)) {
        setErrorMessage({...errorMessage, zipCodeError: 'Error: Invalid zip code'});
      } else {
        setErrorMessage({...errorMessage, zipCodeError: ''});
      }
      break;
    case 'selectedRadio':
  if (!formData.selectedRadio) {
    setErrorMessage({...errorMessage, selectedRadioError: 'Error: Please select an option'});
  } else {
    setErrorMessage({...errorMessage, selectedRadioError: ''});
  }
  break;
    default:
      break;
  }
};
 

  const handleRegisterPress = async () => {
    
    try {
      await AsyncStorage.setItem('username', formData.username);
      await AsyncStorage.setItem('password', formData.password);
      console.log('Registration successful!');
      console.log(formData.username, formData.password);
      setRegistrationSuccess(true);

    } catch (error) {
      console.log(error);
    }
  };
  const inputFields = [
  {
    label: 'First Name',
    testID: 'firstname',
    name: 'firstName',
    placeholder: 'First Name...',
    errorMessage: errorMessage.firstNameError,
    value: formData.firstName,
  },
  {
    label: 'Last Name',
    testID: 'lastname',
    name: 'lastName',
    placeholder: 'Last Name...',
    errorMessage: errorMessage.lastNameError,
    value: formData.lastName,
  },
  {
    label: 'Username',
    testID: 'username',
    name: 'username',
    placeholder: 'Username...',
    errorMessage: errorMessage.usernameError,
    value: formData.username,
  },
  {
    label: 'Phone Number',
    testID: 'phoneNumber',
    name: 'phoneNumber',
    placeholder: 'Phone Number...',
    errorMessage: errorMessage.phoneNumberError,
    value: formData.phoneNumber,
  },
  {
    label: 'Password',
    testID: 'password',
    name: 'password',
    placeholder: 'Password...',
    errorMessage: errorMessage.passwordError,
    value: formData.password,
  },
  {
    label: 'Confirm Password',
    testID: 'confirmPassword',
    name: 'confirmPassword',
    placeholder: 'Confirm Password...',
    errorMessage: errorMessage.confirmPasswordError,
    value: formData.confirmPassword,
  },
  {
    label: 'Email',
    testID: 'email',
    name: 'email',
    placeholder: 'Email...',
    errorMessage: errorMessage.emailError,
    value: formData.email,
  },
  {
    label: 'Zip Code',
    testID: 'zipCode',
    name: 'zipCode',
    placeholder: 'Zip Code...',
    errorMessage: errorMessage.zipCodeError,
    value: formData.zipCode,
  },
];

    return (
    <View style={styles.container}>
  {inputFields.map(({ label, name, ...props }) => (
    <View key={name}>
      <Text style={styles.InputTitle}>{label}</Text>
      <TextInput
        testID={name}
        style={styles.input}
        placeholder={label}
        onChangeText={(value) => handleInputChange(name, value)}
        onBlur={() => handleBlur(name)}
        value={formData[name]}
        name={name}
        {...props}
      />
      {errorMessage[`${name}Error`] !== "" && (
        <Text style={styles.error}>{errorMessage[`${name}Error`]}</Text>
      )}
    </View>
  ))}
  <Text style={styles.InputTitle}>Subscribe to newsletter?</Text>
  <View style={styles.radioContainer}>
    <Text>Yes</Text>
    <RadioButton
      testID="newsletter"
      style={styles.radio}
      value="yes"
      status={formData.selectedRadio === "yes" ? "checked" : "unchecked"}
      onPress={() => handleInputChange("selectedRadio", "yes")}
    />
    {errorMessage.selectedRadioError !== "" && (
      <Text>{errorMessage.selectedRadioError}</Text>
    )}
    <Text>No</Text>
    <RadioButton
      testID="newsletter"
      style={styles.radio}
      value="no"
      status={formData.selectedRadio === "no" ? "checked" : "unchecked"}
      onPress={() => handleInputChange("selectedRadio", "no")}
    />
    {errorMessage.selectedRadioError !== "" && (
      <Text>{errorMessage.selectedRadioError}</Text>
    )}
  </View>
  <Text style={styles.buttonContainer}>
    {isValidInput() && (
      <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    )}
  </Text>
  {registrationSuccess && (
    <View style={styles.registerText}>
      <Text>Registration Successful!</Text>
    </View>
  )}
</View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'medium',
  },
  InputTitle: {
    justifyContent: 'center',
    marginLeft: "-9%",
    fontWeight: 'medium'
  },
  input: {
    borderWidth: 1,
    padding: 4,
    margin: 10,
    width: '500%',
    marginLeft: "-230%",
    borderRadius: 5,
    borderWidth: 2
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 5,
    justifyContent: 'flex-end',
    marginLeft: "-9%",
  },
  buttonContainer: {
  justifyContent: 'flex-end',
    marginLeft: "-9%",
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'medium',
    fontSize: 18,
  },
  registerText: {
  justifyContent: 'flex-end',
    marginLeft: "-9%",
  },
  radioContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: 'center',
    marginLeft: "-9%",
  },
  radio: {
    flexDirection: "row"
  },
  error: {
marginLeft: "-20%"
  }
});

export default RegisterScreen
