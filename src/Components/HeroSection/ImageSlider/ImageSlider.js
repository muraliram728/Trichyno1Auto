import React, { useState } from 'react';
import './ImageSlider.css';

const images = [
    {
        url: "https://thewowstyle.com/wp-content/uploads/2015/01/nature-images-6.jpg",
    },
    {
        url: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Wallpapers-pexels-photo.jpg",
    },
    {
        url: "https://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Amazing-Background-Images-Nature.jpg",
    }
];

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div>
            <div className="slideshow-container">
                {images.map((image, index) => (
                    <div key={index} className={`mySlides fade ${index === currentIndex ? "active" : ""}`} style={{ display: index === currentIndex ? "block" : "none" }}>
                        <img src={image.url} alt={`Slide ${index + 1}`} style={{ width: '100%' }} />
                    </div>
                ))}

                <button className="prev" onClick={prevSlide}>&#10094;</button>
                <button className="next" onClick={nextSlide}>&#10095;</button>
            </div>

            <br />

            <div  style={{ textAlign: 'center' }}>
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
