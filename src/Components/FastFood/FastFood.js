import React, {useRef,useEffect} from 'react'
//import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

 function FastFood( ) {
    const usenavigate = useNavigate();
    const ref = useRef(null)
    

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

    useEffect(() => {
        ref.current.continuousStart()
        ref.current.complete()

    }, []);


 

    function handleonchange(item){
        let dish = item
        console.log("dish",dish)
        if(dish==='FastFood/Pizza')
        usenavigate(`/${dish}`);


    }

    return (
        <div>

            <div className='bg-light'>
            <LoadingBar color="#f11946" ref={ref} shadow={true} />
                <div className='row'>
                    {foodItems.map((foodItem, index) => (
                        <div className='col-lg-3' key={index}>
                            <div className='card card_shadow mx-5 my-1 '>
                            <div className='card-body ' style={{height:'200px'}}>
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
