import React from "react";
import { TbStar } from "react-icons/tb";
import { TbStarFilled } from "react-icons/tb";
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./slider.css"
import { Link } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";

function Slide({data}) {
    const {data : user} = useFetchData("http://localhost:5000/user/"+data.client);
    const stars = Array.from({ length: 5 }, (_, index) =>
        index < data.clientRating ? <TbStarFilled /> : <TbStar />
    );
  return (
    <div class="card swiper-slide">
                <div class="image-content">
                    <span class="overlay"></span>
                    <div class="card-image">
                        <img src={user?.img} alt="" class="card-img" />
                    </div>
                </div>
                <div class="card-content">
                    <h2 class="name">{user?.name} {user?.familyName}</h2>
                    <div className="df">
                        {
                            stars
                        }

                    </div>
                    <p class="description">{data?.clientComment}</p>
                    <button class="button"><Link to={"./profile/"+user?._id}>View client</Link></button>
                </div>
            </div>
  );
}

export default Slide;
