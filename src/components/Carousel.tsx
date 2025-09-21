import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/carousel.css"
// import { useAuctionContext } from "../context/AuctionContext";

export default function AuctionCarousel() {

    // let {auctionItems}= useAuctionContext()
 const auctionItems = [
    {
      id: 1,
      title: "Vintage Rolex Submariner",
      description: "Classic 1960s model in excellent condition.",
      imageUrl: "https://images.unsplash.com/photo-1546719900-f350ef5d469d",
      startingPrice: "$8,000.00",
      currentBid: "$12,500.00",
      bidCount: 15,
      timeRemaining: "2 days 5h",
    },
    {
      id: 2,
      title: "Ming Dynasty Vase",
      description: "Authentic 15th-century blue & white ceramic.",
      imageUrl: "https://images.unsplash.com/photo-1695901741829-7a9cc23d32ac",
      startingPrice: "$15,000.00",
      currentBid: "$28,000.00",
      bidCount: 23,
      timeRemaining: "1 day 12h",
    },
    {
      id: 3,
      title: "Van Gogh Study",
      description: "Rare authenticated oil-on-canvas study.",
      imageUrl: "https://images.unsplash.com/photo-1664181018522-bbf0da932186",
      startingPrice: "$50,000.00",
      currentBid: "$75,000.00",
      bidCount: 8,
      timeRemaining: "3 days 8h",
    },
    {
      id: 4,
      title: "Diamond Engagement Ring",
      description: "2-carat diamond ring in platinum setting.",
      imageUrl: "https://images.unsplash.com/photo-1677045419454-e8b201856472",
      startingPrice: "$5,000.00",
      currentBid: "$7,200.00",
      bidCount: 12,
      timeRemaining: "18h",
    }
  ];

  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4000"
    >
      {/* Indicators */}
      <div className="carousel-indicators text-orange">
        {auctionItems.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        {auctionItems.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={item.imageUrl}
              className="d-block mx-auto carousel-image"
              alt={item.title}
            />
            <div className="carousel-caption text-start d-flex justify-content-between">
                <div>
                <h3 className="fw-bold">{item.title}</h3>
                <p className="text-grey fs-medium">{item.description}</p>
                </div>
                <div className="d-flex flex-column text-end">
                    <span className="text-grey fs-medium">Current Highest Bid</span>
                    <p className="text-orange fw-bolder fs-large">{item.currentBid}</p>
                    <button className="btn btn-orange">Bid Now</button>
                </div>
              
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
