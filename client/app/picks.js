// Picks.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const weeks = Array.from({ length: 18 }, (_, i) => `Week ${i + 1}`);

const matchups = [
    {
      day: 'THU, 9/5',
      quarter: 'Final',
      team1: {
        name: 'Baltimore Ravens',
        abbreviation: 'BAL',
        logo: 'https://content.sportslogos.net/logos/7/153/thumbs/318.gif',
        record: '0-0',
        score: 20,
        winProbability: 60,
      },
      team2: {
        name: 'Kansas City Chiefs',
        abbreviation: 'KC',
        logo: 'https://content.sportslogos.net/logos/7/162/thumbs/857.gif',
        record: '0-0',
        score: 27,
        winProbability: 40,
      },
    },
    {
      day: 'SUN, 9/8',
      quarter: 'Final',
      team1: {
        name: 'Pittsburgh Steelers',
        abbreviation: 'PIT',
        logo: 'https://content.sportslogos.net/logos/7/156/thumbs/970.gif',
        record: '0-0',
        score: 18,
        winProbability: 55,
      },
      team2: {
        name: 'Atlanta Falcons',
        abbreviation: 'ATL',
        logo: 'https://content.sportslogos.net/logos/7/173/thumbs/299.gif',
        record: '0-0',
        score: 10,
        winProbability: 45,
      },
    },
    {
      day: 'FRI, 9/6',
      quarter: 'Final',
      team1: {
        name: 'Green Bay Packers',
        abbreviation: 'GB',
        logo: 'https://content.sportslogos.net/logos/7/171/thumbs/dcy03myfhffbki5d7il3.gif',
        record: '0-0',
        score: 29,
        winProbability: 50,
      },
      team2: {
        name: 'Philadelphia Eagles',
        abbreviation: 'PHI',
        logo: 'https://content.sportslogos.net/logos/7/167/thumbs/960.gif',
        record: '0-0',
        score: 34,
        winProbability: 50,
      },
    },
    // Add more matchups here
  ];

const Picks = () => {
  const [selectedWeek, setSelectedWeek] = useState(weeks[0]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamSelection = (team) => {
    if (!selectedTeam || !team.hasPlayed) {
      setSelectedTeam(team);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.weeksContainer}>
        {weeks.map((week) => (
          <TouchableOpacity key={week} onPress={() => setSelectedWeek(week)}>
            <Text style={[styles.week, selectedWeek === week && styles.selectedWeek]}>{week}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.matchupsContainer}>
        {matchups.map((matchup, index) => (
          <View key={index} style={styles.matchup}>
            <View style={styles.matchupHeader}>
              <Text style={styles.day}>{matchup.day}</Text>
              <Text style={styles.quarter}>{matchup.quarter}</Text>
            </View>
            <View style={styles.scoresContainer}>
              <View style={styles.team}>
                <View style={styles.logoContainer}>
                  <Image source={{ uri: matchup.team1.logo }} style={styles.logo} />
                </View>
                <Text style={styles.abbreviation}>{matchup.team1.abbreviation}</Text>
                <Text style={styles.score}>{matchup.team1.score}</Text>
              </View>
              <Text style={styles.vs}>|</Text>
              <View style={styles.team}>
                <View style={styles.logoContainer}>
                  <Image source={{ uri: matchup.team2.logo }} style={styles.logo} />
                </View>
                <Text style={styles.abbreviation}>{matchup.team2.abbreviation}</Text>
                <Text style={styles.score}>{matchup.team2.score}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  weeksContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  week: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  selectedWeek: {
    fontWeight: 'bold',
    color: 'blue',
  },
  matchupsContainer: {
    padding: 10,
  },
  matchup: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  matchupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quarter: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  team: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  abbreviation: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  vs: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default Picks;