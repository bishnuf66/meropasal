import logo from '../../images/logo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'

const SellerHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const logout = () => {
        localStorage.removeItem('user')
        window.location.reload()  //this reloads the page to show changes.
    }
    console.log(user.user.email)
    return (
        <nav>
            <div class="logo"><a href="/"><img src={logo} alt="logo" /></a></div>
            <ul>
                <li><a href="/seller">Home</a></li>
                <li><a href="#">My Products</a></li>
                <li><a href="/seller/orders">Orders</a></li>
                <li><a href="/seller/AddProduct">Add Products</a></li>
            </ul>

            <div className="nav-right">

                {user ?
                    <div>
                        <span>Welcome! {user.user.first_name} {user.user.last_name} </span>
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

export default SellerHeader