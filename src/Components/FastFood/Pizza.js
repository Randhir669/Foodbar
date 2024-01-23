import React, { useEffect,useRef } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../Actions/CartActions'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar'


export function CartProvider() {
   
    const [pizzaiteam, setpizzaitem] = useState([])
    const[cartdetails,setcartdetails]=useState([])
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.cartItems);
    const ref = useRef(null)

   

    var foodItems = [
        {
            id: 1,
            name: 'Margherita Pizza',
            category: 'Pizza',
            isExpanded: false,
            cost: '109',
            cart: 1,
            imageUrl:
                'https://colleenthomas16.files.wordpress.com/2014/09/cropped-pizza.jpg',
            desc: 'Classic delight with 100% real mozzarella cheese. Available in Cheese Burst, Wheat Thin Crust and Pan Crust options.'
        },
        {
            id: 2,
            name: 'Veggie Paradise Pizza',
            category: 'FastFood/Pizza',
            isExpanded: false,
            cost:'189',
            cart: 1,
            imageUrl:
                'https://s3.ap-south-1.amazonaws.com/shopnowchat.com/Medium/MPRwQkwyiWXTd_VeggieParadise.jpg',
            desc: 'The awesome foursome! Golden corn, black olives, capsicum, red paprika'
        },
        {
            id: 3,
            name: 'Paneer, Onion & Capsicum',
            category: 'Pizza',
            isExpanded: false,
            cost:'129',
            cart: 1,
            imageUrl:
                'https://d3ox4wjkl7mf3m.cloudfront.net/recipe/PykcerkHkAWHGTEEuQQv6DmQfch6hjDvwffMpCXe.jpg',
            desc: 'Authentic Indian Flavor of Makhani Sauce loaded with juicy Paneer, crisp Capsicum and crunchy Onion'
        },
        {
            id: 4,
            price: 100,
            category: 'Veggie Fiesta',
            isExpanded: false,
            cart: 1,
            cost:'209',
            name: 'Veggie Fiesta',
            imageUrl: 'https://cache.dominos.com/wam/prod/market/MY/_en/images/promo/d667998f-5520-4898-b881-c1136fdf335a.jpg',
            desc: 'Absolute feast of Corn, Red Paprika, Capsicum & Cheese on your Fav Crust with a no onion no garlic sauce'


        },
        {
            id: 5,
            category: 'Pizza',
            name: 'Onion Pizza',
            isExpanded: false,
            cart: 1,
            cost:'89',
            desc: 'Crunchy onion on a cheesy base. The pizza mania classic',
            imageUrl: 'https://thefusionpizza.in/wp-content/uploads/2021/12/ONION-scaled.jpg'


        },
        {
            id: 6,
            category: 'Pizza',
            name: 'Cheese n Corn Pizza',
            isExpanded: false,
            cost:'99',
            cart: 1,
            desc: 'A delectable combination of sweet & juicy golden corn',
            imageUrl: 'https://www.pizzabank.in/wp-content/uploads/2023/11/Corn-Cheese-Pizza.jpeg'
        }



    ];

    useEffect(() => {
        ref.current.continuousStart()
      
        setpizzaitem(foodItems)
        getcartdetails()
        ref.current.complete()
        
    }, [cartItems]);

    function getcartdetails() {
      let temp = [...cartdetails]

      for(let i = 0 ; i < cartItems.length;i++){
        temp[cartItems[i].id] = cartItems[i]
      }

      if(cartItems.length===0){
        temp=[...cartItems]
      }
      setcartdetails(temp)

    }

   

    function handleonchange(item) {
        let dish = item
        console.log("dish", dish)
      
    }


    function add(id, status) {
        var temp = id;
        let temparray = [...pizzaiteam];
        for (let i = 0; i < foodItems.length; i++) {
            if (pizzaiteam[i].id === temp) {
                temparray[i].isExpanded = !status;
                setpizzaitem(temparray)
            }
        }

    }

    function removeitem(id, noOfItem) {
        
    /*    var temp = id;
        let temparray = [...pizzaiteam];
     
        let updatedItem = { ...temparray[temp] };
        if (cartdetails[id+1].cart != 0) {
            dispatch(removeFromCart(updatedItem));
        }
        if (noOfItem == 0) {
            temparray[temp].isExpanded = false;
            setpizzaitem(temparray)
        }*/


        var temp = id;
        let temparray = [...pizzaiteam];
        
        for (let i = 0; i < foodItems.length; i++) {
            if (temparray[i].id === temp) {
                let updatedItem = { ...temparray[i] };
                if(cartdetails[temp]!==undefined){
                    if (cartdetails[temp].cart !== 0) {
                        dispatch(removeFromCart(updatedItem));
                    }
                }
                
                if (noOfItem === 0) {
                    temparray[i].isExpanded = false;
                    setpizzaitem(temparray)
                }
            }
        }
    }

    const additem = (id, noOfItem) =>{

        let temp = id;
        let temparray = [...pizzaiteam];
        for (let i = 0; i < foodItems.length; i++) {
            if (temparray[i].id === temp) {
                let updatedItem = { ...temparray[i] };
                dispatch(addToCart(updatedItem));
            }
        }

    }
      
    
    return (
      
        <div>

            <div className='bg-light'>
            <LoadingBar color="#f11946" ref={ref} shadow={true} />
                <div className='row d-flex'>
                    {pizzaiteam.map((foodItem, index) => (
                        <div className='col-lg-3 ' key={index}>
                            <div className='card card_shadow mx-5 my-1'>

                                <div className='card-body' style={{height:'200px'}}>
                                    <img
                                        src={foodItem.imageUrl}
                                        alt={foodItem.name}
                                        style={{ height: '100%', width: '100%' }}
                                        className="b_radius cursor d-inline-block zoom-image"
                                        onClick={e => handleonchange(foodItem.handleonchangename)}
                                    />
                                </div>
                                <div className='card-footer'>
                                    <h6>{foodItem.name}</h6>
                                    <div className='row main'>
                                     <div className='col-lg-6 '>   
                                    <b>₹{foodItem.cost}</b>&nbsp;&nbsp;&nbsp;&nbsp;
                                    {(cartdetails[foodItem.id]==undefined ? (!foodItem.isExpanded):false) ? (<button className='btn btn-sm btn-success' onClick={e => add(foodItem.id, foodItem.isExpanded)}>Add</button>)
                                        : (
                                            <>
                                                <button className='btn btn-sm btn-default' onClick={e => removeitem(foodItem.id, 2)}><b>-</b></button><b>{cartdetails[foodItem.id]==undefined ? 0:cartdetails[foodItem.id].cart}</b>
                                                <button className='btn btn-sm btn-default' onClick={e =>additem(foodItem.id, foodItem.cart)}><b>+</b></button>
                                                
                                            </>
                                        )}
                                    </div>
                                  
                                        </div>

                                </div>
                            </div>
                        </div>
                    ))}

                </div>


            </div>





        </div>
       
    )
}


const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
  });

  const mapDispatchToProps =(dispatch)=> ({
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (itemId) => dispatch(removeFromCart(itemId)),
  });

  

  
  export default connect(mapStateToProps,mapDispatchToProps)(CartProvider);


