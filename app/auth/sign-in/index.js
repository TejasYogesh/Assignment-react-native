import { useNavigation, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native-web";
import { auth } from "../../../configs/firebaseConfig";

export default function Signin() {
  const router = useRouter();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    if (!email && !password) {
      ToastAndroid.show("Please enter all the details", ToastAndroid.BOTTOM);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/"); // go to index, it will redirect automatically
      })
      .catch((error) => {
        ToastAndroid.show("Invalid credentials", ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark" backgroundColor="black" />

      <View style={styles.inner}>
        <Text style={styles.title}>Lets Sign You In</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>
        <Text style={styles.subtitle}>Youve been missed!</Text>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signinBtn} onPress={signIn}>
          <Text style={styles.signinText}>Sign In</Text>
        </TouchableOpacity>

        {/* Create Account */}
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => {
            router.push("/auth/sign-up");
          }}
        >
          <Text style={styles.createText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 10,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: "30%",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#777",
    marginBottom: 5,
  },
  label: {
    marginTop: 25,
    marginBottom: 6,
    color: "#555",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
  },
  signinBtn: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 30,
  },
  signinText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  createBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 15,
  },
  createText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
});
