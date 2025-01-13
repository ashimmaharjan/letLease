import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import icons from "@/constants/icons";
import { useAppwrite } from "@/constants/lib/useAppwrite";
import { getPropertyById } from "@/constants/lib/appwrite";
import images from "@/constants/images";
import { facilities } from "@/constants/data";
import Comment from "@/components/Comment";

const Property = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  return (
    <View className="relative">
      <ScrollView className="h-full bg-white" contentContainerClassName="pb-32">
        {/* Property Image */}
        <View className="relative z-10 rounded-t-[30px] overflow-hidden">
          <Image source={{ uri: property?.image }} className="w-full h-96" />

          <Image
            source={images.whiteGradient}
            className="w-full h-72 absolute top-0 left-0 z-20"
          />
          <View className="absolute top-6 left-0 flex flex-row justify-between w-full px-5 z-40">
            <TouchableOpacity
              className="flex flex-row justify-center items-center size-10"
              onPress={() => router.back()}
            >
              <Image source={icons.backArrow} className="size-8" />
            </TouchableOpacity>

            <View className="flex flex-row justify-center items-center gap-3">
              <TouchableOpacity className="flex flex-row justify-center items-center size-10">
                <Image
                  source={icons.heart}
                  className="size-7"
                  tintColor="#191d31"
                />
              </TouchableOpacity>

              <TouchableOpacity className="flex flex-row justify-center items-center size-10">
                <Image source={icons.send} className="size-7" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="p-5 w-full">
          {/* Property Quick Details */}
          <View className="flex gap-3 w-full">
            <View>
              <Text className="text-2xl font-rubik-bold text-black-300">
                {property?.name}
              </Text>
            </View>

            <View className="flex flex-row gap-3 items-center">
              <Text className="text-primary-300 font-rubik-bold uppercase text-xs">
                {property?.propertyType}
              </Text>

              <View className="flex flex-row gap-1 items-center">
                <Image source={icons.star} className="size-5" />
                <Text className="text-black-200 font-rubik-medium">
                  {property?.rating}
                </Text>
                <Text className="text-black-200 font-rubik-medium">
                  ({property?.reviews.length} reviews)
                </Text>
              </View>
            </View>
          </View>

          {/* Bed, bath and area details */}
          <View className="flex flex-row w-full justify-between px-2 mt-7">
            <View className="flex flex-row gap-4 items-center">
              <Image source={icons.bed} className="size-5" />
              <Text className="text-base font-rubik-medium text-black-300">
                {property?.bedrooms} Beds
              </Text>
            </View>

            <View className="flex flex-row gap-4 items-center">
              <Image source={icons.bath} className="size-5" />
              <Text className="text-base font-rubik-medium text-black-300 mt-1.5">
                {property?.bathrooms} bath
              </Text>
            </View>

            <View className="flex flex-row gap-4 items-center">
              <Image source={icons.area} className="size-5" />
              <Text className="text-base font-rubik-medium text-black-300">
                {property?.area} sqft
              </Text>
            </View>
          </View>

          {/* Agent details */}
          <View className="mt-14">
            <Text className="text-black-300 font-rubik-bold text-xl">
              Agent
            </Text>

            <View className="flex flex-row w-full justify-between mt-3">
              <View className="flex flex-row gap-4 items-center w-[70%] line-clamp-1">
                <Image
                  source={{ uri: property?.agent.avatar }}
                  className="size-[60px] rounded-full"
                />

                <View>
                  <Text className="text-lg font-rubik-bold text-black-300">
                    {property?.agent.name}
                  </Text>
                  <Text className="text-base font-rubik text-black-200">
                    {property?.agent.email}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row gap-4 items-center justify-end mr-2 w-[30%]">
                <Image source={icons.chat} className="size-[28px]" />
                <Image source={icons.phone} className="size-[28px]" />
              </View>
            </View>
          </View>

          {/* Property desc */}
          <View className="mt-7">
            <Text className="text-black-300 font-rubik-bold text-xl">
              Overview
            </Text>

            <Text className="text-black-200 mt-2 font-rubik line-clamp-4">
              {property?.description}
            </Text>
          </View>

          {/* Facilities */}
          <View className="mt-7">
            <Text className="text-black-300 font-rubik-bold text-xl">
              Facilities
            </Text>

            {property?.facilities.length > 0 && (
              <View className="mt-5">
                <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
                  {property?.facilities.map((item: string, index: number) => {
                    const facility = facilities.find(
                      (facility) => facility.title === item
                    );

                    return (
                      <View
                        key={index}
                        className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                      >
                        <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                          <Image
                            source={facility ? facility.icon : icons.info}
                            className="size-6"
                          />
                        </View>

                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          className="text-black-300 text-sm text-center font-rubik mt-1.5"
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>

          {/* Gallery */}
          {property?.gallery.length > 0 && (
            <View className="mt-7">
              <Text className="text-black-300 font-rubik-bold text-xl">
                Gallery
              </Text>
              <FlatList
                horizontal
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-4 mt-3"
                renderItem={({ item }) => (
                  <View>
                    <Image
                      source={{ uri: item.image }}
                      className="size-40 rounded-xl"
                    />
                  </View>
                )}
              />
            </View>
          )}

          {/* Location */}
          <View className="mt-7">
            <Text className="text-black-300 font-rubik-bold text-xl">
              Location
            </Text>

            <View className="flex flex-row gap-3 mt-4 items-center">
              <Image source={icons.location} className="size-7" />

              <Text className="font-rubik-medium text-black-200 text-base">
                {property?.address}
              </Text>
            </View>

            <Image
              source={images.map}
              className="w-full h-52 mt-5 rounded-xl"
            />
          </View>

          {/* Reviews */}
          {property?.reviews.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row gap-2">
                  <Image source={icons.star} className="size-6" />
                  <Text className="text-black-300 text-xl font-rubik-bold">
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-primary-300 font-rubik-bold">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Book Now Action Container */}
      <View className="fixed bottom-[93px] left-0 flex flex-row justify-between items-center w-full z-50 bg-white border-2 border-black-200/30 border-b-0 rounded-2xl h-auto p-5">
        <View className="flex flex-col">
          <Text className="text-black-200 font-rubik-medium uppercase tracking-wide">
            Price
          </Text>
          <Text className="text-primary-300 font-rubik-bold text-xl">
            ${property?.price}
          </Text>
        </View>

        <TouchableOpacity className="bg-primary-300 px-20 py-4 rounded-full shadow-md shadow-black-100/70">
          <Text className="text-lg text-white font-rubik-semibold">
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Property;
