import axios from 'axios'
import React, { useState } from 'react'

const Email = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const SubmitHandler = (e) => {
        e.preventDefault()

        axios.post(`http://localhost:8000/resetpasswordemail/`, { email: email })
            .then((response) => {
                console.log(response)

                if (response.status === 200) {
                    setMessage(response.data.msg)
                    console.log('password reset link: ' + response.data.link)
                } else if (response.status === 400) {
                    setMessage('No user found')
                } 
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <div>

                {message &&
                    <p>{message}</p>
                }
                <form className='form' onSubmit={SubmitHandler}>
                    <label htmlFor="email">Enter Your Email address</label>
                    <input type="email" id="email" onChange={event => setEmail(event.target.value)} value={email} required /> <br />
                    <button className='p-3 bg-green-300 hover:bg-green-400 rounded-md mt-2'>Get Email</button>
                </form>

            </div>
        </>
    )
}

export default Email