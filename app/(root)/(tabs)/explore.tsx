import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import { FlatCard } from "@/components/Cards";
import Filters from "@/components/Filters";
// import seed from "@/constants/lib/seed";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/constants/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/constants/lib/appwrite";
import { useEffect } from "react";
import NoResults from "@/components/NoResults";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5 pb-32">
        <View className="flex flex-row items-center justify-between mt-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
          >
            <Image source={icons.backArrow} className="size-5" />
          </TouchableOpacity>

          <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
            Search for your ideal home
          </Text>

          <Image source={icons.bell} className="size-6" />
        </View>
        <Search />
        <FlatList
          data={properties}
          renderItem={({ item }) => (
            <FlatCard item={item} onPress={() => handleCardPress(item.$id)} />
          )}
          numColumns={1}
          keyExtractor={(item) => item.$id}
          contentContainerClassName="pb-32 flex gap-3"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator
                size="large"
                className="text-primary-300 mt-5"
              />
            ) : (
              <NoResults />
            )
          }
          ListHeaderComponent={
            <View>
              <Filters />

              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} Properties.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
