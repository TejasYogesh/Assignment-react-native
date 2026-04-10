import Login from '@/components/Login';
import { auth } from '@/configs/firebaseConfig';
import { Redirect } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state:", user);
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ⏳ Wait until Firebase checks auth
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <Redirect href="/AddTask" /> : <Login />;
};

export default Index;