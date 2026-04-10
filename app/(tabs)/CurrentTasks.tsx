import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { auth, db } from "@/configs/firebaseConfig";
import { deleteTask, markTaskCompleted } from "@/services/taskService";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const PURPLE = "#6C63FF";

export default function CurrentTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "tasks"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setTasks(list);
    });

    return () => unsub();
  }, []);

  // 🔥 Group tasks by section
  const groupedTasks = {
    Today: tasks.filter((t) => t.section === "Today" && !t.completed),
    Tomorrow: tasks.filter((t) => t.section === "Tomorrow" && !t.completed),
    "This week": tasks.filter((t) => t.section === "This week" && !t.completed),
  };

  const renderTask = (item: any) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.dueDate}</Text>
      </View>

      {/* ✅ Complete Button */}
      <TouchableOpacity
        style={styles.completeBtn}
        onPress={() => markTaskCompleted(item.id)}
      >
        <Text style={{ color: "white", fontSize: 12 }}>Done</Text>
      </TouchableOpacity>

      {/* ❌ Delete Button */}
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={{ color: "white", fontSize: 12 }}>X</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSection = (title: string, data: any[]) => {
    if (data.length === 0) return null;

    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.sectionTitle}>{title}</Text>

        {data.map((item) => (
          <View key={item.id}>{renderTask(item)}</View>
        ))}
      </View>
    );
  };

  const noTasks = tasks.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      {noTasks ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No tasks yet</Text>
          <Text style={styles.emptySubtitle}>
            You dont have any tasks. Add a new task to get started.
          </Text>
        </View>
      ) : (
        <>
          {renderSection("Today", groupedTasks.Today)}
          {renderSection("Tomorrow", groupedTasks.Tomorrow)}
          {renderSection("This week", groupedTasks["This week"])}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#555",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  completeBtn: {
    backgroundColor: PURPLE,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 6,
  },
  deleteBtn: {
    backgroundColor: "#FF4D4D",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});