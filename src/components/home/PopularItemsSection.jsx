import React, { useState } from 'react';
import '../../assets/styles/home/popularitem.css';

const foodData = {
  fastfood: [
    {
      id: 1,
      name: "Cheeseburger with Salad",
      image: "https://i.pinimg.com/736x/66/a9/33/66a933deff47b88fb89508b0558e57f6.jpg",
      description: "Juicy beef patty, fresh lettuce, tomato, and cheese—London’s go-to comfort food.",
      price: 19.00,
      rating: 5
    },
    {
      id: 2,
      name: "Royal Cheeseburger with Bacon",
      image: "https://i.pinimg.com/736x/1b/4e/b2/1b4eb2756b6fba998e246c7d604c54a8.jpg",
      description: "Sizzling bacon, premium beef, and melted cheese served in a soft brioche bun.",
      price: 13.49,
      rating: 4
    },
    {
      id: 3,
      name: "Black Gamburgrer with Fishcake",
      image: "https://i.pinimg.com/736x/71/79/1c/71791c304d3657c6b32a11bd13198cf1.jpg",
      description: "A gourmet charcoal bun with crispy fishcake, creamy sauce, and fresh greens.",
      price: 24.99,
      rating: 5
    },
    {
      id: 4,
      name: "Classic Bacon Hamburger",
      image: "https://i.pinimg.com/736x/68/53/58/6853583c00a7f5e712061d09de638295.jpg",
      description: "Double-smoked bacon, crispy onions, and cheddar on a toasted brioche bun.",
      price: 11.99,
      rating: 3
    }
  ],
  hotpizza: [
    {
      id: 5,
      name: "Margherita Pizza",
      image: "https://i.pinimg.com/736x/eb/fb/97/ebfb972b3ad4de680c321f64c5121121.jpg",
      description: "Authentic Neapolitan-style pizza with fresh basil, mozzarella, and rich tomato sauce.",
      price: 14.99,
      rating: 5
    },
    {
      id: 6,
      name: "Pepperoni Pizza",
      image: "https://i.pinimg.com/736x/35/83/09/358309081a759381f2dd056d9166a53e.jpg",
      description: "Pizza topped with pepperoni slices and cheese.",
      price: 16.99,
      rating: 4
    },
    {
      id: 7,
      name: "Veggie Supreme Pizza",
      image: "https://i.pinimg.com/736x/db/85/51/db85512b9639124f168454dd4de03605.jpg",
      description: "Pizza loaded with fresh vegetables and cheese.",
      price: 15.99,
      rating: 4
    },
    {
      id: 8,
      name: "BBQ Chicken Pizza",
      image: "https://i.pinimg.com/736x/6d/b3/b2/6db3b23857bc76d782fc292b7df8a6ae.jpg",
      description: "Pizza with BBQ chicken, onions and cheese.",
      price: 17.99,
      rating: 5
    }
  ],
  asianfood: [
    {
      id: 9,
      name: "Pad Thai",
      image: "https://i.pinimg.com/736x/98/c9/5d/98c95df876af9448fe3da03c0a9507cc.jpg",
      description: "Thai stir-fried noodles with eggs, tofu, and bean sprouts.",
      price: 13.99,
      rating: 5
    },
    {
      id: 10,
      name: "Sushi Platter",
      image: "https://i.pinimg.com/736x/fc/b5/96/fcb596a832f5460dc3c8ade4d657d8a2.jpg",
      description: "Assorted sushi rolls with soy sauce and wasabi.",
      price: 22.99,
      rating: 5
    },
    {
      id: 11,
      name: "Chicken Curry",
      image: "https://i.pinimg.com/736x/40/ad/a5/40ada5bc5ab7421296e865d8af1bfac7.jpg",
      description: "Spicy chicken curry with vegetables.",
      price: 15.99,
      rating: 4
    },
    {
      id: 12,
      name: "Beef Teriyaki",
      image: "https://i.pinimg.com/736x/3e/ca/b7/3ecab72bef25f6166b9c2f68c3f7a98a.jpg",
      description: "Grilled beef with teriyaki sauce and rice.",
      price: 18.99,
      rating: 5
    }
  ],
  rawmeat: [
    {
      id: 13,
      name: "Premium Beef Steak",
      image: "https://i.pinimg.com/736x/8a/3d/30/8a3d305a96ca3b3d7aae9332fdf4c113.jpg",
      description: "Raw premium quality beef steak ready to cook.",
      price: 29.99,
      rating: 5
    },
    {
      id: 14,
      name: "Lamb Chops",
      image: "https://i.pinimg.com/736x/d0/65/7f/d0657f995a38ada8c7b6e4a293ad4d68.jpg",
      description: "Fresh lamb chops with herbs and spices.",
      price: 27.99,
      rating: 4
    },
    {
      id: 15,
      name: "Chicken Breasts",
      image: "https://i.pinimg.com/736x/75/61/85/756185733748af1a10ffdd61d9b18e7a.jpg",
      description: "Boneless chicken breasts, perfect for grilling.",
      price: 12.99,
      rating: 5
    },
    {
      id: 16,
      name: "Pork Ribs",
      image: "https://i.pinimg.com/736x/81/a2/9b/81a29bbfb8adba7f51d110b273e89e4c.jpg",
      description: "Raw pork ribs, ideal for barbecue.",
      price: 19.99,
      rating: 4
    }
  ]
};

const PopularItemsSection = () => {
  const [activeCategory, setActiveCategory] = useState('fastfood');

  const renderStars = (rating) => {
    if (rating === 0) return null;

    return (
      <div className="d-flex justify-content-center mb-2">
        {[...Array(rating)].map((_, index) => (
          <i key={index} className="bi bi-star-fill text-warning"></i>
        ))}
      </div>
    );
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <section className="popular-items py-5 bg-light">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <p className="text-warning">Quick pick</p>
            <h2 className="display-5 fw-bold">London’s Favorites</h2>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12 d-flex justify-content-center">
            <ul className="nav nav-pills flex-column flex-md-row w-100">

              <li className="nav-item mx-1 flex-fill">
                <button
                  className={`nav-link text-center w-100 ${activeCategory === 'fastfood' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('fastfood')}
                >
                  FastFood
                </button>
              </li>

              <li className="nav-item mx-1 flex-fill">
                <button
                  className={`nav-link text-center w-100 ${activeCategory === 'hotpizza' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('hotpizza')}
                >
                  Hot Pizza
                </button>
              </li>

              <li className="nav-item mx-1 flex-fill">
                <button
                  className={`nav-link text-center w-100 ${activeCategory === 'asianfood' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('asianfood')}
                >
                  Asian Food
                </button>
              </li>

              <li className="nav-item mx-1 flex-fill">
                <button
                  className={`nav-link text-center w-100 ${activeCategory === 'rawmeat' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('rawmeat')}
                >
                  Raw Meat
                </button>
              </li>

            </ul>
          </div>
        </div>

        <div className="row">
          {foodData[activeCategory].map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="card h-100 border-0 shadow-sm">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  {renderStars(item.rating)}
                  <h5 className="card-title text-center">{item.name}</h5>
                  <p className="card-text text-center text-muted">{item.description}</p>
                  <p className="text-center fw-bold fs-4">${item.price.toFixed(2)}</p>
                  <div className="d-grid">
                    <button className="btn btn-warning rounded-pill">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularItemsSection;