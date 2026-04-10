import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.heading}>Add New Task</Text>

                <TextInput
                    placeholder="Title"
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />

                <TextInput
                    placeholder="Description"
                    style={[styles.input, { height: 100 }]}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add Task</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        paddingVertical: 24,
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#6C63FF',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});