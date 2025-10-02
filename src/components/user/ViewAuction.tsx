import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateId } from "../../services/generateId";
import { useAuth } from "../../context/AuthContext";
import { useAuctionContext } from "../../context/AuctionContext";
import { patchAuction } from "../../services/patchAuction";
import { patchBid } from "../../services/patchbid";
import { useCountDown } from "../../services/useCountDown";


function ViewAuction() {
  let { state } = useLocation();
  let navigate = useNavigate();
  let { user, setUser } = useAuth();
  let { auctionItems, setAuctionItems } = useAuctionContext();
     const timeLeft = useCountDown(state.endTime)

  let id = generateId("bid");
  let currentBid = Number(state.currentBid) > 0 ? Number(state.currentBid) : Number(state.startingPrice)

  let [bidder, setBidder] = useState({
    bidId: id,
    auctionId: state.auctionId,
    bidAmount:0, 
    time: new Date().toLocaleTimeString(),
    status: "ongoing",
  });

  let [bidError,setBidError] = useState("")

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBidder({ ...bidder, [name]: value });
    setBidError("")
  };

  const handleBidError=function()
  {
    if(user?.userId===state.userId){
      return "You cannot bid on your own auction"
    }
    if(user?.bids.some((bid)=>bid.auctionId===state.auctionId&&bid.status==="ongoing")){
      return "You have already placed a bid on this auction"
    }
    if(!bidder.bidAmount){
       return "Enter Your Bid"
    }
    else if(bidder.bidAmount&&bidder.bidAmount<=currentBid){
      return `Your Bid Should Be Greater Than ${currentBid}`
    }
    return ""
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let error = handleBidError()
    if(error){
      setBidError(error)
      return
    }
    

    if (!user) {
      navigate("/login")
      return;
    }

    

    const userUpdated = await patchBid(user, bidder); 
    const auctionUpdated = await patchAuction({
      ...state,
      currentBid: bidder.bidAmount,
      bidCount: state.bidCount + 1,
    });
    if (userUpdated && auctionUpdated) {
      setUser({ ...user, bids: [...user.bids, bidder] });

      let updatedAuctions = auctionItems.map((auction) => {
        if (auction.auctionId === state.auctionId) {
          return {
            ...auction,
            currentBid: bidder.bidAmount,
            bidCount: auction.bidCount + 1,
          };
        }
        return auction;
      });
      setAuctionItems(updatedAuctions);
      navigate("/user/mybids");
    } else {
      alert("Failed to place bid");
    }
  };

  return (
    <div className="row">
      <div className="col-12 col-md-10 mx-auto row shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="fw-bold mb-4">{state.title}</h3>
          <button
            className="btn btn-danger m-3"
            onClick={() => {
              navigate(-1);
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="col-12 col-md-4 col-lg-6">
          <img
            src={state.imageUrl}
            alt="Auction Item"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <p className="text-muted">{state.description}</p>
          <p>
            <strong>Category:</strong>
            {state.category}
          </p>
          <p>
            <strong>Product Quality:</strong>
            {state.productQuality}
          </p>
          <p>
            <strong>Starting Price:</strong>
            {state.startingPrice}
          </p>
          <p>
            <strong>Current Bid:</strong>
            {state.currentBid}
          </p>
          <p>
            <strong>Bid Count:</strong> {state.bidCount}
          </p>
          <p>
            <strong>Time Left:</strong> {timeLeft}h
          </p>

          <form className="mb-3 form-floating" onSubmit={handleSubmit}>
            <input
              type="number"
              className="form-control w-50"
              id="bidAmount"
              placeholder={`Enter your bid more ${currentBid}`}
              
              onChange={handleInputChange}
              name="bidAmount"
              
            />
            <label htmlFor="bidAmount" className="form-label">
              {`Enter your bid more than ${currentBid}`}
            </label>
            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-orange" type="submit">
                Place Bid
              </button>
            </div>
          </form>
          {bidError&&<p className="text-danger fw-bold">{bidError}</p>}
        </div>
      </div>
    </div>
  );
}

export default ViewAuction;
