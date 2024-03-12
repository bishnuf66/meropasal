import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Card from "../components/Card"

const Filtered_Product = () => {
  const [product, SetProduct] = useState([])
  const [category, setCategory] = useState([])

  const params = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/filterproduct/${params.category}/`)
      .then(res => SetProduct(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/getcategory/')
      .then(res=>setCategory(res?.data))
      .catch(err => console.log(err))
      .then(res => console.log('category are' + res))
      
  }, [])

  return (
    <>
    <h2>{params.category}</h2>
      <div className='home'>
        <div className='category_filter'>
          {category.map((item, index) => (
            <a href={`${item.category}`} key={index}>{item.category}</a>
          ))}
        </div>
        <div className='filtered_product'>
          {product.map((product, index) => (
            <Card item={product} key={index} />
          ))}
        </div>

      </div>
    </>
  )
}

export default Filtered_Product