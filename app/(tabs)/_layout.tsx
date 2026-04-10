import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
export default function TabsLayout() {
    return (

        <>
            <StatusBar style="dark" />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#6C63FF',
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="CurrentTasks"
                    options={{
                        title: 'Tasks',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="list" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="AddTask"
                    options={{
                        title: 'Add',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="add-circle" size={size} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="Calendar"
                    options={{
                        title: 'Calendar',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="calendar" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="settings" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}