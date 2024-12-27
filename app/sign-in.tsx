import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.home}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Elevare
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get you closer to {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <TouchableOpacity className="bg-white border shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 flex flex-row items-center justify-center">
            <Image source={icons.google} className="w-6 h-6" />

            <Text className="text-lg font-rubik-medium text-black-300 ml-3 mt-1">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
