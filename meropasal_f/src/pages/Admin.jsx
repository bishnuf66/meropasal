import {Link} from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import AdminHeader from './Admin/AdminHeader'

const Admin = () => {
  return (
    <>
    <AdminHeader/>
    <Outlet/>
    {/* <Link to="/AddCategory"> Add Category</Link> */}
    </>
    
  )
}

export default Admin