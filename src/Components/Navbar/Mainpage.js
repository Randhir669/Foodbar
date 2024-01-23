import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default function Mainpage() {

    const usenavigate = useNavigate();
    const ref = useRef(null)


    const foodCategory = [
        {
            id: 1,
            desc: 'North Indian Cuisine',
            handleonchange: 'NorthIndian',
            imageUrl:
                'https://t4.ftcdn.net/jpg/02/75/39/23/360_F_275392381_9upAWW5Rdsa4UE0CV6gRu2CwUETjzbKy.jpg'
        },
        {
            id: 2,
            desc: 'South Indian cuisine',
            handleonchange: 'SouthIndian',
            imageUrl:
                ' https://sukhis.com/app/uploads/2022/04/image3-4.jpg'
        },
        {
            id: 3,
            desc: 'Chinese cuisine',
            handleonchange: 'Chineese',
            imageUrl:
                'https://www.lacademie.com/wp-content/uploads/2022/01/popular-chinese-foods.jpg',

        },
        {
            id: 4,
            desc: 'Fast Food Cuisine',
            handleonchange: 'FastFood',
            imageUrl:
                'https://media.istockphoto.com/id/1305828323/photo/healthy-plant-based-fast-food-table-scene-top-down-view-on-a-wood-background.webp?b=1&s=170667a&w=0&k=20&c=OVQ9REtoV28D90NQLMvdSnwwzdkW_rJWatsiH64uRBc=',

        },




    ]

    useEffect(() => {
        ref.current.continuousStart()
        ref.current.complete()

    }, []);

    function handlechangetomenu(item) {
        let dish = item
        console.log("dish", dish)
        usenavigate(`/${dish}`);
    }



    return (

        <div className='my-3 row '>
            <LoadingBar color="#f11946" ref={ref} shadow={true} />
            {foodCategory.map((fooditems, index) => (
                <div className='col-lg-3'>
                    <div className='card mx-5 my-1 card_shadow'>
                        <div className='card-body' style={{height:'200px'}}>
                            <img src={fooditems.imageUrl} onClick={() => handlechangetomenu(fooditems.handleonchange)} alt="" style={{ height: '100%', width: '100%' }} className="b_radius cursor d-inline-block zoom-image" />
                        </div>
                        <div className='card-footer'>
                            <h6>{fooditems.desc}</h6>
                        </div>
                    </div>
                </div>


            ))}


        </div>
      





    )
}
