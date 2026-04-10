import { auth, db } from "@/configs/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const addTask = async ({
  title,
  description,
  section,
  dueDate,
  tags,
}) => {
  const user = auth.currentUser;

  if (!user) throw new Error("User not logged in");

  const taskRef = collection(db, "users", user.uid, "tasks");

  await addDoc(taskRef, {
    title,
    description,
    section,
    dueDate,
    tags,
    completed: false,
    createdAt: serverTimestamp(),
  });
};

export const markTaskCompleted = async (taskId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const taskDoc = doc(db, "users", user.uid, "tasks", taskId);

  await updateDoc(taskDoc, {
    completed: true,
  });
};

export const deleteTask = async (taskId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const taskDoc = doc(db, "users", user.uid, "tasks", taskId);

  await deleteDoc(taskDoc);
};
