import React from 'react'
import { useNavigate } from 'react-router-dom'


const Card = (props) => {
  const navigate=useNavigate()
  return (
    <div className='card'>
      <div className="card-image"><img src={props.item.product_image} alt="img" /></div>
      <div className="card-desc">
        <h1>{props.item.product_name}</h1>
        <p>${props.item.price}</p>
        <button className='card-button' onClick={()=>{navigate(`/productdetails/${props.item.id}`)}}>View Details</button>
      </div>
    </div>
  )
}

export default Card