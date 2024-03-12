import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import OrderPage from '../pages/User/OrderPage'


const Cart = () => {
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(product.quantity)  //future note maybe do a useeffect hook that will update quantity when quantity changes
    const [total, setTotal] = useState()

    const [orderclicked, setOrderClicked] = useState(false)

    console.log(product)
    console.log(quantity)

    useEffect(() => {
        const MyCart = localStorage.getItem('MyCart')
        const parsedcart = JSON.parse(MyCart) || [] //if there is no  MyCart then set an empty array

        setProduct(parsedcart)

        //use the parsed cart to get the total cart amount (not possible by directly using product, we need the extra variable parsed cart !!?)
        const totalamt = parsedcart.reduce((accumulator, item) => (
            accumulator + item.quantity * item.price
        ), 0)
        setTotal(totalamt)
        console.log("total amt should be:" + total)
        console.log("total amt should be:" + totalamt)

    }, [])
    console.log("total amt should be:" + total)

    const decreasequantity = (id) => {
        const updateproducts = product.map(item => {
            if (item.id == id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 } // ...item = item value doesnot changes only quantity
            }
            return item
        })
        setProduct(updateproducts) //this changes the data in the view and not only in the local storage. works like a constant update
        localStorage.setItem('MyCart', JSON.stringify(updateproducts)) // this updates the local storage
    }
    const increasequantity = (id) => {
        const updateproducts = product.map(item => {
            if (item.id == id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        setProduct(updateproducts)
        localStorage.setItem('MyCart', JSON.stringify(updateproducts))
    }

    const removecartitem = (id) => {
        const updatedcart = product.filter((item) => item.id !== id) //filter method is used to create a new array called updatedCart that includes all items except the one with the specified id
        setProduct(updatedcart)  // This updated array is then set as the new state for product and stored in localStorage.
        localStorage.setItem('MyCart', JSON.stringify(updatedcart))
        toast.success("Item deleted")
    }
    const OrderNow = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setOrderClicked(true)
    }
    return (
        <>
            <ToastContainer theme='colored' position='top-center' />
            {product.length === 0
                ?
                <div className="cart-empty">Your cart is empty. <a href="/" className="hover:text-red-500 underline">Shop Now</a></div>
                :
                <div className="cart-container">
                    <div className="cart-products">

                        <div >
                            {product.map((item, i) => (
                                <div className="cart-items" key={i}>
                                    <img src={item.product_image} alt="" />
                                    <p style={{ width: '30ch' }}>{item.product_name}</p>
                                    <p>${item.price}</p>
                                    <button className='hover:bg-slate-400 cart-decrease' onClick={() => decreasequantity(item.id)}>-</button>
                                    <input className="cart-quantity" type="number" readOnly value={item.quantity} />
                                    <button className='hover:bg-slate-400 cart-increase' onClick={() => increasequantity(item.id)}>+</button>
                                    <button className='bg-amber-400 hover:bg-amber-600 cart-delete' onClick={() => removecartitem(item.id)} >Delete</button>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="cart-result">
                        <p>Cart Summary</p>
                        <p>Items: {product.length}</p>
                        <p>Total Amount: {
                            product.reduce((accumulator, product) => (
                                accumulator + product.quantity * product.price
                            ), 0)
                        }</p>
                        <button onClick={OrderNow}>Order Now</button>
                    </div>
                </div>
            }
            {orderclicked &&
                <div className='order'>
                    <button onClick={() => setOrderClicked(false)}>Cancel</button>
                    <OrderPage data={{ product: product, price: total }} />
                </div>
            }
        </>
    )
}

export default Cart