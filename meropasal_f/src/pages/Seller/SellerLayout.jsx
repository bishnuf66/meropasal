import React from 'react'
import { Outlet } from 'react-router-dom'
import SellerHeader from './SellerHeader'

const SellerLayout = () => {
  return (
    <>
    <SellerHeader/>
    <Outlet/>
    </>
  )
}

export default SellerLayout