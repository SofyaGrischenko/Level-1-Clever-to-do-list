import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { doc, setDoc } from 'firebase/firestore'
import { auth} from '@/services/firebase'
import router from '@/router'

export const registration = async (user) => {
  console.log('user', user)
  console.log('auth', auth)

  try {
    // create user in Firebase Authentication
    const userCredentials = await createUserWithEmailAndPassword(auth, user.email, user.password)
    console.log('auth', userCredentials)

    // await setDoc(doc(database, 'users', user.uid), {
    //   name: user.name,
    //   email: user.email,
    //   createdAt: new Date(),
    // })

    router.push('/tasks') //redirect to tasks page
  } catch (error) {
    console.log(error) //firebase errors
                       //add specific error handlers  
  }
}
