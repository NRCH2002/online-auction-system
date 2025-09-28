import type { AuctionType } from "../../types/AuctionType";
import { useAuth } from "../../context/AuthContext";
import { useAuctionContext } from "../../context/AuctionContext";
import { StatsCard } from "../StatsCard";
import StatsCardList from "./StatsCardList";

function MyAuctions() {
  let { user } = useAuth();
  let { auctionItems } = useAuctionContext();
  let userAuctions = auctionItems.filter((a) => a.userId === user?.userId);

  let statsData = [
    {
      title: "Total Auctions",
      count: userAuctions.length,
    },
    {
      title: "Active Auctions",
      count: userAuctions.filter((a) => a.status === "active").length,
    },
    {
      title: "UnSold Auctions",
      count: userAuctions.filter((a) => a.status === "unsold").length,
    },
    {
      title: "Sold Auctions",
      count: userAuctions.filter((a) => a.status === "sold").length,
    },
  ];

  return userAuctions.length > 0 ? (
    // return(
    <div className="container mx-auto p-4">
      <h2 className="mb-4">My Auctions</h2>

      {/* Stats Cards */}
      <div className="d-flex  gap-3 mb-4 w-100">
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
        {userAuctions.map((auction: AuctionType) => (
          <div
            key={auction.auctionId}
            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
          >
            <StatsCardList auctionItem={auction} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="container mx-auto p-4 text-center h-100">
      <p className="text-muted">You have not created any auctions yet.</p>
    </div>
  );
}

export default MyAuctions;
