import React, { useState, useEffect, useRef } from "react";

const TestimonialCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef(null);
    const transitionRef = useRef(true);

    const testimonials = [
        {
            id: 1,
            quote: "AlDiner is a game-changer! I can order from my favorite restaurants in London and have my food delivered hot and fresh every time. Their tracking feature is a lifesaver!",
            name: "Patric Stone",
            position: "Freelancer",
            image: "https://i.pinimg.com/736x/b9/77/2f/b9772fcac522e92b7c0efbf8aed7484c.jpg"
        },
        {
            id: 2,
            quote: "AlDiner makes ordering effortless. I can browse restaurants, see ratings, and order in minutes. My weekend takeout is sorted!",
            name: "Sarah Johnson",
            position: "Marketing Executive",
            image: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
        },
        {
            id: 3,
            quote: "The best selection of restaurants in London! From sushi to burgers, I always find exactly what I'm craving. Delivery is fast and reliable!",
            name: "Michael Rodriguez",
            position: "Software Engineer",
            image: "https://i.pinimg.com/736x/cb/56/80/cb56807ba5e83a29ea50dad951a0be04.jpg"
        },
        {
            id: 4,
            quote: "As someone always on the go, I love how quick and simple it is to order. The app is smooth, and my food arrives in no time!",
            name: "Emma Williams",
            position: "Doctor",
            image: "https://i.pinimg.com/736x/c8/1c/c5/c81cc548ebf9b7ad5e2bb5c666e7dfcc.jpg"
        },
        {
            id: 5,
            quote: "AlDiner has transformed my food experience! So many options, easy checkout, and excellent customer support!",
            name: "David Chen",
            position: "Food Blogger",
            image: "https://i.pinimg.com/736x/fa/3a/1b/fa3a1b1bb17f2ab5e8fccb632ec42244.jpg"
        }
    ];

    const extendedTestimonials = [...testimonials, testimonials[0]];

    useEffect(() => {
        let interval;
        if (!isPaused) {
            interval = setInterval(() => {
                setActiveIndex((prevIndex) => prevIndex + 1);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isPaused]);

    useEffect(() => {
        if (activeIndex === testimonials.length) {
            transitionRef.current = false; 
            setTimeout(() => {
                setActiveIndex(0);
                transitionRef.current = true; 
            }, 50); 
        }
    }, [activeIndex, testimonials.length]);

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    return (
        <section className="testimonials py-5 bg-light">
            <div className="container">
                <div className="text-center mb-5">
                    <p className="text-warning">Testimonials</p>
                    <h2 className="display-5 fw-bold">Why London Loves AlDiner</h2>
                </div>

                <div 
                    className="testimonial-carousel position-relative"
                    ref={carouselRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="testimonial-container overflow-hidden">
                        <div 
                            className="testimonial-inner d-flex transition-all"
                            style={{
                                transform: `translateX(-${activeIndex * 100}%)`,
                                transition: transitionRef.current ? "transform 0.5s ease-in-out" : "none"
                            }}
                        >
                            {extendedTestimonials.map((testimonial, index) => (
                                <div key={index} className="testimonial-item flex-shrink-0 w-100">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="text-center">
                                                <span className="display-3 text-warning">"</span>
                                                <p className="lead mb-5">{testimonial.quote}</p>
                                                <div className="d-flex flex-column align-items-center">
                                                    <div 
                                                        className="rounded-circle mb-3 overflow-hidden bg-secondary"
                                                        style={{ width: "80px", height: "80px" }}
                                                    >
                                                        <img 
                                                            src={testimonial.image}
                                                            alt={testimonial.name}
                                                            className="img-fluid w-100 h-100 object-fit-cover"
                                                        />
                                                    </div>
                                                    <h5 className="mb-0">{testimonial.name}</h5>
                                                    <p className="text-warning">{testimonial.position}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        className="carousel-control-prev position-absolute top-50 start-0 translate-middle-y bg-warning text-dark rounded-circle border-0"
                        style={{ width: "40px", height: "40px", left: "10px" }}
                        onClick={() => setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>

                    <button 
                        className="carousel-control-next position-absolute top-50 end-0 translate-middle-y bg-warning text-dark rounded-circle border-0"
                        style={{ width: "40px", height: "40px", right: "10px" }}
                        onClick={() => setActiveIndex((prevIndex) => prevIndex + 1)}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>

                    <div className="carousel-indicators position-relative d-flex justify-content-center gap-2 mt-4">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-indicator rounded-circle border-0 ${index === activeIndex ? "bg-warning" : "bg-secondary"}`}
                                style={{ width: "12px", height: "12px" }}
                                onClick={() => setActiveIndex(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialCarousel;
