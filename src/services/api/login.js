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
    console.log(error)
  }
}
