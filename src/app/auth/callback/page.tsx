import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  console.log(auth)
  if(auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`)
  }

  if(auth.status === 403 || auth.status === 500 || auth.status === 404) {
    return redirect("/auth/sign-in")
  }
}

export default AuthCallbackPage