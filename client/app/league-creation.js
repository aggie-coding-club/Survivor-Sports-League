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
        placeholderTextColor="#500000"
        textAlign='center'
        value={leagueName}
        onChangeText={setLeagueName}
      />
      <View style={styles.leagueSizeContainer}>
        <TouchableOpacity onPress={decreaseLeagueSize} style={styles.arrowButton}>
          <FontAwesome name="arrow-left" size={24} color="#A24857" />
        </TouchableOpacity>
        <Text style={styles.leagueSizeText}>Enter League Size: {leagueSize}</Text>
        <TouchableOpacity onPress={increaseLeagueSize} style={styles.arrowButton}>
          <FontAwesome name="arrow-right" size={24} color="#A24857" />
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
    backgroundColor: '#263650',
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
    color: '#000000',
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
  leagueSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrowButton: {
    padding: 10,
    shadowColor: '#A24857',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  leagueSizeText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#ffffff',
  },
  createButton: {
    backgroundColor: '#500000',
    marginTop: 20,
    paddingHorizontal: 70,
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#A24857',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default LeagueCreationScreen;
