import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc} from 'firebase/firestore'
import { auth, db } from '@/services/firebase'

export const registration = async (user) => {
  // const q = query(collection(db, 'users'))
  // const querySnapshot = await getDocs(q)
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, ' => ', doc.data())
  // })

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, user.email, user.password)

    await setDoc(doc(db, 'users', userCredentials.user.uid), {
      email: user.email,
      tasks: [],
      createdAt: new Date(),
    })

    return userCredentials.user
  } catch (error) {
    let errorMessage = 'Registration Error'

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Please enter valid email'
        break
      case 'auth/missing-password':
        errorMessage = ''
        break
      case 'auth/weak-password':
        errorMessage = 'password must be 6 or more characters'
        break
    }
    console.log(error.code)

    throw new Error(errorMessage)
  }
}
