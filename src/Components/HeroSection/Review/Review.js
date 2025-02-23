// import React, { useState } from 'react';
// import { FaChevronLeft, FaChevronRight, FaStar, FaRegStar } from 'react-icons/fa'; // Import star icons
// import './Review.css';

// const reviewData = [
//     { text: "This product is amazing! Totally recommend it.This product is amazing! Totally recommend it.This  dsadf amazing! Totally recommend it.This product is amazing! Totally recommend it.", author: "John Doe", rating: 5 },
//     { text: "Best experience ever! Will buy again.", author: "Jane Smith", rating: 4 },
//     { text: "Loved the quality and the support team was great.", author: "David Wilson", rating: 5 },
//     { text: "Fast delivery and fantastic service.", author: "Emma Brown", rating: 3 }
// ];

// const Review = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 2) % reviewData.length);
//     };

//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex - 2 + reviewData.length) % reviewData.length);
//     };

//     const renderStars = (rating) => {
//         return (
//             <>
//                 {[...Array(5)].map((_, i) => (
//                     i < rating ? <FaStar key={i} className="star filled" /> : <FaRegStar key={i} className="star" />
//                 ))}
//             </>
//         );
//     };

//     return (
//         <div className="review-slider-container">
//             {/* Left Navigation Button */}
//             <button className="review-prev-btn" onClick={prevSlide}>
//                 <FaChevronLeft />
//             </button>

//             <div className="review-slide-wrapper">
//                 <div className="review-slide">
//                 <div className="review-stars">{renderStars(reviewData[currentIndex]?.rating)}</div>
//                 <p className="review-txt">
//                         {reviewData[currentIndex]?.text?.length > 169
//                             ? `${reviewData[currentIndex]?.text.slice(0, 169)}...`
//                             : reviewData[currentIndex]?.text}
//                     </p>
//                     <h4 className='review-author'>- {reviewData[currentIndex]?.author}</h4>
//                 </div>

//             </div>

//             {/* Right Navigation Button */}
//             <button className="review-next-btn" onClick={nextSlide}>
//                 <FaChevronRight />
//             </button>

//             {/* Dots for navigation */}
//             <div className="review-dot-container">
//                 {reviewData.map((_, index) => (
//                     <span
//                         key={index}
//                         className={`review-dot ${index === currentIndex ? "active" : ""}`}
//                         onClick={() => setCurrentIndex(index)}
//                     ></span>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Review;




import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography, Card, CardContent, Rating } from "@mui/material";

const Reviews = [
    {
        name: "ReeganReena",
        role: "Customer",
        rating: 4,
        feedback:
            "It is an amazing app and very safe too to ride with as they have professional and great riders. It is also very feasible and we reach quicker. ",
    },
    {
        name: "AbineshMaha",
        role: "Customer",
        rating: 2,
        feedback:
            "It is an amazing app and very safe too to ride with as they have professional and great riders. It is also very feasible and we reach quicker. ",
    },
    // Add more Review as needed
];

const Review = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
        },
    };

    return (
        <Box sx={{ maxWidth: "80%", margin: "0 auto", position: "relative", marginTop: "50px" }}>
            <Carousel
                responsive={responsive}
                showDots
                infinite
                // autoPlay
                // autoPlaySpeed={3000}
                arrows={false}
            >
                {Reviews.map((testimonial, index) => (
                    <Card key={index} sx={{ border: "1px solid #FFD700", borderRadius: 2, margin: 2, position: "relative" }}>
                        <Box
                            sx={{
                                position: "relative",
                                textAlign: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "0px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    height: "2px",
                                    backgroundColor: "#FFD700",
                                }}
                            />
                            <Rating
                                value={testimonial.rating}
                                readOnly
                                precision={0.5}
                                icon={<span>★</span>}
                                emptyIcon={<span>★</span>}
                                sx={{ color: "#FFD700", position: "relative", zIndex: 101 }} // Ensures the rating stars stay on top
                            />
                        </Box>
                        <CardContent>
                            <Typography variant="body1">
                                {testimonial.feedback}
                            </Typography>
                            <Typography variant="h6" sx={{ marginTop: 2, fontWeight: "bold" }}>
                                {testimonial.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {testimonial.role}
                            </Typography>
                        </CardContent>
                    </Card>

                ))}

            </Carousel>
        </Box>
    );
};

export default Review;
