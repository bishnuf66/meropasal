import axios from "axios"
import { useEffect, useState } from "react"

const Profile = () => {
  const [user, setUser] = useState({})
  const [password, setPassword] = useState('')
  const [Cpassword, setCpassword] = useState('')
  const [error, setError] = useState('')

  const userdata = JSON.parse(localStorage.getItem('user'))
  console.log(user)

  useEffect(() => {
    axios.get('http://localhost:8000/profile/', {
      headers: {
        'Authorization': `Token ${userdata.token}`
      }
    })
      .then(response => setUser(response.data))
      .catch(err => console.log(err))
  }, [userdata.token])

  useEffect(() => {
    if (password.length === 0) {
      setError('password field is empty')
    }
    else if (password !== Cpassword) {
      setError("password and confirm password doesn't match")
    } 
    else{
      setError('')
    }
  }, [password, Cpassword])

  const SubmitHandler = (e) => {
    e.preventDefault()
    if (error.length === 0) {
      axios.patch('http://localhost:8000/changepassword/', { password: password }, {
        headers: {
          'Authorization': `Token ${userdata.token}`
        }
      })
        .then(()=>window.location.replace('http://localhost:3000/'))
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      <form className="form" onSubmit={SubmitHandler}>
        <p className="text-red-500 font-normal">{error}</p>
        <label htmlFor="New-Password">New Password:</label>
        <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} id="New-Password" />
        <label htmlFor="Cpassword">Confirm Password:</label>
        <input type="text" value={Cpassword} onChange={(event) => setCpassword(event.target.value)} id="Cpassword" />
        <button>Submit</button>
      </form>
    </>
  )
}

export default Profile