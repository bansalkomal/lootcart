import React, { useState } from "react";
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useNavigate } from "react-router";
import { Menu, MenuItem, Button } from 'react-bootstrap';
import ImageCarousel from "../dashboard/ImageCarousel";


const HomePage = () => {

      const [bannerVisible, setBannerVisible] = useState(true);
  const [position, setPosition] = useState({ left: 0 });
  const [direction, setDirection] = useState(1);

      const imageArray = [
    "https://media.istockphoto.com/id/1073935306/photo/girls-carrying-shopping-bags.jpg?s=612x612&w=0&k=20&c=JB-TrME32dc0VTnaXVxsbJIExZqR71m-iyVOnG-7puM=",
    "https://d2line.com/thatlook/wp-content/uploads/sites/4/2022/07/Shopping-online-d2line-800x600.png",
    "https://media.istockphoto.com/id/683667922/photo/two-women-in-a-fashion-store.jpg?s=612x612&w=0&k=20&c=5t3Dma5_Q8j-bBD-lqOrxX9JTzl7g6Y_2dsCgIXAWcw=",
    "https://media.centrepointstores.com/i/centrepoint/Onboarding-decktop-women_En_1440x1194_10Feb?fmt=auto&w=900",
    "https://t4.ftcdn.net/jpg/02/96/73/99/360_F_296739964_jucsH0gy5doxKP4ILpCwE8V2rVKFFNQo.jpg",
    "https://cdn.pixabay.com/photo/2016/11/22/21/57/apparel-1850804_640.jpg",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D",
    "https://s3.eu-west-2.amazonaws.com/wp-media.camdenmarket.com/wp-content/uploads/2022/10/20160913/tiffany_and_nana_camden_market.jpg",
  ];

  return (
    <div className="home-container">
      <main className="p-3 row g-4 " >
        <section className="col-md-9 position-relative"
        >
          {/* <img
            src="/placeholder.jpg"
            alt="New iPhone S5 Gold"
            className="w-100 rounded"
          /> */}
          <ImageCarousel images={imageArray}/>

        </section>

        <div className="col-lg-3">
          <div className="card text-center mb-3">
            <div className="card-body bg-danger text-white">
              <h5>Free Shipping</h5>
              <p>All Over In World Above $200</p>
            </div>
          </div>
          <div className="card text-center mb-3">
            <div className="card-body bg-danger text-white">
              <h5>Back Guarantee</h5>
              <p>100% Money Back Guarantee</p>
            </div>
          </div>
          <div className="card text-center mb-3">
            <div className="card-body bg-danger text-white">
              <h5>Fast Delivery</h5>
              <p>Fastest Delivery In Any Country</p>
            </div>
          </div>
          <div className="card text-center mb-3">
            <div className="card-body bg-danger text-white">
              <h5>Easy Returns</h5>
              <p>Return products with single click!</p>
            </div>
          </div>
        </div>

         {/* {bannerVisible && (
           <div
             className="position-absolute bg-white p-4 rounded shadow"
             style={{
               top: '50%',
               left: `${position.left}%`,
               transform: 'translateY(-50%)',
               transition: 'left 0.5s linear',
               width: '20%'
             }}
           >
             <Button variant="link" className="position-absolute top-0 end-0" onClick={() => setBannerVisible(false)}>
               <X size={24} />
             </Button>
             <h1 className="fs-3 fw-bold">NEW IPHONE S5 GOLD</h1>
             <p>Modern design, Bluetooth adapter, High quality.</p>
             <Button className="mt-3">Order Now</Button>
           </div>
         )} */}
       </main>
    </div>
  );
};

export default HomePage;
