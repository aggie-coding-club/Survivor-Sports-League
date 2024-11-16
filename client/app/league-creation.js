import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const LeagueCreationScreen = () => {
  const [leagueName, setLeagueName] = useState('');
  const [leagueSize, setLeagueSize] = useState(1);
  const router = useRouter();

  const handleCreateLeague = () => {
    if (leagueName && leagueSize >= 1 && leagueSize <= 10) {
      const cpuCount = leagueSize - 1;
      alert(`League "${leagueName}" created with ${cpuCount} CPUs`);
      // Navigate to next screen or confirm league creation
      router.push('/picks');
    } else {
      alert('Please enter a valid league name and league size between 1 and 10');
    }
  };

  const increaseLeagueSize = () => {
    if (leagueSize < 10) {
      setLeagueSize(leagueSize + 1);
    }
  };

  const decreaseLeagueSize = () => {
    if (leagueSize > 1) {
      setLeagueSize(leagueSize - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a League</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter League Name"
        value={leagueName}
        onChangeText={setLeagueName}
      />
      <View style={styles.leagueSizeContainer}>
        <TouchableOpacity onPress={decreaseLeagueSize} style={styles.arrowButton}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.leagueSizeText}>Enter League Size: {leagueSize}</Text>
        <TouchableOpacity onPress={increaseLeagueSize} style={styles.arrowButton}>
          <FontAwesome name="arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateLeague}>
        <Text style={styles.buttonText}>Create League</Text>
      </TouchableOpacity>
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
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  leagueSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrowButton: {
    padding: 10,
  },
  leagueSizeText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  createButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LeagueCreationScreen;
