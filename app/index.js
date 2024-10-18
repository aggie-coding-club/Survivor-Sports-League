import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/signup" asChild>
        <TouchableOpacity>
          <Text style={{ color: 'blue', fontSize: 18 }}>Go to Sign-Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Home;

