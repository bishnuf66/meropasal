import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Home = () => {
  const [products, SetProduct] = useState([])
  const [category, setCategory] = useState([])
  // console.log(localStorage.getItem('user'))
  console.log(products)
  console.log(products.id)
  console.log(JSON.stringify(category))


  useEffect(() => {
    axios.get('http://localhost:8000/api/productview/')
      .then(res => SetProduct(res.data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8000/getcategory/')
      .then(res => setCategory(res?.data))
      .catch(err => console.log(err))
      .then(res => console.log('category are' + res))

  }, [])

  return (
    <>
      <div className="text-xl font-bold home-links">
        QuickLinks:
        <br />
        <Link className='link' to="/signup">signup</Link>
        <br />
        <Link className='link' to='/login'>Login</Link>
        <br />
        <Link className='link' to='/admin'>Admin page</Link>
        <br />
        <Link className='link' to='/seller'>Seller Homepage</Link>
        <br />
        <Link className='link' to='/unauthorized'>Unauthorized</Link>
        <br />
        <Link className='link' to='/lounge'>Lounge</Link>
      </div>

      <div className='home'>
        <div className='category_filter'>
          {category.map((item, index) => (
            <a href={`product/${item.category}`} key={index}>{item.category}</a>
          ))}
        </div>
        <div className='filtered_product'>
          {products.map((product, index) => (
            <Card item={product} key={index} />
          ))}
        </div>

      </div>


    </>
  )
}

export default Home