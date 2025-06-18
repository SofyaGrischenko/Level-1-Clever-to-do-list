import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { doc, setDoc } from 'firebase/firestore'
import { auth } from '@/services/firebase'
import router from '@/router'

export const registration = async (user) => {
  try {
    // create user in Firebase Authentication
    await createUserWithEmailAndPassword(auth, user.email, user.password)

    // await setDoc(doc(database, 'users', user.uid), {
    //   name: user.name,
    //   email: user.email,
    //   createdAt: new Date(),
    // })

    router.push('/tasks') //redirect to tasks page
  } catch (error) {
    //firebase errors
    let errorMessage = 'Error occured'

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
