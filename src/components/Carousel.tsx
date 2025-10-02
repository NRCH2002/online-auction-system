import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/carousel.css";
import { useAuctionContext } from "../context/AuctionContext";
import type { AuctionType } from "../types/AuctionType";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AuctionCarousel() {
  let { auctionItems } = useAuctionContext();
  let { user } = useAuth();
  let navigate = useNavigate();
  let [activeAuctions, setActiveAuctions] = useState<AuctionType[]>([]);
  useEffect(() => {
    let auctions = auctionItems
      .filter((auction: AuctionType) => auction.status === "active")
      .slice(0, 4);
    setActiveAuctions(auctions);
  }, [auctionItems]);

  function handleButton(auction: AuctionType) {
    if (user) {
      navigate("/user/viewauction", { state: auction });
    } else {
      navigate("/viewauction", { state: auction });
    }
  }


  return (
    <div
      id="carouselExample"
      className="carousel slide" 
      data-bs-ride="carousel"
      data-bs-interval="2000"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {activeAuctions.map((_: AuctionType, index: number) => (
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
        {activeAuctions.map((item, index) => (
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
                <p className="text-white fw-bold fs-medium">{item.description}</p>
                <span className="badge bg-warning position-absolute">{item.category}</span>

              </div>
              <div className="d-flex flex-column text-end">
                <span className="text-orange fw-bold">Current Highest Bid</span>
                <p className="text-white fw-bolder fs-large">
                  ${item.currentBid}
                </p>
                <button
                  className="btn btn-orange"
                  onClick={() => handleButton(item)}
                >
                  Bid Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
