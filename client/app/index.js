import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Survivor League!</Text>
      <Text style={styles.description}>
        Join a league, make your weekly picks, and see if you can survive the season.
      </Text>
      
      {/* Navigation Links for Sign Up and Log In */}
      <Link href="/signup" asChild>
        <Button title="Sign Up" />
      </Link>

      <Link href="/login" asChild>
        <Button title="Log In" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default Welcome;


