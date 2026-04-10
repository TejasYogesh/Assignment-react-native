import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const route = useRouter();
  const differentPage = () => {
    route.replace('/AddTask')
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
      <Text>
        <TouchableOpacity onPress={differentPage}>
          <Text>
            Click
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
