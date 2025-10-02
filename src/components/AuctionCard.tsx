import "../styles/auctionCard.css";
import type { AuctionType } from "../types/AuctionType";
import { useNavigate } from "react-router-dom";
import { useCountDown } from "../services/useCountDown";
import { updateAuctionStatus } from "../services/updateAuctionStatus";
import { useEffect } from "react";
import { useAuctionContext } from "../context/AuctionContext";
import type { BidType } from "../types/BidType";
import { useAuth } from "../context/AuthContext";

type AuctionItemProps = {
  auctionItem: AuctionType;
};

const AuctionCard = ({ auctionItem }: AuctionItemProps) => {
  let navigate = useNavigate();
 const timeLeft = useCountDown(auctionItem.endTime)
 const {auctionItems,setAuctionItems} = useAuctionContext()
 const {user,setUser} = useAuth()
 console.log(timeLeft)


useEffect(() => {
  if (timeLeft === "Action completed") {
    updateAuctionStatus({...auctionItem, endTime:"Action completed" }).then((updatedAuction) => {
      if (updatedAuction) {
        const updatedAuctions = auctionItems.map((auction:AuctionType) =>
          auction.auctionId === updatedAuction.auctionId ? updatedAuction : auction
        );
        setAuctionItems(updatedAuctions);
      }
    }); 

    //update user status if needed
    if(auctionItem.status==="sold"){

      const winningBid = user?.bids.find((bid:BidType) => bid.auctionId === auctionItem.auctionId && bid.status === "ongoing");
      if(winningBid && user){
        const updatedBids = user.bids.map((bid:BidType) => 
          bid.auctionId === auctionItem.auctionId ? { ...bid, status: "won" } : bid
        );
        setUser({ ...user, bids: updatedBids });
      }

    

    }

  
  }
}, [timeLeft]);

 
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
            <div className="d-flex gap-2 text-orange fs-small">
              <i className="bi bi-people-fill text-warning"></i>
              <p className="text-black fw-bold">{auctionItem.bidCount} bids</p>
            </div>
            <div className="d-flex gap-2 text-orange fs-small">
              <i className="bi bi-clock text-orange "></i>
              <p className="fw-bold">{timeLeft}</p>
              
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
