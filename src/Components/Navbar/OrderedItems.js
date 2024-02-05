import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import Spinner from 'react-bootstrap/Spinner';
export default function OrderedItems() {
    //var confirmOrders = useSelector((state) => state.cart.confirmOrders);
    const ref = useRef(null)
    const [confirmOrders, setconfirmOrders] = useState([])
    const [gotorders, setgotorders] = useState(true)
    const [noorders, setnoorders] = useState(false)
    const[pastnoorders,setpastnoorders] = useState(false)
    const username = sessionStorage.getItem('username');
    const url = 'https://ooj2f1apol.execute-api.us-west-2.amazonaws.com'
    const usenavigate = useNavigate();
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    };


    useEffect(() => {
        const fetchData = async () => {
            ref.current.continuousStart();
            if (username) {
                await fetchpastorders();
            } else {
                ref.current.complete();
                setgotorders(false)
                setnoorders(true)
            }


        };

        fetchData();
    }, []);  // eslint-disable-line

    async function fetchpastorders() {
        var phone = sessionStorage.getItem('phone');
        console.log("phone===", phone)
        try {
            const response = await fetch(`${url}/getallorders/${phone}`); // Replace with your actual API endpoint
            if (response.ok) {
                const data = await response.json();

                if (data.length !== 0) {
                    console.log("Orderdetails===", data)
                    console.log("data", data)
                    setTimeout(() => {
                        fetchcartitems(data)

                    }, 1000);
                }else{
                    console.log("No orders")
                    ref.current.complete();
                    setgotorders(false)
                    setpastnoorders(true)

                    return false
                }
                    
            } else {
                console.error('Failed to fetch user');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
        }


    }

    async function fetchcartitems(pastorders) {
        for (let i = 0; i < pastorders.length; i++) {

            let orderid = pastorders[i].orderid
            try {
                const response = await fetch(`${url}/getallcartsitems/${orderid}`); // Replace with your actual API endpoint
                if (response.ok) {
                    const data = await response.json();

                    if (data.length !== 0) {
                       
                        pastorders[i].cartItems = data
                    
                    }

                } else {
                    console.error('Failed to fetch data');

                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setconfirmOrders(pastorders)
        ref.current.complete();
        setgotorders(false)
      
    }

    function navigatetopage(){
        usenavigate('/SignIn')
    }


    return (
        <div>
            <div className='bg-light'>
                <LoadingBar color="#f11946" ref={ref} shadow={true} />
                <div className='row main'>
                    <div className='col-lg-6'>
                        <h3 className='my-2'>Orders</h3>

                        {noorders && <p className='my-2'>Please <a href='/SignIn' style={{ color: "blue", textDecoration: "underline" }}>SignIn</a> to See Past Orders</p>}
                        {gotorders && <Spinner animation="border" />}
                      {pastnoorders&&  <p>No orders yet <a  onClick = {navigatetopage} style={{ color: "green", textDecoration: "underline" }}>Browse Foods</a></p>}
                        <ul class="list-group">
                            {confirmOrders.map((CartItems, index) => (
                                <>
                                    {CartItems.cartItems.map((foodItem, index) => (
                                        <li className="list-group-item" style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={foodItem.imageurl}
                                                alt={foodItem.name}
                                                style={{ height: '10%', width: '10%' }}
                                                className="b_radius cursor d-inline-block zoom-image"
                                            />&nbsp;&nbsp;
                                            <h6>{foodItem.name}</h6>
                                            <div style={{ flex: 1 }}>
                                            </div>
                                            <div className='cart_cost'>
                                                &nbsp;&nbsp;<span>₹{foodItem.cost} <b>*{foodItem.cart}</b></span>
                                            </div>
                                        </li>
                                    ))}
                                  
                                    <div className='list-group-item order-details'>
                                        <div className='row'>
                                        <div className='left-corner '>
                                                <h6 className='cart_cost'>Total: {CartItems.totalamount}</h6>
                                                <h6 className='cart_cost'>Payment Mode: {CartItems.paymentmode}</h6>
                                                <h6 className='cart_cost'>Address: {CartItems.address}</h6>
                                            </div>
                                            <div className='right-corner '>
                                                <button className='btn btn-sm btn-success'>{CartItems.status}</button>
                                                <h6 className='cart_cost my-1'>{new Date(CartItems.date).toLocaleString("en-GB", options)}</h6>
                                            </div>

                                        </div>
                                    </div >
                                    <br></br>
                                </>

                            ))}



                        </ul>


                    </div>

                </div></div>

        </div >
    );
}
