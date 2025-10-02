import type { AuctionType } from "../../types/AuctionType";
import { useAuth } from "../../context/AuthContext";
import { useAuctionContext } from "../../context/AuctionContext";
import { StatsCard } from "../StatsCard";
import StatsListCardForBids from "./StatsListCardforBid";
import { useNavigate } from "react-router-dom";

function MyBids() {
  let { user } = useAuth();
  let bids = user?.bids ? user.bids : []; // user bids

  let auctionIds = bids.map((a) => a.auctionId);
  let { auctionItems } = useAuctionContext();
  let navigate = useNavigate();

  // Filter auction items that the user has bid on
  let bidedAuctions = auctionItems.filter((auction) =>
    auctionIds.includes(auction.auctionId)
  );

  let statsData = [
    { title: "Total Bids", count: bids.length },
    {
      title: "Ongoing Bids",
      count: bids.filter((a) => a.status === "ongoing").length,
    },
    { title: "Won Bids", count: bids.filter((a) => a.status === "won").length },
    {
      title: "Discard Bids",
      count: bids.filter((a) => a.status === "discarded").length,
    },
  ];

  return bids.length > 0 ? (
    <div className="container mx-auto p-4">
      <h2 className="mb-4">My Bids</h2>

      {/* Stats Cards */}
      <div className="d-flex gap-3 mb-4 w-100">
        {statsData.map((Obj, index) => (
          <StatsCard
            key={index}
            title={Obj.title}
            count={Obj.count}
            isActive={true}
          />
        ))}
      </div>

      {/* Auction Cards */}
      <div className="row g-4">
        {bidedAuctions.map((auction: AuctionType) =>
          bids
            .filter((bid) => bid.auctionId === auction.auctionId)
            .map((bid) => (
              <div
                key={auction.auctionId}
                className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
              >
                <StatsListCardForBids
                  key={bid.bidId}
                  auctionItem={auction}
                  bid={bid}
                />
              </div>
            ))
        )}
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center flex-column text-center"
     style={{ minHeight: "60vh" }}>
  <div className="card shadow-sm p-4 border-0" style={{ maxWidth: "500px" }}>
    <div className="card-body">
      <i className="bi bi-gem text-orange fs-1 mb-3"></i>
      <h5 className="fw-bold mb-2">No Bids Placed Yet</h5>
      <p className="text-muted mb-3">
        You have not placed any bids yet. Explore auctions and place your bids.
      </p>
      <button className="btn btn-orange px-4 py-2 rounded-pill" onClick={()=>navigate("/auctions")}>
        Browse Auctions
      </button>
    </div>
  </div>
</div>

  );
}

export default MyBids;
