import { View, Text, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import icons from "@/constants/icons";

interface Props {
  item: Models.Document;
}

const Comment = ({ item }: Props) => {
  return (
    <View className="flex gap-2 w-full">
      <View className="flex flex-row gap-3 items-center">
        <Image source={{ uri: item.avatar }} className="size-14 rounded-full" />
        <Text className="font-rubik-bold text-black-300 text-base">
          {item.name}
        </Text>
      </View>
      <Text className="text-black-200 font-rubik">{item.review}</Text>

      <View className="mt-4 flex flex-row justify-between items-center">
        <View className="flex flex-row items-center gap-2">
          <Image
            source={icons.heart}
            className="size-5"
            tintColor={"#0061FF"}
          />
          <Text className="text-black-300 text-sm font-rubik-medium mt-0.5">
            100
          </Text>
        </View>

        <Text className="text-black-100 text-sm font-rubik">
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
