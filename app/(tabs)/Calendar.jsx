import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { auth, db } from '@/configs/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { StatusBar } from 'react-native-web';

export default function CalendarScreen() {
  const [markedDates, setMarkedDates] = useState({});
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const taskRef = collection(db, "users", user.uid, "tasks");

    const unsub = onSnapshot(taskRef, (snapshot) => {
      const marks = {};
      const allTasks = [];
      snapshot.forEach((doc) => {
        const data = doc.data();

        if (data.dueDate) {
          // 🔥 convert stored date to YYYY-MM-DD
          const dateObj = new Date(data.dueDate);
          const formatted = dateObj.toISOString().split("T")[0];

          marks[formatted] = {
            marked: true,
            dotColor: "green",
          };
          allTasks.push({
            id: doc.id,
            ...data,
            formattedDate: formatted,
          })
        }
      });

      setMarkedDates(marks);
      setTasks(allTasks);
    });

    return () => unsub();
  }, []);

  const filteredTasks = tasks.filter(
    (task) => task.formattedDate === selectedDate
  );

  return (
    <>
      <StatusBar style='dark' />
      <View style={styles.container}>

        <Calendar
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              selected: true,
              selectedColor: '#6C63FF',
            },
          }}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          theme={{
            todayTextColor: '#6C63FF',
            arrowColor: '#6C63FF',
          }}
        />

        {/* 🔥 Task List */}
        <View style={styles.taskContainer}>
          <Text style={styles.heading}>
            {selectedDate ? `Tasks on ${selectedDate}` : "Select a date"}
          </Text>

          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 10 }}>
                No tasks for this day 🚀
              </Text>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    backgroundColor: '#fff',
  },
  taskContainer: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#F7F7F7',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  desc: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});