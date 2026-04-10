import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyTasks = [
    { id: '1', title: 'Study React Native', priority: 'High' },
    { id: '2', title: 'Gym Workout', priority: 'Medium' },
    { id: '3', title: 'Read Book', priority: 'Low' },
];

export default function CurrentTasks() {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.subheading}>
                    Current Tasks
                </Text>
            </View>
            <FlatList
                data={dummyTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.priority}>{item.priority}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    subheading: {
        fontSize: 32,
        fontWeight: 'bold',
        paddingVertical: 24,
    },
    card: {
        padding: 16,
        backgroundColor: '#F7F7F7',
        borderRadius: 12,
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    priority: {
        marginTop: 5,
        color: '#6C63FF',
    },
});