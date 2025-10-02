import type { AuctionType } from "../../types/AuctionType";
import { useAuth } from "../../context/AuthContext";
import { useAuctionContext } from "../../context/AuctionContext";
import { StatsCard } from "../StatsCard";
import StatsCardList from "./StatsCardList";
import { useNavigate } from "react-router-dom";

function MyAuctions() {
  let { user } = useAuth();
  let { auctionItems } = useAuctionContext();
  let navigate = useNavigate();
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
      <div className="d-flex justify-content-evenly gap-1 mb-4 w-100">
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
    <div className="d-flex justify-content-center align-items-center flex-column text-center"
     style={{ minHeight: "60vh" }}>
  <div className="card shadow-sm p-4 border-0" style={{ maxWidth: "500px" }}>
    <div className="card-body">
      <i className="bi bi-box-seam text-orange fs-1 mb-3"></i>
      <h5 className="fw-bold mb-2">No Auctions Yet</h5>
      <p className="text-muted mb-3">
        You have not created any auctions yet. Start by creating your first auction.
      </p>
      <button className="btn btn-orange rounded-pill" onClick={()=>navigate("/user/createauction")}>
        Create Auction
      </button>
    </div>
  </div>
</div>

  );
}

export default MyAuctions;
