import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import ImageSwipe from './components/ImageSwipe';

// Get device dimensions
const { width, height } = Dimensions.get('window');

const Welcome = () => {
  return (
    <View style={styles.container}>
      {/*Images to Swipe through above buttons*/}
      <ImageSwipe/>

      {/* signup button */}
      <Link href="/signup" asChild>
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>GET STARTED</Text>
        </TouchableOpacity>
      </Link>

      {/* login button */}
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>ALREADY HAVE AN ACCOUNT?</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

//style sheet for welcome page
const styles = StyleSheet.create({
  //green, yellow, and red theme for app

  container: {
    flex: 1,
    justifyContent: 'flex-end',  // Align all content at the bottom
    alignItems: 'center',
    backgroundColor: '#040d03', //dark green color
    paddingBottom: height * 0.06,
  },
  signupButton: {
    width: width * 0.8,
    paddingVertical: height * 0.0175,
    paddingHorizontal: width * 0.05,
    borderRadius: 25,
    backgroundColor: '#E63946',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  loginButton: {
    width: width * 0.8,
    paddingVertical: height * 0.005,
    paddingHorizontal: width * 0.05,
    borderRadius: 25,
    backgroundColor: '#040d03', //same color as container background
    alignItems: 'center',
  },
  loginText: {
    fontSize: width * 0.035,  
    fontWeight: 'bold',
    color: '#d0d1c7', //maroon color
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  signupText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#d0d1c7', //yellow color
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },

});

export default Welcome;


