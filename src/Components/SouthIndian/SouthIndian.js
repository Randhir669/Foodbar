import React, {useRef,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default function SouthIndian() {
  const usenavigate = useNavigate();
  const ref = useRef(null)
  

  var foodItems = [
      {
          id: 1,
          name: 'Dosa',
          handleonchangename:'SouthIndian/Dosa',
          imageUrl:
              'https://c.pxhere.com/photos/61/6d/indian_vegetarian_food_hong_kong-786750.jpg!d',
      },
      {
          id: 2,
          name: 'Idli',
          handleonchangename:'SouthIndian/Idli',
          imageUrl:
              'https://cdn.tarladalal.com/td_cont_img/Idli-(2).JPG',
      },
      {
          id: 3,
          name: 'Vada',
          handleonchangename:'SouthIndian/Vada',
          imageUrl:
              'https://images.news18.com/ibnkhabar/uploads/2023/02/suji-medu-vada-16754964053x2.jpg',
      },
      {
          id:4,
          
          handleonchangename:'SouthIndian/Appe',
          name:'Appe',
          imageUrl:'https://yennadosa.com/wp-content/uploads/2018/05/Masala_Paniyara.jpg'
      

      },
      {
          id:5,
          handleonchangename:'SouthIndian/uthappam',
          name:'Onion Uthappam',
          imageUrl:'https://static.toiimg.com/thumb/msid-70041264,width-1280,resizemode-4/70041264.jpg'

      },
      {
        id:5,
        handleonchangename:'SouthIndian/uthappam',
        name:'Onion Uthappam',
        imageUrl:'https://static.toiimg.com/thumb/msid-70041264,width-1280,resizemode-4/70041264.jpg'

    },
  ];

  useEffect(() => {
      ref.current.continuousStart()
      ref.current.complete()

  }, []);




  function handleonchange(item){
      let dish = item
      console.log("dish",dish)
      if(dish ==='SouthIndian/Dosa')
      usenavigate(`/${dish}`);


  }

  return (
    <div>

            <div className=''>
            <LoadingBar color="#f11946" ref={ref} shadow={true} />
                <div className='row '>
                    {foodItems.map((foodItem, index) => (
                        <div className='col-lg-3' key={index}>
                            <div className='card card_shadow mx-5 my-1'>
                            <div className='card-body'style={{height:'200px'}}>
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
