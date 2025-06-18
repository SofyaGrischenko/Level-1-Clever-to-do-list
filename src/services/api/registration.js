import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/services/firebase'

export const registration = async (user) => {
  try {
    await createUserWithEmailAndPassword(auth, user.email, user.password)

  } catch (error) {
    //firebase errors
    let errorMessage = 'Please try again'

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

    throw new Error(errorMessage)
  }
}
