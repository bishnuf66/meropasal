import axios from "axios"
import { useEffect, useState } from "react"

const Orders = () => {
    const [orders, setOrders] = useState([])

    const userdata = JSON.parse(localStorage.getItem('user')) || {}

    useEffect(() => {
        axios.get(`http://localhost:8000/getordersforseller/${userdata.user.id}/`, {
            'headers': {
                'Authorization': `token ${userdata.token}`
            }
        })
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    }, [])
    console.log("orders are: " + JSON.stringify(orders))



    const payment_status = (payment_status) => { //simple function to check if it is paid or not
        if (payment_status == true) {
            return "paid"
        } else {
            return "Not paid"
        }
    }

    const Order_Status = (order_status) => {
        if (order_status == 'pending') {
            return <button className="bg-yellow-400 currentorderstatus">pending</button>
        } else if (order_status == 'shipped') {
            return <button className="bg-blue-400 currentorderstatus">shipped</button>
        } else if (order_status == 'delivered') {
            return <button className="bg-green-400 currentorderstatus">delivered</button>
        } else if (order_status == 'canceled') {
            return <button className="bg-red-400 currentorderstatus">canceled</button>
        }
    }

    const orderstatusupdate = (data) => {
        console.log(data)
        axios.put(`http://localhost:8000/getordersforseller/${userdata.user.id}/`, { id: data.orderid, order_status: data.order_status }, {
            'headers': {
                'Authorization': `token ${userdata.token}`
            }
        })
            .then(() => window.location.reload)
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="container">
                <table className="table">
                    <tr className="table-row">
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Address</th>
                        <th>Payment Status</th>
                        <th>Delivery Status</th>
                    </tr>

                    {orders.map((item, index) => (
                        <tr key={index} className="table-row">
                            <td><img src={item.product.product_image} alt={item.product.product_name} /></td>
                            <td>{item.product.product_name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.order.address},{item.order.city}</td>
                            <td>{payment_status(item.order.payment_status)}</td>
                            <td>
                                {Order_Status(item.order.order_status)}
                                <div className="orderstatus">
                                    <button onClick={() => orderstatusupdate({ orderid: item.id, order_status: 'pending' })} className="hover:underline">pending</button>
                                    <button onClick={() => orderstatusupdate({ orderid: item.id, order_status: 'shipped' })} className="hover:underline">shipped</button>
                                    <button onClick={() => orderstatusupdate({ orderid: item.id, order_status: 'delivered' })} className="hover:underline">delivered</button>
                                    <button onClick={() => orderstatusupdate({ orderid: item.id, order_status: 'canceled' })} className="hover:underline">canceled</button>
                                </div>

                            </td>

                        </tr>
                    ))}
                </table>
            </div>

        </>
    )
}

export default Orders