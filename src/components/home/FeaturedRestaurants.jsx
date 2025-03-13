import { useNavigate } from "react-router-dom"; 

const FeaturedRestaurants = () => {
  const navigate = useNavigate();

  const restaurants = [
    {
      name: "Burger House",
      category: "Burgers",
      location: "Camden, London",
      deliveryFee: 2.5,
      image: "https://i.pinimg.com/236x/3d/d4/a9/3dd4a9302cb0dc3756e83d20cecc1bc6.jpg",
    },
    {
      name: "Sushiteria",
      category: "Asian Food",
      location: "Soho, London",
      deliveryFee: 3.0,
      image: "https://i.pinimg.com/736x/44/e6/ba/44e6bae24b7e4bb2f8a686bf0d69740f.jpg",
    },
    {
      name: "Happy Grill",
      category: "BBQ",
      location: "Shoreditch, London",
      deliveryFee: 2.8,
      image: "https://i.pinimg.com/736x/39/9e/7d/399e7d0df89cd4babb1971c7b5ac062b.jpg",
    },
  ];

  return (
    <section className="restaurant-recommendations py-5">
      <div className="container">
        <div className="text-center mb-5">
          <p className="text-warning">Featured Partners</p>
          <h2 className="display-5 fw-bold">Popular London Restaurants</h2>
        </div>

        <div className="row">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img src={restaurant.image} className="card-img-top" alt={restaurant.name} />
                <div className="card-header bg-warning text-white border-0">
                  <span>{restaurant.category}</span>
                </div>
                <div className="card-body">
                  <h4 className="fw-bold">{restaurant.name}</h4>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-geo-alt text-warning me-2"></i>
                    <span>{restaurant.location}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-currency-pound text-warning me-2"></i>
                    <span>£{restaurant.deliveryFee.toFixed(2)} delivery fee</span>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 text-end">
                  <button 
                    className="btn btn-sm btn-warning rounded-circle"
                    onClick={() => navigate(`/restaurant/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`)}
                  >
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
