import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import router from '@/router'

export const login = async (user) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, user.email, user.password)

    router.push('/tasks')
    console.log(userCredentials)

    return userCredentials
  } catch (error) {
    console.log(error.message)

    let errorMessage = 'Error occured'

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Please enter valid Email'; break;
      case 'auth/invalid-credential':
        errorMessage = 'Please enter valid email and password'; break;
    }

    throw new Error(errorMessage)
  }
}
