import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { categories } from "@/constants/data";

interface Props {
  visibility: boolean;
  onClose: () => void;
}

const FilterModal = ({ visibility, onClose }: Props) => {
  const { height } = Dimensions.get("window");

  const [filterPropertyTypes, setFilterPropertyTypes] = useState<string[]>([]);
  const [details, setDetails] = useState({ bedrooms: 0, bathrooms: 0 });

  const handlePropertyTypeFilter = (propertyType: string) => {
    setFilterPropertyTypes(
      (prev) =>
        prev.includes(propertyType)
          ? prev.filter((type) => type !== propertyType) // Remove if already selected
          : [...prev, propertyType] // Add if not selected
    );
  };

  const handleIncrementDecrement = (
    field: "bedrooms" | "bathrooms",
    action: "increment" | "decrement"
  ) => {
    setDetails((prev) => ({
      ...prev,
      [field]:
        action === "increment"
          ? prev[field] + 1
          : prev[field] > 0
            ? prev[field] - 1
            : 0, // Ensure value doesn't go below 0
    }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
      visible={visibility}
    >
      <View
        style={{ height: height / 1.15 }}
        className="absolute bottom-0 w-full bg-slate-100 rounded-t-2xl border border-t-gray-500 p-5 h-full"
      >
        {/* Header */}
        <View className="flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={onClose}
            className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
          >
            <Image source={icons.backArrow} className="size-5" />
          </TouchableOpacity>

          <Text className="font-rubik-medium text-black-300 text-xl">
            Filter
          </Text>

          <TouchableOpacity onPress={() => setFilterPropertyTypes([])}>
            <Text className="text-primary-300 font-rubik-medium text-lg">
              Reset
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="h-auto" showsVerticalScrollIndicator={false}>
          {/* Price Range */}
          <View className="mt-10">
            <Text className="text-black-300 font-rubik-semibold text-lg">
              Price Range
            </Text>
            <View className="mt-5">
              <Image source={images.barChart} className="w-full h-20" />
            </View>
          </View>

          {/* Property Type */}
          <View className="mt-10">
            <Text className="text-black-300 font-rubik-semibold text-lg">
              Property Type
            </Text>
            <View className="mt-5 flex flex-row gap-3 w-full flex-wrap">
              {categories.slice(1).map((category, index) => (
                <TouchableOpacity
                  key={index}
                  className={`w-auto h-auto rounded-full px-5 py-2.5 ${
                    filterPropertyTypes.includes(category.title)
                      ? "bg-blue-500"
                      : "bg-primary-200"
                  }`}
                  onPress={() => handlePropertyTypeFilter(category.title)}
                >
                  <Text
                    className={`${
                      filterPropertyTypes.includes(category.title)
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {category.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Home Details */}
          <View className="mt-10">
            <Text className="text-black-300 font-rubik-semibold text-lg">
              Home Details
            </Text>
            <View className="mt-5">
              {/* Bedrooms */}
              <View className="flex flex-row gap-3 w-full justify-between items-center">
                <Text className="text-black-100 font-rubik-medium">
                  Bedrooms
                </Text>
                <View className="flex flex-row gap-3 items-center">
                  <TouchableOpacity
                    onPress={() =>
                      handleIncrementDecrement("bedrooms", "decrement")
                    }
                    className="p-2"
                  >
                    <Text className="text-3xl text-primary-300">-</Text>
                  </TouchableOpacity>
                  <Text className="text-black-300 font-rubik-medium text-base">
                    {details.bedrooms}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      handleIncrementDecrement("bedrooms", "increment")
                    }
                    className="p-2"
                  >
                    <Text className="text-2xl text-primary-300">+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bathrooms */}
              <View className="flex flex-row gap-3 w-full justify-between items-center mt-5">
                <Text className="text-black-100 font-rubik-medium">
                  Bathrooms
                </Text>
                <View className="flex flex-row gap-3 items-center">
                  <TouchableOpacity
                    onPress={() =>
                      handleIncrementDecrement("bathrooms", "decrement")
                    }
                    className="p-2"
                  >
                    <Text className="text-3xl text-primary-300">-</Text>
                  </TouchableOpacity>
                  <Text className="text-black-300 font-rubik-medium text-base">
                    {details.bathrooms}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      handleIncrementDecrement("bathrooms", "increment")
                    }
                    className="p-2"
                  >
                    <Text className="text-2xl text-primary-300">+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity className="rounded-full w-full py-3 bg-primary-300 mt-10 shadow-md shadow-blue-600/70">
                <Text className="text-center font-rubik-medium text-white text-lg">
                  Set Filter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default FilterModal;
