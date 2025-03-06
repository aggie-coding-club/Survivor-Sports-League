import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

//All NFL Teams and their logos
const nflTeams = [
  { name: 'Arizona Cardinals', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ari.png' },
  { name: 'Atlanta Falcons', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/atl.png' },
  { name: 'Baltimore Ravens', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png' },
  { name: 'Buffalo Bills', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/buf.png' },
  { name: 'Carolina Panthers', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/car.png' },
  { name: 'Chicago Bears', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/chi.png' },
  { name: 'Cincinnati Bengals', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png' },
  { name: 'Cleveland Browns', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/cle.png' },
  { name: 'Dallas Cowboys', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/dal.png' },
  { name: 'Denver Broncos', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/den.png' },
  { name: 'Detroit Lions', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/det.png' },
  { name: 'Green Bay Packers', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500-dark/gb.png' },
  { name: 'Houston Texans', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/hou.png' },
  { name: 'Indianapolis Colts', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/ind.png' },
  { name: 'Jacksonville Jaguars', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/jax.png' },
  { name: 'Kansas City Chiefs', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png' },
  { name: 'Las Vegas Raiders', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500-dark/lv.png' },
  { name: 'Los Angeles Chargers', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/lac.png' },
  { name: 'Los Angeles Rams', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/lar.png' },
  { name: 'Miami Dolphins', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/mia.png' },
  { name: 'Minnesota Vikings', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/min.png' },
  { name: 'New England Patriots', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png' },
  { name: 'New Orleans Saints', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/no.png' },
  { name: 'New York Giants', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/nyg.png' },
  { name: 'New York Jets', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/nyj.png&h=200&w=200' },
  { name: 'Philadelphia Eagles', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/phi.png' },
  { name: 'Pittsburgh Steelers', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/pit.png' },
  { name: 'San Francisco 49ers', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png' },
  { name: 'Seattle Seahawks', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/sea.png' },
  { name: 'Tampa Bay Buccaneers', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/tb.png' },
  { name: 'Tennessee Titans', logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/ten.png' },
  { name: 'Washington Commanders', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png' },
];


// Mock data generator with random picks
const generateMockData = () => {
  const weeks = [];
  for (let i = 1; i <= 18; i++) {
    const players = [];
    for (let j = 1; j <= 5; j++) {
      const randomTeam = nflTeams[Math.floor(Math.random() * nflTeams.length)];
      const randomResult = Math.random() > 0.5 ? 'Win' : 'Loss';
      players.push({ id: `${i}-${j}`, name: `Player ${j}`, pick: randomTeam, result: randomResult });
    }
    weeks.push({ week: i, players });
  }
  return weeks;
};



const Standings = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation(); // Hook to access navigation
  const router = useRouter();

  const handleNavigateToPicks = () => {
    router.push('/picks');
  };
  

  useEffect(() => {
    const mockData = generateMockData();
    setData(mockData);
  }, []);

  const renderWeekSection = ({ week, players }) => (
    <View key={week} style={styles.weekSection}>
      <Text style={styles.weekTitle}>Week {week}</Text>
      <View style={styles.grid}>
        <View style={styles.gridHeader}>
          <Text style={styles.gridHeaderCell}>Player</Text>
          <Text style={styles.gridHeaderCell}>Pick</Text>
          <Text style={styles.gridHeaderCell}>Result</Text>
        </View>
        {players.map((player) => (
          <View key={player.id} style={styles.gridRow}>
            <Text style={styles.gridCell}>{player.name}</Text>
            <View style={styles.gridCell}>
              <Text style={styles.teamName}>{player.pick.name}</Text>
              <Image source={{ uri: player.pick.logo }} style={styles.teamLogo} />
            </View>
            <Text style={[styles.gridCell, player.result === 'Win' ? styles.win : styles.lose]}>
              {player.result === 'Win' ? 'WIN' : 'LOSE'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Pick Standings</Text>
        {data.map(renderWeekSection)}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Go to Picks" onPress={handleNavigateToPicks} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  weekSection: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  grid: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  gridHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  gridHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    color: '#333',
  },
  gridRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  gridCell: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    color: '#555',
  },
  teamLogo: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  win: {
    color: 'green',
    fontWeight: 'bold',
  },
  lose: {
    color: 'red',
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default Standings;
