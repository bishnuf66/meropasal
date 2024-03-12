import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./hooks/RequireAuth";

import Layouts from "./pages/Layouts";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Notfound from "./pages/Notfound";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import SellerHomepage from "./pages/Seller/SellerHomepage";
import Unauthorized from "./pages/Unauthorized";
import Lounge from "./pages/Lounge";
import AddCategory from "./pages/Admin/AddCategory";
import AddProduct from "./pages/Seller/AddProduct"
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import MyOrders from "./pages/User/MyOrders";
import SellerLayout from "./pages/Seller/SellerLayout";
import ProductData from "./pages/Seller/ProductData";
import UpdateProduct from "./pages/Seller/UpdateProduct";
import Profile from "./pages/User/Profile";
import Email from "./components/Email";
import ResetPassword from "./components/ResetPassword";
import Filtered_Product from "./pages/Filtered_Product";
import EsewaFailed from "./components/EsewaFailed";
import EsewaSuccess from "./components/EsewaSuccess";
import Orders from "./pages/Seller/Orders";
import SignUpOptions from "./components/SignUpOptions";
import SellerSignup from "./pages/Seller/SellerSignup";
import AdminHome from "./pages/Admin/AdminHome";
import Search from "./components/Search";






function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="signup/user" element={<Signup />} />
            <Route path="signup" element={<SignUpOptions />} />
            <Route path="signup/seller" element={<SellerSignup />} />
            <Route path='login' element={<Login />} />
            <Route path="productdetails/:productid" element={<ProductDetails />} />
            <Route path="product/:category" element={<Filtered_Product />} />
            <Route path="product/search" element={<Search/>}/>

            <Route path="esewa_payment_success" element={<EsewaSuccess />} />
            <Route path="esewa_payment_failed" element={<EsewaFailed />} />

            <Route path="resetuserpassword" element={<Email />} />
            <Route path="user/reset_password/:userid/:token/" element={<ResetPassword />} />

            <Route element={<RequireAuth allowedRoles={['admin', 'seller', 'user']} />}>
              <Route path="cart" element={<Cart />} />
              <Route path="myorders" element={<MyOrders />} />
              <Route path='profile' element={<Profile />} />
            </Route>
          </Route>



          {/* the below ones are protected routes which will check the roles that are given from the backend */}
          {/* <Route element={<RequireAuth allowedRoles={['admin']}/>}> */}
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="/admin" element={<Admin />}>
              <Route index element={<AdminHome />} />
              <Route path='AddCategory' element={<AddCategory />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={['seller']} />}>
            <Route path="/seller" element={<SellerLayout />}>
              <Route index element={<SellerHomepage />} />
              <Route path="productdata" element={<ProductData />} />
              <Route path="AddProduct" element={<AddProduct />} />
              <Route path="Update/:id" element={<UpdateProduct />} />
              <Route path="orders" element={<Orders />} />
            </Route>

          </Route>

          <Route element={<RequireAuth allowedRoles={['admin', 'seller']} />}>
            <Route path='lounge' element={<Lounge />} />  {/* lounge can be accessed both by admins and sellers */}
          </Route>

          {/* catch all 404 401 page  */}
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
