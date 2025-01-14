import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import icons from "@/constants/icons";
import { useDebouncedCallback } from "use-debounce";
import FilterModal from "./FilterModal";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();

  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };
  return (
    <View className="flex flex-row items-center justify-between w-full px-4 py-2 rounded-lg bg-accent-100 border border-slate-400 mt-5 mb-5">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 flex-1 ml-2 py-2"
        />
      </View>

      <TouchableOpacity
        className="rounded-full flex flex-row justify-center items-center p-2"
        onPress={() => setShowFilterModal(!showFilterModal)}
      >
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>

      {showFilterModal && (
        <FilterModal
          visibility={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
      )}
    </View>
  );
};
export default Search;
