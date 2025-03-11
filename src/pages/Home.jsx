import React from 'react';
import '../assets/styles/home/styles.css';
import PopularItemsSection from '../components/home/PopularItemsSection';
import TestimonialCarousel from '../components/home/Testimonials';

const Home = () => {
    return (
        <div className="food-delivery-app">
            <section className="hero text-white position-relative">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-md-6 py-5">
                            <h1 className="display-4 fw-bold mb-3">Raha Restaurant<br /><span className="text-warning fs-1">Table Booking & Online Ordering</span></h1>
                            <p className="desc lead mb-4">
                                Enjoy a seamless dining experience with our easy-to-use table booking and online ordering system.
                                Reserve your table in advance or place your order for quick pickup or delivery.
                            </p>
                            <button className="btn btn-warning btn-lg px-4 fw-bold">Learn More</button>
                        </div>

                        <div className="col-md-6">
                            <img src="/images/French_Fries.png" alt="French_Fries" className="img-fluid hero-img" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="food-categories py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-3 mb-4">
                            <div className="category-card rounded p-4 h-100 d-flex align-items-center">
                                <div className="category-icon bg-warning rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "80px", height: "80px" }}>
                                    <i className="bi bi-cup-hot fs-1"></i>
                                </div>
                                <h5 className="ms-3">Table Booking</h5>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 mb-4">
                            <div className="category-card rounded p-4 h-100 d-flex align-items-center">
                                <div className="category-icon bg-warning rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "80px", height: "80px" }}>
                                    <i className="bi bi-basket fs-1"></i>
                                </div>
                                <h5 className="ms-3">Online Orders</h5>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 mb-4">
                            <div className="category-card rounded p-4 h-100 d-flex align-items-center">
                                <div className="category-icon bg-warning rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "80px", height: "80px" }}>
                                    <i className="bi bi-truck fs-1"></i>
                                </div>
                                <h5 className="ms-3">Fast Delivery</h5>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 mb-4">
                            <div className="category-card rounded p-4 h-100 d-flex align-items-center">
                                <div className="category-icon bg-warning rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: "80px", height: "80px" }}>
                                    <i className="bi bi-star fs-1"></i>
                                </div>
                                <h5 className="ms-3">Top-Rated Dishes</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PopularItemsSection />

            < section className="at-home couple" >
                <div className="container" id='at-home-container'>
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <img src="https://i.pinimg.com/736x/f9/65/0e/f9650eea3e945cf305eda995f703541c.jpg" className="img-fluid couple-img" alt="Couple ordering food" />
                        </div>
                        <div className="col-md-6 couple-desc">
                            <h2 className="display-5 enjoy fw-bold">Enjoy Your Favorite Meals</h2>
                            <h3 className="display-6 text-warning mb-4">We Bring the Restaurant to You</h3>
                            <p className="res-s mb-4">Whether you're craving a gourmet meal, a quick snack, or a refreshing drink, we’ve got you covered.
                                Order online and let us deliver delicious food straight to your doorstep or have a table reserved just for you.</p>

                            <div className="row mt-5 find">
                                <div className="col-6 mb-4">
                                    <div className="d-flex align-items-center">
                                        <div className="feature-icon bg-warning rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px" }}>
                                            <i className="bi bi-clock-history text-dark fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">Quick & Easy</h5>
                                            <p className="mb-0">Order in Seconds</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 mb-4">
                                    <div className="d-flex align-items-center">
                                        <div className="feature-icon bg-warning rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px" }}>
                                            <i className="bi bi-phone text-dark fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">Seamless</h5>
                                            <p className="mb-0">Online Booking</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 mb-4">
                                    <div className="d-flex align-items-center">
                                        <div className="feature-icon bg-warning rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px" }}>
                                            <i className="bi bi-geo-alt text-dark fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">Widespread</h5>
                                            <p className="mb-0">Delivery Locations</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 mb-4">
                                    <div className="d-flex align-items-center">
                                        <div className="feature-icon bg-warning rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px" }}>
                                            <i className="bi bi-people text-dark fs-4"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-0">Dine-In</h5>
                                            <p className="mb-0">Table Reservations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="btn btn-warning btn-lg px-4 mt-3">Explore Menu</button>
                        </div>
                    </div>
                </div>
            </section >

            < section className="best-pizza py-5 bg-warning" >
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 order-md-1 text-center text-md-start">
                            <h2 className="display-5 fw-bold">Always<br />the Hottest<br />Pizza</h2>
                            <p className="lead mb-4">Our pizzas are made with the freshest ingredients and delivered straight to your door. Experience authentic Italian flavors!</p>
                            <button className="btn btn-dark px-4 btn-lg">Get Pizza</button>
                        </div>
                        <div className="col-md-6 order-md-2 text-center">
                            <img src="/images/pizza_Italian_cheese_pepperoni_slice_food_png__traditional_Italian_cuisine__homemade_favorite-removebg-preview.png" className="img-fluid" alt="Pizza Box" style={{ width: "100%", maxWidth: "60%", height: "auto" }} />
                        </div>
                    </div>
                </div>
            </section >

            {/* Restaurant Recommendations */}
            < section className="restaurant-recommendations py-5" >
                <div className="container">
                    <div className="text-center mb-5">
                        <p className="text-warning">Our Recommendations</p>
                        <h2 className="display-5 fw-bold">Cafes & Restaurants</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <img src="https://i.pinimg.com/236x/3d/d4/a9/3dd4a9302cb0dc3756e83d20cecc1bc6.jpg" className="card-img-top" alt="Burger House" />
                                <div className="card-header bg-warning text-white border-0">
                                    <span>Burger</span>
                                </div>
                                <div className="card-body">
                                    <h4 className="fw-bold">Burger House</h4>
                                    <div className="d-flex align-items-center mb-2">
                                        <i className="bi bi-calendar-week text-warning me-2"></i>
                                        <span>Monday - Saturday</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-clock text-warning me-2"></i>
                                        <span>09:00 - 18:00</span>
                                    </div>
                                </div>
                                <div className="card-footer bg-white border-0 text-end">
                                    <button className="btn btn-sm btn-warning rounded-circle">
                                        <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <img src="https://i.pinimg.com/736x/44/e6/ba/44e6bae24b7e4bb2f8a686bf0d69740f.jpg" className="card-img-top" alt="Sushiteria" />
                                <div className="card-header bg-warning text-white border-0">
                                    <span>Asian food</span>
                                </div>
                                <div className="card-body">
                                    <h4 className="fw-bold">Sushiteria</h4>
                                    <div className="d-flex align-items-center mb-2">
                                        <i className="bi bi-calendar-week text-warning me-2"></i>
                                        <span>Monday - Saturday</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-clock text-warning me-2"></i>
                                        <span>09:00 - 18:00</span>
                                    </div>
                                </div>
                                <div className="card-footer bg-white border-0 text-end">
                                    <button className="btn btn-sm btn-warning rounded-circle">
                                        <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <img src="https://i.pinimg.com/736x/39/9e/7d/399e7d0df89cd4babb1971c7b5ac062b.jpg" className="card-img-top" alt="Happy Grill Cafe" />
                                <div className="card-header bg-warning text-white border-0">
                                    <span>BBQ</span>
                                </div>
                                <div className="card-body">
                                    <h4 className="fw-bold">Happy Grill Cafe</h4>
                                    <div className="d-flex align-items-center mb-2">
                                        <i className="bi bi-calendar-week text-warning me-2"></i>
                                        <span>Monday - Saturday</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-clock text-warning me-2"></i>
                                        <span>09:00 - 18:00</span>
                                    </div>
                                </div>
                                <div className="card-footer bg-white border-0 text-end">
                                    <button className="btn btn-sm btn-warning rounded-circle">
                                        <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <TestimonialCarousel />

            {/* Newsletter */}
            <section className="newsletter py-4 bg-warning">
                <div className="container">
                    <div className="row align-items-center text-center text-lg-start">

                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
                                <i className="bi bi-envelope-open fs-1 me-3"></i>
                                <div>
                                    <p className="mb-0">Get the latest news and offers</p>
                                    <h3 className="fw-bold mb-0">Subscribe to our newsletter</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="input-group">
                                <input type="email" className="form-control form-control-lg sub-btn" placeholder="Your email..." />
                                <button className="btn btn-dark btn-lg">Subscribe</button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div >
    );
};

export default Home;