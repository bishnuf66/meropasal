import axios from "axios"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

const EsewaSuccess = () => {
  const payment_status = true

  const [params] = useSearchParams() //hook to extract parameter from the url
  console.log("orderid :" + params.get('oid'))
  console.log("amt: " + params.get('amt'))

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('user')) || {}
    console.log(userdata.token)

    axios.put(`http://localhost:8000/orderupdate/${params.get('oid')}/${params.get('amt')}/`, {total_price:params.get('amt'),user:userdata.user.id, payment_status: payment_status }, {
      'headers': {
        "Authorization": `Token ${userdata.token}`
      }
    })
      .then(res => console.log('responsec is:' + JSON.stringify(res)))
      .catch(err => console.log("error is :" + err))


  }, [])
  return (
    <>
      <h2>Payment Successful</h2>
    </>
  )
}

export default EsewaSuccess