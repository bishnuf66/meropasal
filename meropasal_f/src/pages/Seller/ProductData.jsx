import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const ProductData = () => {
  const location = useLocation()  //all kinds of data are in location, we just need the state.id
  const [product, setProduct] = useState({})
  const seller = JSON.parse(localStorage.getItem('user') || {})

  const navigate = useNavigate()

  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/productview/${location?.state?.id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, [location?.state?.id])

  const EditProduct=(id)=>{
    navigate(`/seller/update/${id}`)
  }

  const DeleteProduct = () => {
    if (!location.state || !location.state.id) {
      console.error('Product ID not available for deletion');
      return;
    }
    axios.delete(`http://localhost:8000/productupdatedelete/${location?.state?.id}/`, {
      headers: {
        'Authorization': `Token ${seller.token}`
      }
    })
      .then(res => console.log(res.status))
      .then(navigate('/seller'))
      .catch(err => console.log(err))
  }


  return (
    (!location.state || !location.state.id)
    ?
    <p>No product found</p>
    :
    <>

      <div className='product-details'>
        <div className='product-image'><img src={product.product_image} alt="" /></div>
        <div className="product-desc">
          <div style={{ padding: '1rem 3rem' }}>
            <p className="product-name">{product.product_name}</p>

            <div style={{ display: 'flex' }}>
              <p className="product-price">$ {product.price}</p>
              <p className='product-rating'>this is rating</p>
            </div>
            <p className='product-description'>{product.description}</p>
            <p className='product-category'>category:<a href='' style={{ textDecoration: 'underline' }} className='hover:text-red-700'>{product.category}</a></p>

          </div>
          <button className='product-addtocart' onClick={()=>EditProduct(product.id)}>Edit</button>
          <button className='bg-red-400 hover:bg-red-500' onClick={DeleteProduct}>Delete</button>
        </div>
      </div>

    </>
  )
}

export default ProductData