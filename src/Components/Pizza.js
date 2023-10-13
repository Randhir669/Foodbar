import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from './Actions/CartActions'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export function CartProvider() {
    //const {addToCart} = props;
    //const {removeFromCart} = props;

    const [pizzaiteam, setpizzaitem] = useState([])
    const [totalCartitem,settotatCart] = useState([])
    const[cartdetails,setcartdetails]=useState([])
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.cartItems);

    const getTotalCartItems = () => {
        return totalCartitem
      };

    var foodItems = [
        {
            id: 1,
            name: 'Margherita Pizza',
            handleonchangename: 'Pizza',
            isExpanded: false,
            cost: '109',
            cart: 0,
            imageUrl:
                'https://colleenthomas16.files.wordpress.com/2014/09/cropped-pizza.jpg',
            desc: 'Classic delight with 100% real mozzarella cheese. Available in Cheese Burst, Wheat Thin Crust and Pan Crust options.'
        },
        {
            id: 2,
            name: 'Veggie Paradise Pizza',
            handleonchangename: 'FastFood/Pizza',
            isExpanded: false,
            cost:'189',
            cart: 0,
            imageUrl:
                'https://s3.ap-south-1.amazonaws.com/shopnowchat.com/Medium/MPRwQkwyiWXTd_VeggieParadise.jpg',
            desc: 'The awesome foursome! Golden corn, black olives, capsicum, red paprika'
        },
        {
            id: 3,
            name: 'Paneer, Onion & Capsicum',
            handleonchangename: 'Pizza',
            isExpanded: false,
            cost:'129',
            cart: 0,
            imageUrl:
                'https://d3ox4wjkl7mf3m.cloudfront.net/recipe/PykcerkHkAWHGTEEuQQv6DmQfch6hjDvwffMpCXe.jpg',
            desc: 'Authentic Indian Flavor of Makhani Sauce loaded with juicy Paneer, crisp Capsicum and crunchy Onion'
        },
        {
            id: 4,
            price: 100,
            handleonchangename: 'Veggie Fiesta',
            isExpanded: false,
            cart: 0,
            cost:'209',
            name: 'Veggie Fiesta',
            imageUrl: 'https://cache.dominos.com/wam/prod/market/MY/_en/images/promo/d667998f-5520-4898-b881-c1136fdf335a.jpg',
            desc: 'Absolute feast of Corn, Red Paprika, Capsicum & Cheese on your Fav Crust with a no onion no garlic sauce'


        },
        {
            id: 5,
            handleonchangename: 'Pizza',
            name: 'Onion Pizza',
            isExpanded: false,
            cart: 0,
            cost:'89',
            desc: 'Crunchy onion on a cheesy base. The pizza mania classic',
            imageUrl: 'https://thefusionpizza.in/wp-content/uploads/2021/12/ONION-scaled.jpg'


        },
        {
            id: 6,
            handleonchangename: 'Pizza',
            name: 'Cheese n Corn Pizza',
            isExpanded: false,
            cost:'99',
            cart: 0,
            desc: 'A delectable combination of sweet & juicy golden corn',
            imageUrl: 'https://namanskitchen.digileaf.in/wp-content/uploads/2021/08/cheese-corn-scaled-450x450.jpg'
        }



    ];

    useEffect(() => {
        setpizzaitem(foodItems)
        getcartdetails()
        
    }, [cartItems]);

    function getcartdetails() {
      let temp = [...cartdetails]

      for(let i = 0 ; i < cartItems.length;i++){
        temp[cartItems[i].id] = cartItems[i]
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
        temparray[temp].isExpanded = !status;
        setpizzaitem(temparray)

    };

    function removeitem(id, noOfItem) {
        
        var temp = id;
        let temparray = [...pizzaiteam];
        let updatedItem = { ...temparray[temp] };
        if (noOfItem != 0) {
          //  updatedItem.cart = noOfItem - 1;

            dispatch(removeFromCart(updatedItem));
        }
        if (noOfItem == 0) {
            temparray[temp].isExpanded = false;
            setpizzaitem(temparray)
        }
    }

    const additem = (id, noOfItem) =>{

        let temp = id;
        let temparray = [...pizzaiteam];
        let updatedItem = { ...temparray[temp] }; 
        updatedItem.cart = noOfItem + 1;
        temparray[temp] = updatedItem;
        setpizzaitem(temparray)
      
        let totalcarts = [...totalCartitem];
        totalcarts.push(temparray[temp])
        settotatCart(totalcarts)

        dispatch(addToCart(updatedItem));

    }
      
    
    return (
      
        <div>

            <div className='bg-light'>
                <div className='row d-flex'>
                    {pizzaiteam.map((foodItem, index) => (
                        <div className='col-lg-2 d-flex my-2' key={index}>
                            <div className='card '>

                                <div className='card-body'>
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
                                    <div className='row'>
                                     <div className='col-lg-6'>   
                                    <b>₹{foodItem.cost}</b>
                                    </div>
                                    <div className='col-lg-6'>
                                    {(cartdetails[foodItem.id]==undefined ? (!foodItem.isExpanded):false) ? (<button className='btn btn-sm btn-success' onClick={e => add(foodItem.id - 1, foodItem.isExpanded)}>Add</button>)
                                        : (
                                            <>
                                                <button className='btn btn-sm btn-default' onClick={e => removeitem(foodItem.id - 1, 2)}><b>-</b></button><b>{cartdetails[foodItem.id]==undefined ? 0:cartdetails[foodItem.id].cart}</b>
                                                <button className='btn btn-sm btn-default' onClick={e =>additem(foodItem.id - 1, foodItem.cart)}><b>+</b></button>
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


