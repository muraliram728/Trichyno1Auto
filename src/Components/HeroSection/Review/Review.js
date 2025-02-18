import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import './Review.css';

const reviewData = [
    { text: "This product is amazing! Totally recommend it dfghj fghjk tyjnbv gbjhdug  jwiyuyeb bhujahisqj .", author: "John Doe" },
    { text: "Best experience ever! Will buy again.", author: "Jane Smith" },
    { text: "Loved the quality and the support team was great.", author: "David Wilson" },
    { text: "Fast delivery and fantastic service.", author: "Emma Brown" }
];

const Review = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 2) % reviewData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 2 + reviewData.length) % reviewData.length);
    };

    return (
        <div className="review-slider-container">
            {/* Left Navigation Button */}
            <button className="review-prev-btn" onClick={prevSlide}>
                <FaChevronLeft />
            </button>

            <div className="review-slide-wrapper">
                <div className="review-slide">
                    <p className='review-txt'>{reviewData[currentIndex]?.text}</p>
                    <h4 className='review-author'>- {reviewData[currentIndex]?.author}</h4>
                </div>
                <div className="review-slide">
                    <p className='review-txt'>{reviewData[(currentIndex + 1) % reviewData.length]?.text}</p>
                    <h4 className='review-author'>- {reviewData[(currentIndex + 1) % reviewData.length]?.author}</h4>
                </div>
            </div>

            {/* Right Navigation Button */}
            <button className="review-next-btn" onClick={nextSlide}>
                <FaChevronRight />
            </button>

            {/* Dots for navigation */}
            <div className="review-dot-container">
                {reviewData.map((_, index) => (
                    <span
                        key={index}
                        className={`review-dot ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Review;
