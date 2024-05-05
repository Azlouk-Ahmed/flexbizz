import React from 'react'
import "./slider.css"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';


import { Navigation } from 'swiper/modules';
import Slide from './Slide';




function Slider({data}) {
  return (
    <>
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
            data.map((elem) => {
                return(
                    <SwiperSlide>     
                        <Slide key = {elem._id} data={elem}/>
                    </SwiperSlide>
                )
            })
        }
     
    </Swiper>
  </>
  )
}

export default Slider