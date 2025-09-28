import "../styles/auctionCard.css";
import type { AuctionType } from "../types/AuctionType";
import { useNavigate } from "react-router-dom";
import { auctionCountdown } from "../services/auctionCountdown";

type AuctionItemProps = {
  auctionItem: AuctionType;
};

const AuctionCard = ({ auctionItem }: AuctionItemProps) => {
  let navigate = useNavigate();
 const timeLeft = auctionCountdown(auctionItem.duration, auctionItem.createdAt);
 
  return (
    <div className="product-card">
      <div className="card shadow">
        <img
          src={auctionItem.imageUrl}
          alt={auctionItem.title}
          className="card-img-top product-image"
        />

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title fw-medium me-2 mb-0">{auctionItem.title}</h5>
            <span className="badge orange-badge">{auctionItem.category}</span>
          </div>

          <p className="card-text text-muted small-text mb-4">{auctionItem.description}</p>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="text-muted price-text">Starting Price:</span>
              <span className="price-value">{"$" + auctionItem.startingPrice}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted price-text">Current Bid:</span>
              <span className="price-value text-orange">{"$" + auctionItem.currentBid}</span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center text-muted info-text">
              <svg className="bid-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {auctionItem.bidCount} bids
            </div>
            <div className="d-flex align-items-center text-orange info-text">
              <svg className="time-icon" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {timeLeft}
            </div>
          </div>

          <button
            className="btn btn-orange w-100 py-2"
            onClick={()=>{ navigate("/viewauction", { state: auctionItem });}}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
