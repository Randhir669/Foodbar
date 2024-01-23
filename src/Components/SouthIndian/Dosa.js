import React, { useEffect} from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../Actions/CartActions'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export function CartProvider() {
    const [dosaiteam, setdosaitem] = useState([])

    const [cartdetails, setcartdetails] = useState([])
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.cartItems);

    var foodItems = [
        {
            id: 11,
            name: 'Plain Dosa',
            category: 'Dosa',
            isExpanded: false,
            cost: '60',
            cart: 1,
            imageUrl:
                'https://qph.cf2.quoracdn.net/main-qimg-8cad0ea007a15f3e449d62326828a703-lq',
            desc: 'Classic delight with 100% real mozzarella cheese. Available in Cheese Burst, Wheat Thin Crust and Pan Crust options.'
        },
        {
            id: 12,
            name: 'Masala Dosa',
            category: 'Dosa',
            isExpanded: false,
            cost: '50',
            cart: 1,
            imageUrl:
                'https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-500x500.jpg',
            desc: 'The awesome foursome! Golden corn, black olives, capsicum, red paprika'
        },
        {
            id: 13,
            name: 'Paneer Dosa',
            category: 'Dosa',
            isExpanded: false,
            cost: '119',
            cart: 1,
            imageUrl:
                'https://thumbs.dreamstime.com/b/paneer-dosa-masala-crispy-indian-savory-crepe-delicious-filling-made-cottage-cheese-195902450.jpg',
            desc: 'Authentic Indian Flavor of Makhani Sauce loaded with juicy Paneer, crisp Capsicum and crunchy Onion'
        },
        {
            id: 14,
            category: 'Dosa',
            isExpanded: false,
            cart: 1,
            cost: '139',
            name: 'Cheese Dosa',
            imageUrl: 'https://wbcdn.in/assets/img/uploads/cache/recipe_inline/2017/nov/img_073a6dd709bea2c687d9e757abce07fcf0584ff4_870_.jpg',
            desc: 'Absolute feast of Corn, Red Paprika, Capsicum & Cheese on your Fav Crust with a no onion no garlic sauce'


        },
        {
            id: 15,
            category: 'Dosa',
            name: 'Butter Dosa',
            isExpanded: false,
            cart: 1,
            cost: '119',
            desc: 'Crunchy onion on a cheesy base. The pizza mania classic',
            imageUrl: 'https://mskitchens.in/cdn/shop/files/Untitleddesign_54.png?v=1685256436'


        },
        {
            id: 16,
            category: 'Dosa',
            name: 'Onion Dosa',
            isExpanded: false,
            cost: '89',
            cart: 1,
            desc: 'A delectable combination of sweet & juicy golden corn',
            imageUrl: 'https://b.zmtcdn.com/data/dish_photos/986/0996be2568661794a24d256873a11986.jpg'
        }

    ];


    useEffect(() => {


        setdosaitem(foodItems)
        getcartdetails()

    }, [cartItems]);



    function getcartdetails() {
        let temp = [...cartdetails]

        for (let i = 0; i < cartItems.length; i++) {
            temp[cartItems[i].id] = cartItems[i]
        }

        if (cartItems.length == 0) {
            temp = [...cartItems]
        }
        setcartdetails(temp)

    }

    function handleonchange(item) {
        let dish = item
        console.log("dish", dish)

    }

    function add(id, status) {

        var temp = id;
        let temparray = [...dosaiteam];
        for (let i = 0; i < foodItems.length; i++) {
            if (dosaiteam[i].id == temp) {
                temparray[i].isExpanded = !status;
                setdosaitem(temparray)
            }
        }


    };

    function removeitem(id, noOfItem) {

        var temp = id;
        let temparray = [...dosaiteam];
        
        for (let i = 0; i < foodItems.length; i++) {
            if (dosaiteam[i].id == temp) {
                let updatedItem = { ...temparray[i] };
                if (cartdetails[id].cart != 0) {
                    dispatch(removeFromCart(updatedItem));
                }
                if (noOfItem == 0) {
                    temparray[i].isExpanded = false;
                    setdosaitem(temparray)
                }
            }
        }
      
    }

    const additem = (id, noOfItem) => {

        let temp = id;
        let temparray = [...dosaiteam];
        for (let i = 0; i < foodItems.length; i++) {
            if (dosaiteam[i].id == temp) {
                let updatedItem = { ...temparray[i] };
                dispatch(addToCart(updatedItem));
            }
        }
    }
    
    return (
        <div className=''>

            <div className='row'>
                {dosaiteam.map((foodItem, index) => (
                    <div className='col-lg-3 ' key={index}>
                        <div className='card mx-5 my-1 card_shadow'>

                            <div className='card-body'style={{height:'200px'}}>
                                <img
                                    src={foodItem.imageUrl}
                                    alt={foodItem.name}
                                    style={{ height: '100%', width: '100%' }}
                                    className="b_radius cursor d-inline-block zoom-image"
                                    onClick={e => handleonchange(foodItem.handleonchangename)}
                                />
                            </div>
                            <div className='card-footer '>
                                <h6>{foodItem.name}</h6>
                                <div className='row main'>
                                    <div className='col-lg-6'>
                                        <b>₹{foodItem.cost}</b>&nbsp;&nbsp;&nbsp;&nbsp;
                                        {(cartdetails[foodItem.id] == undefined ? (!foodItem.isExpanded) : false) ? (<button className='btn btn-sm btn-success' onClick={e => add(foodItem.id, foodItem.isExpanded)}>Add</button>)
                                            : (
                                                <>
                                                    <button className='btn btn-sm btn-default' onClick={e => removeitem(foodItem.id, 2)}><b>-</b></button><b>{cartdetails[foodItem.id] == undefined ? 0 : cartdetails[foodItem.id].cart}</b>
                                                    <button className='btn btn-sm btn-default' onClick={e => additem(foodItem.id, foodItem.cart)}><b>+</b></button>

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






    )
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (itemId) => dispatch(removeFromCart(itemId)),
});




export default connect(mapStateToProps, mapDispatchToProps)(CartProvider);
