import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Notfound = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/')
        },2500)
    }, [navigate])
  return (
    <>
     <h2>404 Not found</h2>
     <p className="text-3xl">you are being redirected to homepage</p>
     </>
  )
}

export default Notfound