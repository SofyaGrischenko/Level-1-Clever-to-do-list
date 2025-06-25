import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

export const handleGetTasks = async (userId) => {
  let tasks = []
  const q = query(collection(db, 'tasks'), where('userId', '==', userId))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    tasks.push({
      id: doc.id,
      title: data.title,
      description: data.description,
      userId: data.userId,
      completed: data.completed,
      createdAt: data.createdAt,
    })
  })

  return tasks
}

export const getOneTask = async (taskId) => {
  const docRef = doc(db, 'tasks', taskId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.error('Document doesn`t exist')
  }
}

export const handleCreateTask = async (task, userId) => {
  try {
    await addDoc(collection(db, 'tasks'), {
      title: task.title,
      userId: userId,
      description: task.description,
      completed: false,
      createdAt: task.selectedDay,
    })
  } catch (e) {
    console.error(e)
  }
}

export const handleUpdateTask = async (updatedData) => {
  const docRef = doc(db, 'tasks', updatedData.id)

  await updateDoc(docRef, updatedData)
}

export const handleDeleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, 'tasks', taskId))
  } catch (err) {
    console.error(err)
  }
}
