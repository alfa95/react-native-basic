import { View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";
import { GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id))
  const logout = async () => { 
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace('/sign-in')
  }

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
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity className="w-full items-end mb-10" onPress={logout()}>
                <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
              </TouchableOpacity>
              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image className="w-[90%] h-[90%] rounded-lg" resizeMode="cover" source={{ uri: user?.avatar }} />
              </View>
              <InfoBox title={user?.username} containerStyle='mt-5' titleStyles='text-lg' />
              <View className="mt-5 flex-row">
                <InfoBox title={posts.length || 0} subtitle="Posts" containerStyle='mr-10' titleStyles='text-xl' />
                <InfoBox title='1.2k' subtitle="Followers" titleStyles='text-xl' />
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

export default Profile;

