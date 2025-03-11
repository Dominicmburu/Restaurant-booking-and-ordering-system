import React, { useState, useEffect, useRef } from "react";

const TestimonialCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const carouselRef = useRef(null);
    const transitionRef = useRef(true);

    // Testimonial data
    const testimonials = [
        {
            id: 1,
            quote: "The service is amazing! Delivery is always on time and the food comes hot and fresh. I love using their app to track my order. Their customer service team is also very responsive.",
            name: "Patric Stone",
            position: "Freelancer",
            image: "https://i.pinimg.com/736x/b9/77/2f/b9772fcac522e92b7c0efbf8aed7484c.jpg"
        },
        {
            id: 2,
            quote: "The table booking system is so convenient! I was able to reserve a spot for my anniversary dinner with just a few clicks. The staff remembered our special occasion and made our evening memorable.",
            name: "Sarah Johnson",
            position: "Marketing Executive",
            image: "https://i.pinimg.com/736x/0e/bd/b9/0ebdb9f8cb628dc5224bd2f84a2ff9e2.jpg"
        },
        {
            id: 3,
            quote: "Their pizza is truly the best in town! Crispy crust, fresh toppings, and always delivered piping hot. I've tried many pizza places, but this one has become my family's favorite weekend treat.",
            name: "Michael Rodriguez",
            position: "Software Engineer",
            image: "https://i.pinimg.com/736x/cb/56/80/cb56807ba5e83a29ea50dad951a0be04.jpg"
        },
        {
            id: 4,
            quote: "As a busy professional, I appreciate how easy it is to order through their mobile app. The interface is intuitive, and I can quickly reorder my favorite meals with just a tap. Definitely a time-saver!",
            name: "Emma Williams",
            position: "Doctor",
            image: "https://i.pinimg.com/736x/c8/1c/c5/c81cc548ebf9b7ad5e2bb5c666e7dfcc.jpg"
        },
        {
            id: 5,
            quote: "The variety of cuisine options is impressive! From Italian to Asian, they've got it all. I've been exploring different restaurants through their platform, and each experience has been delightful.",
            name: "David Chen",
            position: "Food Blogger",
            image: "https://i.pinimg.com/736x/fa/3a/1b/fa3a1b1bb17f2ab5e8fccb632ec42244.jpg"
        }
    ];

    // Clone first slide at the end to create seamless loop
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
        // Reset index to 0 instantly when reaching the cloned slide (testimonials.length)
        if (activeIndex === testimonials.length) {
            transitionRef.current = false; // Disable transition for instant reset
            setTimeout(() => {
                setActiveIndex(0);
                transitionRef.current = true; // Enable transition back
            }, 50); // Small delay to prevent flicker
        }
    }, [activeIndex, testimonials.length]);

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    return (
        <section className="testimonials py-5 bg-light">
            <div className="container">
                <div className="text-center mb-5">
                    <p className="text-warning">Testimonials</p>
                    <h2 className="display-5 fw-bold">Why Our Clients Choose Us</h2>
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
