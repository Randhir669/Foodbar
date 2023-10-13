import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

 function FastFood( ) {
    const [items, setitems] = useState(1)
    const [showaddbutton, setshowaddbutton] = useState(true)
    const [showaddremovebutton, setshowaddremovebutton] = useState(false)
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [showAddButton, setShowAddButton] = useState(true);
    const [showAddRemoveButton, setShowAddRemoveButton] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const usenavigate = useNavigate();
    

    var foodItems = [
        {
            id: 1,
            name: 'Crispy Veg Burger',
            handleonchangename:'Pizza',
            imageUrl:
                'https://img.freepik.com/free-photo/still-life-delicious-american-hamburger_23-2149637289.jpg',
        },
        {
            id: 2,
            name: 'Pizza Party',
            handleonchangename:'FastFood/Pizza',
            imageUrl:
                'https://recipesblob.oetker.in/assets/d8a4b00c292a43adbb9f96798e028f01/1272x764/pizza-pollo-arrostojpg.jpg',
        },
        {
            id: 3,
            name: 'Pasta',
            handleonchangename:'Pizza',
            imageUrl:
                'https://static.toiimg.com/thumb/84784534.cms?imgsize=468021&width=800&height=800',
        },
        {
            id:4,
            price: 100,
            handleonchangename:'Pizza',
            name:'Garlic Bread',
            imageUrl:'https://learnmyrecipe.com/wp-content/uploads/2020/10/stuffed-garlic-bread-720x540.jpg'
        

        },
        {
            id:5,
            handleonchangename:'Pizza',
            name:'French Fries',
            imageUrl:'https://www.tastingtable.com/img/gallery/frozen-french-fry-tricks-youll-wish-you-knew-sooner/l-intro-1662484314.jpg'

        },
        {
            id:5,
            handleonchangename:'Pizza',
            name:'Chesse Balls',
            imageUrl:'https://img.taste.com.au/RwjWsftR/taste/2022/10/air-fryer-triple-cheese-boulders-recipe-182632-1.jpg'
        }

        

    ];


    const addToCart = (item) => {
   debugger
      setCart([...cart, item]);
      let element1 =  document.getElementById('addcart'+item.id)
      let element2 = document.getElementById('addcartbtn'+item.id)
      element1.style.display = 'none'
      element2.style.display = ''

    };

    const removeFromCart = (item) => {
        const updatedCart = cart.filter((cartItem) => cartItem !== item);
        setCart(updatedCart);
    };

    const adjustQuantity = (item, quantity) => {
        setQuantities({ ...quantities, [item]: quantity });
    };

    const increaseQuantity = (item) => {
        debugger
        const currentQuantity = quantities[item] || 0;
        adjustQuantity(item, currentQuantity + 1);
    };

    const decreaseQuantity = (item) => {
        const currentQuantity = quantities[item] || 0;
        if (currentQuantity > 0) {
            adjustQuantity(item, currentQuantity - 1);
        }
    };

    function handleonchange(item){
        let dish = item
        console.log("dish",dish)
        usenavigate(`/${dish}`);


    }

  

    return (
        <div>

            <div className='bg-light'>
                <div className='row d-flex'>
                    {foodItems.map((foodItem, index) => (
                        <div className='col-lg-2 d-flex my-2' key={index}>
                            <div className='card '>
                            <div className='card-body'>
                                <img
                                    src={foodItem.imageUrl}
                                    alt={foodItem.name}
                                    style={{ height: '100%', width: '100%' }}
                                    className="b_radius cursor d-inline-block zoom-image"
                                    onClick={e=>handleonchange(foodItem.handleonchangename)}
                                />
                                </div>
                                <div className='card-footer'>
                                <h6>{foodItem.name}</h6>
                                 {/* Conditional rendering of buttons 
                                <h6>₹{foodItem.price}</h6>
                               
                                
                                    <button id= {`addcart${foodItem.id}`}
                                     style = {{display:'show'}}
                                        className='btn btn-success'
                                        onClick={() => {
                                            addToCart(foodItem)
                                           
                                        }}
                                    >
                                        Add
                                    </button>
                                
                                
                                    <div className='btn-group' id= {`addcartbtn${foodItem.id}`} style = {{display:'none'}}>
                                        <button
                                        
                                            className='btn btn-default'
                                            onClick={() => decreaseQuantity(foodItem)}
                                        >
                                            -
                                        </button>
                                        <span>{quantities[foodItem] || 0}</span>
                                        <button 
                                            className='btn btn-default'
                                            onClick={() => increaseQuantity(foodItem)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    */}
                                    
                                
                            </div>
                        </div>
                        </div>
                    ))}

                </div>


            </div>





        </div>
    )
}
export default FastFood;
