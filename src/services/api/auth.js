import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '@/services/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

export const login = async (user) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, user.email, user.password)

    return userCredentials.user
  } catch (error) {
    let errorMessage = 'Login Error'

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Please enter your Email'
        break
      case 'auth/invalid-credential':
        errorMessage = 'Please enter valid credits'
        break
      case 'auth/missing-password':
        errorMessage = 'Please enter your password'
        break
    }

    throw new Error(errorMessage)
  }
}

export const registration = async (user) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, user.email, user.password)

    await setDoc(doc(db, 'users', userCredentials.user.uid), {
      uid: userCredentials.user.uid,
      email: user.email,
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
        errorMessage = 'Password must be 6 or more characters'
        break
      case 'auth/email-already-in-use':
        errorMessage = 'This user has already been created'
        break
    }
    console.error(error.code)

    throw new Error(errorMessage)
  }
}

export const logOut = async () => {
  await signOut(auth)
}

export const handleGetMe = () => {
  return new Promise((resolve) => {
    const removeListener = onAuthStateChanged(auth, (user) => {
      removeListener()
      resolve(user)
    })
  })
}
