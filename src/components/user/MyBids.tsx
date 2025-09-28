import type { AuctionType } from "../../types/AuctionType";
import { useAuth } from "../../context/AuthContext";
import { useAuctionContext } from "../../context/AuctionContext";
import { StatsCard } from "../StatsCard";
import StatsListCardForBids from "./StatsListCardforBid";

function MyBids() {
  let { user } = useAuth();
  let bids = user?.bids ? user.bids : []; // user bids

  let auctionIds = bids.map((a) => a.auctionId);
  let { auctionItems } = useAuctionContext();

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
    <div className="container mx-auto p-4 text-center">
      <p className="text-muted">You have not placed any bids yet.</p>
    </div>
  );
}

export default MyBids;
