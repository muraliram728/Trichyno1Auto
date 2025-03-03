import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

const images = [
  {
    url: "https://images3.alphacoders.com/885/885171.jpg",
  },
  {
    url: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Wallpapers-pexels-photo.jpg",
  },
  {
    url: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Amazing-Background-Images-Nature.jpg",
  },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalTime = 3000; // 3 seconds

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, slideIntervalTime);

    return () => clearInterval(slideInterval); // Cleanup on unmount
  }, [currentIndex]); // Restart interval on index change

  return (
    <div>
      <div className="slideshow-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`mySlides fade ${
              index === currentIndex ? "active" : ""
            }`}
            style={{ display: index === currentIndex ? "block" : "none" }}
          >
            <img
              src={image.url}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%" }}
            />
          </div>
        ))}

        <button className="prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      <br />

      <div style={{ textAlign: "center" }}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
