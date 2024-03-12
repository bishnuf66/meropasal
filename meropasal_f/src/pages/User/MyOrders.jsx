import axios from "axios"
import { useEffect, useState } from "react"

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  // const [product, setProduct] = useState([])
  const [orderitems, setOrderitems] = useState([])
  const userdata = JSON.parse(localStorage.getItem('user'))
  console.log(userdata)
  console.log(orders)
  useEffect(() => {
    axios.get(`http://localhost:8000/order/${userdata.user.id}/`, {
      headers: {
        'Authorization': `Token ${userdata.token}`
      }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.log(err))


  }, [userdata.user.id, userdata.token])  //you should avoid using an object as a dependency because objects are reference types, and their reference changes every time the object is recreated, causing the useEffect to run repeatedly. To fix this issue, you should use a specific property from the userdata object as a dependency instead of the entire object. Assuming userdata.user.id 


  // Fetch product details for each order
  const getOrderItemDetails = async () => {
    const OrderItemDetail = await Promise.all( //promise means it will run when order id is obtained from backend
      orders.map(order => axios.get(`http://localhost:8000/getorderitems/${order.id}/`))
    )
    // Extract data from OrderItemDetail and concatenate into a single array
    const allOrderItems = OrderItemDetail.reduce((accumulator, SingleOrderItemDetail) => {
      if (SingleOrderItemDetail.data) {
        return accumulator.concat(SingleOrderItemDetail.data)
      }
      return accumulator
    }, [])

    console.log("allorderitems: " + JSON.stringify(allOrderItems))
    setOrderitems(allOrderItems)
    console.log("orderitems:" + JSON.stringify(orderitems))

  }

  useEffect(() => {
    if (orders.length > 0) {
      getOrderItemDetails()
    }
  }, [orders, getOrderItemDetails])


  // console.log(product)


  return (
    <>
      {orders.length === 0
        ?
        <div className="cart-empty">Your cart is empty. <a href="/" className="hover:text-red-500 underline">Shop Now</a></div>
        :
        <div className="container">

          <table className="table">
            <tr className="table-row">
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>


            {orderitems.map((item, index) => (
              <tr key={index} className="table-row">
                <td><img src={item.product.product_image} alt={item.product.product_name} /></td>
                <td>{item.product.product_name}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button className='bg-amber-400 hover:bg-amber-600 cart-delete'  >Delete</button>
                </td>
              </tr>
            ))}
          </table>

        </div>


      }
    </>
  )
}

export default MyOrders