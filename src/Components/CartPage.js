import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from './Actions/CartActions'
import { useNavigate } from 'react-router-dom';

export default function CartPage() {

    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const [totatcartcost, settotatcartcost] = useState(0)
    const usenavigate = useNavigate()



    useEffect(() => {
        counttotatcost();

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
        if (noOfItem != 0) {
            //  updatedItem.cart = noOfItem - 1;

               dispatch(removeFromCart(updatedItem[0]));
        }
        if (noOfItem == 0) {
            temparray[temp].isExpanded = false;
            //  setpizzaitem(temparray)
        }
    }

    const additem = (id, noOfItem) => {
       debugger
        let temp = id;
        let temparray = [...cartItems];
        let updatedItem = temparray.filter(item => item.id === temp);
        updatedItem.cart = noOfItem + 1;
        temparray[temp] = updatedItem;
        // setpizzaitem(temparray)

        //  let totalcarts = [...totalCartitem];
        // totalcarts.push(temparray[temp])
        //  settotatCart(totalcarts)
        
        dispatch(addToCart(updatedItem[0]));

    }

    function confirmOrder(){
        usenavigate('/SignIn')

    }

    return (
        <div className='bg-light'>
            <div className='row d-flex'>
                <div className='offset-3 col-lg-6'>
                    <h6>Cart Details</h6>
                    <ul class="list-group">
                        {cartItems.filter((foodItem) => foodItem.cart > 0)
                        .map((foodItem, index) => (  
                         <li className="list-group-item"  style={{ display: 'flex', alignItems: 'center' }}>
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
                        
                        {cartItems.length==0 &&
                         <img
                         src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png"
                         style={{ height: '100%', width: '100%' }}
                         className="b_radius cursor d-inline-block"
                     />
                        }
                 
                    { !cartItems.length==0 && 
                    <>
                    <li className="list-group-item" style={{ display: 'flex',  alignItems: 'center', justifyContent: 'space-between' }}>
                    <textarea className="form-control" placeholder='Any suggestions? We will pass it on...' id="exampleFormControlTextarea1" rows="2" col="5"></textarea>

                    </li>
                    <li className="list-group-item" style={{ display: 'flex',  alignItems: 'center', justifyContent: 'space-between' }}>
                            <h6>Total Pay</h6>
                            <div style={{ flex: 1 }}>

                            </div>
                            <div className='cart_cost'>
                                <span><b>₹{totatcartcost}</b></span>
                            </div>
                            
            
                        </li>
                     <li className="list-group-item" style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}></div>
                        <div>
                          <button className='btn btn-sm btn-success' onClick = {confirmOrder}>Confirm Order</button>
                        </div>
                      </li>
                      </>}
                        
                        

                    </ul>
              

                </div>

            </div></div>
    )
}
