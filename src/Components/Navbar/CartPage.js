import React, { useEffect, useState, useRef } from 'react'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, addconfirmorder } from '../Actions/CartActions'
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function CartPage() {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const [orderedItems, setorderedItems] = useState([])
    const dispatch = useDispatch();
    const [totatcartcost, settotatcartcost] = useState(0)
    const [suggestion, setsuggestion] = useState('')
    const [address, setaddress] = useState('')
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const ref = useRef(null)
    const MySwal = withReactContent(Swal)
    const url ='https://ooj2f1apol.execute-api.us-west-2.amazonaws.com'
    const savedaddress = sessionStorage.getItem('address');
    const[confirmbtnloading,setconfirmbtnloading]=useState(false)

    const usenavigate = useNavigate()



    useEffect(() => {   
        ref.current.continuousStart()
        counttotatcost();
        ref.current.complete()
        setaddress(savedaddress)

    }, [cartItems]);

    function counttotatcost() {
        let cost = 0;
        console.log("cartItems", cartItems)
        for (let i = 0; i < cartItems.length; i++) {
            let totatcost = parseInt(cartItems[i].cost) * cartItems[i].cart;
            cost = cost + totatcost
        }
        settotatcartcost(cost)


    }
    function removeitem(id, noOfItem) {

        var temp = id;
        let temparray = [...cartItems];
        let updatedItem = temparray.filter(item => item.id === temp);
        if (noOfItem !== 0) {
            //  updatedItem.cart = noOfItem - 1;

            dispatch(removeFromCart(updatedItem[0]));
        }
        if (noOfItem === 0) {
            temparray[temp].isExpanded = false;
            //  setpizzaitem(temparray)
        }
    }

    const additem = (id, noOfItem) => {
        let temp = id;
        let temparray = [...cartItems];
        let updatedItem = temparray.filter(item => item.id === temp);
        updatedItem.cart = noOfItem + 1;
        temparray[temp] = updatedItem;
        dispatch(addToCart(updatedItem[0]));
    }

    async function confirmOrder() {
        setconfirmbtnloading(true)
        var username = sessionStorage.getItem('username');
        var obj = {}
        obj.cartItems = cartItems
        obj.suggestion = suggestion
        obj.address = address
        obj.Username = username
        obj.totalamount = totatcartcost
        obj.paymentmode = selectedPaymentMethod
        obj.date = new Date();
        obj.status = "Odered"
        obj.phone = sessionStorage.getItem('phone');
        obj.orderId = "Food" + generateOrderId();

        let temp = [...orderedItems]
        temp.push(obj)
        setorderedItems(temp)

        if (username != null) {
            const status = await storeordertodb(obj)
            await  dispatch(addconfirmorder(temp[0]))
           setTimeout(()=>{
            setconfirmbtnloading(false)
           },2000)
           await dispatch({ type: 'Remove_All_from__CART' });
            if(status){
                MySwal.fire({
                    title: <strong>Good Job {username}!</strong>,
                    html: <i>your orders are successfully placed.Thank You!</i>,
                    icon: 'success',
                    showClass: {
                        popup: 'fade-in',
                      },
                      customClass: {
                        popup: 'slide-in',
                      },
                      
                })
            }

        } else {
            usenavigate('/SignIn')
        }


    }

    async function storeordertodb(oderdetails) {

        var obj = oderdetails
        try {
            const response = await fetch(url + '/placedorders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('order added:', data);
                return true;
            } else {
                console.error('Failed to add user');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }

    }

    function generateOrderId() {

        const timestamp = new Date().getTime();
        const randomNum = Math.floor(Math.random() * 1000);
        const orderId = `${timestamp}-${randomNum}`;

        return orderId;
    }

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value); // Update the state with the selected value
    };

    function handleaddress(event) {
        setaddress(event.target.value)
        sessionStorage.setItem('address', event.target.value);
        let add = sessionStorage.getItem('address');


    }

    return (
        <div className='bg-light'>
            <LoadingBar color="#f11946" ref={ref} shadow={true} />
            <div className='row main'>
                <div className='col-lg-6 '>

                    <ul class="list-group ">
                        {cartItems.filter((foodItem) => foodItem.cart > 0)
                            .map((foodItem, index) => (
                                <li className="list-group-item " style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={foodItem.imageUrl}
                                        alt={foodItem.name}
                                        style={{ height: '10%', width: '10%' }}
                                        className="b_radius cursor d-inline-block zoom-image"
                                    />&nbsp;&nbsp;
                                    <h6>{foodItem.name}</h6>
                                    <div style={{ flex: 1 }}>
                                    </div>
                                    <div className='cart_design'>
                                        <button className='btn btn-sm btn-default' onClick={e => removeitem(foodItem.id, 2)}><b>-</b></button>
                                        {foodItem.cart}
                                        <button className='btn btn-sm btn-default ' onClick={e => additem(foodItem.id, foodItem.cart)}><b>+</b></button>
                                    </div>
                                    <div className='cart_cost'>
                                        &nbsp;&nbsp;<span>₹{foodItem.cost * foodItem.cart}</span>
                                    </div>
                                </li>
                            ))}

                        <>    {cartItems.length === 0 &&
                            <img
                                src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png"
                                style={{ height: '100%', width: '100%' }}
                                className="b_radius cursor d-inline-block"
                            />
                        }</>

                        <ul class="list-group ">{cartItems.length !== 0 &&
                            <>
                                <li className="list-group-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <textarea className="form-control" onChange={e => setsuggestion(e.target.value)} placeholder='Any suggestions? We will pass it on...' id="exampleFormControlTextarea1" rows="2" col="5"></textarea>

                                </li>
                                <li className="list-group-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <textarea className="form-control" value={address} onChange={handleaddress} placeholder='Address..' id="exampleFormControlTextarea1" rows="2" col="5"></textarea>

                                </li>
                                <li className="list-group-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h6>Total Pay</h6>
                                    <div style={{ flex: 1 }}>

                                        <input type="radio" className='form-check-input' name="paymentMethod" id="flexRadioDefault1" value="COD"
                                            checked={selectedPaymentMethod === 'COD'}
                                            onChange={handlePaymentMethodChange}
                                        />&nbsp;
                                        <label class="form-check-label cart_cost" for="flexRadioDefault1">
                                            <b>COD</b>
                                        </label>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <input type="radio" className='form-check-input' name="paymentMethod" id="flexRadioDefault2" value="UPI"
                                            checked={selectedPaymentMethod === 'UPI'}
                                            onChange={handlePaymentMethodChange}
                                        />&nbsp;
                                        <label class="form-check-label cart_cost" for="flexRadioDefault2"> <b>UPI</b>
                                        </label>
                                    </div>
                                    <div className='cart_cost'>
                                        <span><b>₹{totatcartcost}</b></span>
                                    </div>


                                </li>
                                <li className="list-group-item" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>


                                    </div>
                                    <div>
                                        <button className='btn btn-sm btn-success' onClick={confirmOrder}>
                                        {confirmbtnloading ? <div className="spinner"></div> : "Confirm Order"}</button>
                                    </div>
                                </li>
                            </>}</ul>



                    </ul>


                </div>

            </div></div>
    )


}






