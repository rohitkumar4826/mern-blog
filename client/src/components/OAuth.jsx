import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    } 
  return (
<button
  type="button"
  onClick={handleGoogleClick}
  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-orange-500 border border-transparent rounded-md hover:bg-gradient-to-br from-pink-600 to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
>
  <AiFillGoogleCircle className="w-6 h-6 mr-2" />
  Continue with Google
</button>
  )
}