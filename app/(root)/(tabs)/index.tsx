import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text className="text-blue-700 font-semibold font-rubik mt-20 text-4xl">
        Welcome To LetLease ashim vaiya
      </Text>
      <Link href="/sign-in">SignIn</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Property Details</Link>
    </View>
  );
}
