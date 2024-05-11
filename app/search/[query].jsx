import { useLocalSearchParams } from 'expo-router'
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";

import SearchInput from "../../components/SearchInput";
import { GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler";
import EmptyState from "../../components/EmptyState";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query))
  useEffect(() => {
    refetch()
  }, [query])

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id.toString()}
          renderItem={({ item }) => (
            <VideoCard video={item} />
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4">
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>
              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              subtitle="No Videos found for search"
              title="No Videos Found"
              buttonState={false}
            />
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Search;
