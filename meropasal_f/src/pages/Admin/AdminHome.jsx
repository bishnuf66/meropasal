import axios from "axios"
import { useEffect, useState } from "react"

const AdminHome = () => {
    const [product, SetProduct] = useState([])
    const userdata = JSON.parse(localStorage.getItem('user')) || {}
    console.log("userdata: " + JSON.stringify(userdata))

    useEffect(() => {
        axios.get(`http://localhost:8000/productviewadmin/`, {
            'headers': {
                'Authorization': `token ${userdata.token}`
            }
        })
            .then(res => SetProduct(res.data))
            .catch(err => console.log(err))
    }, [])
    console.log(product)

    const DeleteProduct = (id) => {
        axios.delete(`http://localhost:8000/productupdatedelete/${id}/`, {
            'headers': {
                'Authorization': `token ${userdata.token}`
            }
        })
            .then(res => {
                console.log(res)
                window.location.reload()
            }
            )

            .catch(err => console.log(err))
    }
    return (
        <>
            <div className="container">
                <table className="table">
                    <tr className="table-row">
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Seller</th>
                        <th>Action</th>
                    </tr>
                    {product.map((item, index) => (
                        <tr className="table-row" key={index}>
                            <td><img src={item.product_image} alt={item.product_name} /></td>
                            <td>{item.product_name}</td>
                            <td style={{ 'fontSize': '12px', 'textAlign': 'justify' }}>{item.description}</td>
                            <td>${item.price}</td>
                            <td style={{ 'fontSize': '12px' }}>{item.category.category}</td>
                            <td>{item.seller.email}</td>
                            <td><button className="bg-red-500" onClick={() => DeleteProduct(item.id)}>Delete</button></td>
                        </tr>
                    ))}

                </table>
            </div>
        </>
    )
}

export default AdminHome