import { useNavigation, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
import { auth } from "../../../configs/firebaseConfig";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function for the createUserWithEmailAndPassword:
  const onCreateAccount = () => {
    if (!email && !password && !name) {
      ToastAndroid("Enter all the details", ToastAndroid.BOTTOM);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/"); // ✅ let index.tsx handle the redirect
      })
      .catch((error) => {
        ToastAndroid.show("Invalid credentials", ToastAndroid.BOTTOM);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter Full Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.signupBtn} onPress={onCreateAccount}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push("/auth/sign-in")}
        >
          <Text style={styles.loginText}>
            Already have an account?
            <Text style={styles.signintext}> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: "30%",
  },
  title: {
    fontSize: 35,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#777",
  },
  label: {
    marginTop: 20,
    marginBottom: 6,
    fontWeight: "500",
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
  },
  signupBtn: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 30,
  },
  signupText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  loginBtn: {
    marginTop: 15,
    alignItems: "center",
  },
  loginText: {
    color: "#555",
    fontSize: 14,
  },
  signintext: {
    color: "blue",
  },
});
