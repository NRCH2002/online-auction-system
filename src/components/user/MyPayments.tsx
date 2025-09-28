import type { AuctionType } from "../../types/AuctionType";
import { useAuth } from "../../context/AuthContext";
import { useAuctionContext } from "../../context/AuctionContext";
import { StatsCard } from "../StatsCard";
import StatsCardListForPayments from "./StatsCardListForPayments";

function MyPayments() {
  let { user } = useAuth();
  let bids = user?.bids ? user.bids : []; // user bids

  let auctionIds = bids.filter((bid) => bid.status==="won").map((bid)=>bid.auctionId);
  let { auctionItems } = useAuctionContext();

  // Filter auction items that the user has bid on
  let bidedAuctions = auctionItems.filter((auction) =>
    auctionIds.includes(auction.auctionId)
  );

  let statsData = [
    { title: "Total Payments", count: bidedAuctions.length },
    {
      title: "Pending Payments",
      count: bids.filter((a) => a.status === "won").length,
    },
    { title: "Completed Payments", count: bids.filter((a) => a.status === "completed").length },
    {
      title: "Received Payments",
      count: bids.filter((a) => a.status === "failed").length,
    },
  ];

  return bidedAuctions.length > 0 ? (
    <div className="container mx-auto p-4">
      <h2 className="mb-4">My Payments</h2>

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
          bids.filter((bid)=>bid.auctionId===auction.auctionId).map((bid)=>(
             <div
                key={auction.auctionId}
                className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
              >
                <StatsCardListForPayments
                  key={auction.auctionId}
                  auctionItem={auction}
                  bid={bid}
                 
                />
              </div>
          ))
             
          
        )}
      </div>
    </div>
  ) : (
    <div className="container mx-auto p-4 text-center">
      <p className="text-muted">You have not Won any Auctions yet.</p>
    </div>
  );
}

export default MyPayments;
