import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const SellerHomepage = () => {
  const seller = JSON.parse(localStorage.getItem('user')) || {}

  const [products, setProduct] = useState([])

  const navigate=useNavigate()


  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/product/${seller.user.id}/`, {
          headers: {
            'Authorization': `Token ${seller.token}`
          }
        })
        setProduct(response.data)
      } catch (error) {
        console.log('error fetching data:', error)
      }
    }

    getProduct()
  }, [seller.user.id, seller.token])


  const UpdateProduct=(id)=>{
    navigate(`/seller/update/${id}`)
  }

  
  const DeleteProduct = (id) => {
    axios.delete(`http://localhost:8000/productupdatedelete/${id}/`,{
      headers: {
        'Authorization': `Token ${seller.token}`
      }
    })
      .then(res => console.log(res.status))
      .then(window.location.reload())
      .catch(err => console.log(err))
  }

  console.log(seller)
  console.log(`products are: ${JSON.stringify(products)}`)

  return (
    <>
      <h1>seller email={seller.user.email}</h1>
      <p className="sellerhomepage">My Products</p>
      {products.map((product,index)=>(
        <div key={index} className="sellerhomepage-product">
          <img src={product.product_image} alt="" />
          <p>{product.product_name}</p>
          <button className="bg-yellow-500 hover:bg-yellow-600" onClick={()=>navigate('/seller/productdata',{state:{id:product.id}})}>View details</button> {/*you can access the values in the state by using use location hook */}
          <button className="bg-blue-300 hover:bg-blue-400" onClick={()=>UpdateProduct(product.id)}>Edit</button>
          <button className="bg-red-500 hover:bg-red-600" onClick={()=>DeleteProduct(product.id)}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default SellerHomepage