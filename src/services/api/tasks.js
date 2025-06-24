import { collection, query, where, getDocs, getDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const handleGetTasks = async (userId) => {
  let tasks = []
  const q = query(collection(db, 'tasks'), where('userId', '==', userId))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {

    tasks.push(doc.data())
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

export const createTask = async (task) => {
  await setDoc(doc(db, 'tasks', task.taskId), {
    title: task.title,
    description: task.description,
    creadtedAt: new Date(),
    userId: task.userId,
  })
}
