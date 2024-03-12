import logo from '../../images/logo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUser } from '@fortawesome/free-solid-svg-icons'


const AdminHeader = () => {
    const user=JSON.parse(localStorage.getItem('user'))
    console.log(user)
    const logout = () => {
        localStorage.removeItem('user')
        window.location.reload()  //this reloads the page to show changes.
    }
  return (
    <nav>
            <div class="logo"><a href="/"><img src={logo} alt="logo" /></a></div>
            <ul>
                <li><a href="/admin">Home</a></li>
                <li><a href="/admin">All Products</a></li>
                <li><a href="/seller/orders">All users</a></li>
                <li><a href="/AddCategory">Add Category</a></li>
            </ul>

            <div className="nav-right">

                {user ?
                    <div>
                        <span>Welcome! {user.user.email} </span>
                        <FontAwesomeIcon className='icon' icon={faUser} size='xl' />/
                        <button onClick={logout}>log-out</button>
                    </div>
                    :
                    <div>
                        <a href="/signup">Sign Up</a>/
                        <a href="/login">Sign In</a>
                    </div>
                }

            </div>

        </nav>
  )
}

export default AdminHeader