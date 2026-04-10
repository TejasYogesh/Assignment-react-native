import { auth, db } from "@/configs/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

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
