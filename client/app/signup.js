import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const SignUpScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    // Validate user input if necessary
    if (userName && password) {
      // Navigate to League Creation Screen
      router.push('/league-creation');
    } else {
      alert('Please enter a valid username and password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        placeholderTextColor="#500000"  // Adjust color for better visibility
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#500000"  // Adjust color for better visibility
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.arrowButton} onPress={handleContinue}>
        <FontAwesome name="arrow-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#263650', 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
    shadowColor: '#500000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 10,
  },
  input: {
    width: '85%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#500000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
    marginBottom:50,
  },
  arrowButton: {
    marginTop: 20,
    paddingHorizontal: 70,
    backgroundColor: '#500000',
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A24857',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default SignUpScreen;