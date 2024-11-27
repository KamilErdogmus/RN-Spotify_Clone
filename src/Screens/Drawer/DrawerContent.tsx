import Photo from "../../components/Photo";
import { Text, View, TouchableOpacity } from "react-native";
import { drawerOpt } from "../../utils/constants";
import { SafeAreaView } from "react-native-safe-area-context";

const DrawerContent = (props) => {
  return (
    <SafeAreaView className="flex-1 bg-[#1f1f1f] p-4">
      <View className="flex-row items-center mb-4">
        <Photo rounded />
        <View>
          <Text className="text-xl font-bold text-white">Kamil Erdoğmuş</Text>
          <Text className="text-sm text-gray-400">View Profile</Text>
        </View>
      </View>
      <View className="mt-4 mb-4 border-b border-gray-700" />
      <View>
        {drawerOpt.map((item) => {
          const IconComponent = item.icon.component;
          return (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center py-3 px-2 rounded-md hover:bg-[#282828]"
              onPress={item.onPress}
            >
              <IconComponent
                name={item.icon.name as any}
                size={item.icon.size}
                color={item.icon.color}
                className="mr-4"
              />
              <Text className="text-lg text-white">{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;
