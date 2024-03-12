import axios from 'axios'
import React, { useEffect, useState, /*useContext*/ } from 'react'
// import AuthContext from '../context/AuthProvider'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import useAuth from '../hooks/useAuth'


const Login = () => {
    // const { setAuthentication } = useContext(AuthContext)
    // const {setAuthentication}=useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, SetErrMsg] = useState('')
    const [loggedin, setIsloggedin] = useState(false)

    useEffect(() => { //if the user changes the email or password input , the error message is changed to empty
        SetErrMsg('')
    }, [email, password])

    const loginsubmit = async (e) => {
        e.preventDefault()
        console.log(`${email}`, `${password}`)
        try {
            const response = await axios.post(`http://localhost:8000/login/`, JSON.stringify({ email, password }), { headers: { "Content-Type": "application/json" } })
            console.log(JSON.stringify(response.data))
            localStorage.setItem('user', JSON.stringify(response.data) || [])

            setEmail('')
            setPassword('')
            toast.success('login works')
            setIsloggedin(true)
            navigate(from, { replace: true })
            window.location.reload()  //this reloads the page to show changes.

        }
        catch (err) {
            if (!err?.response) {
                SetErrMsg('no server response')
            } else if (err.response?.status === 400) {
                SetErrMsg('missing username or password')
            } else {
                SetErrMsg('Login failed')
            }
            toast.error(err.response?.data?.error)
        }


    }



    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            {loggedin ? (
                <section>
                    <h1 style={{ color: 'blue' }}>You are Logged In.</h1>
                </section>
            ) : (
                <section className="bg-gray-50 dark:bg-gray-900">

                    <p style={{ color: 'red' }}>{errMsg}</p>

                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            Login page
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="" onSubmit={loginsubmit}>
                                    <div>
                                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(emaile) => setEmail(emaile.target.value)} value={email} />
                                    </div>
                                    <div>
                                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(pswe) => setPassword(pswe.target.value)} value={password} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                            </div>
                                        </div>
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Dont have an account yet? <Link to='../signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                    </p>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        <a className='hover:text-red-500 underline' href="/resetuserpassword">Forgot your password?</a>
                                    </p>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )
            }
        </>
    )
}

export default Login