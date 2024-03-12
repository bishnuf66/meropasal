import axios from "axios"
import { useEffect, useState } from "react"

const OrderPage = (props) => {
  const userdata = JSON.parse(localStorage.getItem('user'))
  const [userid, setUserid] = useState()
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [paymentmethod, setPaymentMethod] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('')

  const [orderdataforEsewa,setOrderdataforEsewa]=useState({})

  const productid = props.data.product.id  //do this things inside async function and loop over every element in cart
  console.log(props)
  console.log(productid)
  console.log(userdata.user.id)

  useEffect(() => {
    if (!paymentmethod) {
      axios.get('http://localhost:8000/api/viewpaymentmethod/')
        .then(res => {
          const PaymentMethodArray = (Object.values(res?.data))// Convert response object to array
          setPaymentMethod(PaymentMethodArray)
        })
        .catch(err => console.log(err))
    }

    //get the user id from the local storage
    const userdata = JSON.parse(localStorage.getItem('user')) || {}
    setUserid(userdata?.user?.id)
    console.log(`user  is ${userdata?.user?.id}`)
  }, [paymentmethod, userid])

  console.log(`length of product=${props.data.product.length}`)
  // const OrderHandler = async (e) => {
  //   e.preventDefault()

  //   try {
  //     //when the order is being done from cart, the orders will be an array
  //     if (Array.isArray(props.data.product)) {  //check if the product is an  array (from the cart page we will send an array of multiple product objects)
  //       const orderdata = props.data.product.map(product => ({
  //         product: product.id,
  //         user: userid,
  //         seller: product.seller,
  //         quantity: product.quantity,
  //         address: address,
  //         paymentmethod: selectedMethod,
  //       }))

  //       console.log(`order data= ${orderdata}`)
  //       console.log(JSON.stringify(orderdata, null, 2));

  //       await axios.post(`http://localhost:8000/order/${userid}/`, { orders: orderdata }, { headers: { 'Content-Type': "application/json", "Authorization": `Token ${userdata.token}` } })


  //       if (selectedMethod === '2') {
  //         props.data.product.map(product => (
  //           callEsewa({ product_id: product.id, price: product.price * product.quantity })
  //         ))
  //       }

  //       localStorage.removeItem('MyCart')
  //       // window.location.reload()

  //       //when the order is being done directly from product page, it is an object.
  //     } else if (props.data.product) {
  //       // If props.data.product is an object (from the product page)
  //       const orderData = {
  //         product: props.data.product.id,
  //         user: userid,
  //         seller: props.data.product.seller,
  //         quantity: props.data.product.quantity,
  //         address: address,
  //         paymentmethod: selectedMethod,
  //       }
  //       console.log(`order data= ${orderData}`)
  //       console.log(JSON.stringify(orderData, null, 2));

  //       //-------------------------------------------------------------orderdata is set as an array because backend expexts an array, nothing more
  //       await axios.post(`http://localhost:8000/order/${userid}/`, { orders: [orderData] }, { headers: { 'Content-Type': "application/json", "Authorization": `Token ${userdata.token}` } });

  //       if (selectedMethod === '2') {
  //         callEsewa({ product_id: orderData.product, price: props.data.price })
  //       }

  //       // window.location.reload()


  //     } else {
  //       // Handle the case where props.data.product is not defined
  //       console.error('No product data to place an order.');
  //     }
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }

  // }


  const OrderHandler = async (e) => {
    e.preventDefault()

    try {

      //set the order data
      const order_detail = {
        "user": userid,
        "address": address,
        "city": city,
        "total_price": props.data.price,
        "payment_method": +selectedMethod,
      }


      //product has all its data with it. so price, quantity name and everything being sent from cart or the details
      // console.log(props.data.product)
      const order_items = props.data.product.map(product => ({
        product: product.id,
        price: product.price,
        quantity: product.quantity
      }))

      const response=await axios.post(`http://localhost:8000/order/${userid}/`, { order_detail: order_detail, order_items: order_items }, { headers: { 'Content-Type': "application/json", "Authorization": `Token ${userdata.token}` } });
      console.log(response)
      if (selectedMethod === '2') {

        callEsewa({order_id:response.data.id,price:response.data.total_price})
        console.log("orderid: "+response.data.id)
        console.log("amt: "+response.data.total_price)
    }


    console.log("orders: " + JSON.stringify(order_detail))
    console.log("order item: " + JSON.stringify(order_items))

  } catch (error) {
    console.log(error)
  }
}

const callEsewa = (orderdata) => {
  var path = "https://uat.esewa.com.np/epay/main";

  console.log('order data in esewa: ' + JSON.stringify(orderdata)) //to check is this function is running or not.
  var params = {
    amt: orderdata.price,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: orderdata.price,
    pid: orderdata.order_id,
    scd: "EPAYTEST",
    su: "http://localhost:3000/esewa_payment_success",
    fu: "http://localhost:3000/esewa_payment_failed"
  }

  function post(path, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
    // document.body.removeChild(form);
  }
  //call the function . it is not in documentation.
  post(path, params);
}



useEffect(() => {
  console.log(selectedMethod)
}, [selectedMethod])

return (
  <>
    <div>
      <form className="order-form" onSubmit={OrderHandler}>
        <div className="order-input">
          <label htmlFor="Address">Address</label>
          <input type="text" id="Address" onChange={(event) => { setAddress(event.target.value) }} value={address} required />
        </div>
        <div className="order-input">
          <label htmlFor="City">City</label>
          <input type="text" id="City" onChange={(event) => { setCity(event.target.value) }} value={city} required />
        </div>
        <div>
          <label htmlFor="paymentmethod">Payment Method:</label>

          {paymentmethod.length > 0 ? (
            <select id="paymentmethod" onChange={(event) => setSelectedMethod(event.target.value)} value={selectedMethod} required>
              <option value="">Select an option</option>
              {
                paymentmethod.map((paymentobj, index) => (
                  <option key={index} value={paymentobj.id}>{paymentobj.paymentmethod}</option>
                ))
              }

            </select>
          ) : (
            <span>loading payment methods...</span>
          )
          }
        </div>

        <button>Order Now</button>

      </form>
    </div>

  </>
)
}

export default OrderPage