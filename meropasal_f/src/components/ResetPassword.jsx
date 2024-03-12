import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const ResetPassword = () => {
    const [password,setPassword]=useState('')
    const [cpassword,setCpassword]=useState('')
    const [error,setError]=useState('')
    const [message,setMessage]=useState('')
    const params=useParams()

    useEffect(()=>{
        if (password!=cpassword){
            setError('password and Confirm password doesnot match.')
        }else{
            setError('')
        }
    },[password,cpassword])

    const SubmitHandler=(e)=>{
        e.preventDefault()
        const userid=params.userid
        const token=params.token
        if (error.length==0){
        axios.post(`http://localhost:8000/resetpassword/${userid}/${token}/`,{password:password})
        .then(()=>{
            setMessage('password changed successfully')
        })
        .catch(err=>console.log(err))
    }
    }

  return (
    <>
    <div>
        <form className="form" onSubmit={SubmitHandler}>
            <p className="text-red-500 font-bold text-md mb-2">{error}</p>
            <p className="text-green-500 font-bold text-md mb-2">{message}</p>
            <div className="mb-2">
            <label htmlFor="psw">New Password:</label>
            <input type="password" id="psw" onChange={e=>setPassword(e.target.value)} value={password} required />
            </div> <br />
            <label htmlFor="cpsw">Confirm Password</label>
            <input type="password" id="cpsw" onChange={e=>setCpassword(e.target.value)} value={cpassword} required /> <br />
            <button className='p-3 bg-green-300 hover:bg-green-400 rounded-md mt-2'>Change password</button>

        </form>
    </div>

    </>
  )
}

export default ResetPassword