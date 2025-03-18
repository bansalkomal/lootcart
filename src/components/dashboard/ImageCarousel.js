import React, { useEffect, useState } from "react";
import "../../assets/styles/carousel.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 2000); // Auto-slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  return (
    <div className="carousel-container">
          <button className="carousel-btn left" onClick={prevSlide}>
            <ChevronLeft size={40} />
          </button>
    
          <div className="carousel-slide">
        {images.map((image, index) => (
          <div
            key={index}
            className={
              index === currentIndex ? "carousel-item active" : "carousel-item"
            }
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </div>

      <button className="carousel-btn right" onClick={nextSlide}>
        <ChevronRight size={40} />
      </button>
    </div>
  );
};

export default ImageCarousel;