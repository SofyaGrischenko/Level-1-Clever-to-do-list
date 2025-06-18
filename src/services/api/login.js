import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'


export const login = async (user) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, user.email, user.password)

    
    console.log(userCredentials)

    return userCredentials
  } catch (error) {
    let errorMessage = 'Please try again'

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Please enter your Email'
        break
      case 'auth/invalid-credential':
        errorMessage = 'Please enter valid email and password'
        break
      case 'auth/missing-password':
        errorMessage = 'Please enter your password'
        break
    }

    throw new Error(errorMessage)
  }
}
