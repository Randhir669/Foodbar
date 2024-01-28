import React, { useEffect, useState, useRef } from 'react';
//import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar'
import Spinner from 'react-bootstrap/Spinner';
export default function OrderedItems() {
    // Initialize orderDetails as a state variable
    debugger
    //var confirmOrders = useSelector((state) => state.cart.confirmOrders);
    const ref = useRef(null)
    const [confirmOrders, setconfirmOrders] = useState([])
    const[gotorders,setgotorders]=useState(true)
    const username = sessionStorage.getItem('username');
    const url ='https://ooj2f1apol.execute-api.us-west-2.amazonaws.com'
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
            // Now you can safely use confirmorders here
            ref.current.continuousStart();
            if(username){
                await fetchpastorders();  
            }         
            ref.current.complete();
            setgotorders(false)

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
                    
                    fetchcartitems(data)
                   //confirmOrders = data
                    return true;
                }
                else
                    return false
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
                        console.log("Cartdetails===", data)
                        pastorders[i].cartItems = data
                        console.log("pastorders",pastorders)  
                    }
              
                } else {
                    console.error('Failed to fetch data');
                    
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setconfirmOrders(pastorders)
        console.log("confirmOrders",confirmOrders)



    }
  

    return (
        <div>
            <div className='bg-light'>
                <LoadingBar color="#f11946" ref={ref} shadow={true} />
                <div className='row main'>
                    <div className='col-lg-6'>
                        <h6>Order Details</h6>  
                     {gotorders&&<Spinner animation="border" /> }                
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
