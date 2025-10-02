import { useAuth } from "../../context/AuthContext";
import { useAuctionContext } from "../../context/AuctionContext";
import { StatsCard } from "../StatsCard";
import StatsCardListForPayments from "./StatsCardListForPayments";
import { useNavigate } from "react-router-dom";

function MyPayments() {
  let { user } = useAuth();
    let payments = user?.payments ?? [];
  let navigate = useNavigate();

  let { auctionItems } = useAuctionContext();

  let statsData = [
    { title: "Total Payments", count: payments.length },
    {
      title: "Pending Payments",
      count: payments.filter((a) => a.status === "pending").length,
    },
    {
      title: "Completed Payments",
      count: payments.filter((a) => a.status === "completed").length,
    },
    {
      title: "Received Payments",
      count: payments.filter((a) => a.status === "failed").length,
    },
  ];

  return payments.length > 0 ? (
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
      {payments.map((payment) => {
        let auction = auctionItems.find(
          (auction) => auction.auctionId === payment.auctionId
        );
        if (!auction) return null;

        return (
          <div
            key={auction.auctionId}
            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
          >
            <StatsCardListForPayments auctionItem={auction} payment={payment} />
          </div>
        );
      })}
    </div>
  ) : (
    <div
  className="d-flex justify-content-center align-items-center flex-column text-center"
  style={{ minHeight: "60vh" }}
>
  <div className="card shadow-sm p-4 border-0" style={{ maxWidth: "500px" }}>
    <div className="card-body">
      <i className="bi bi-trophy text-orange fs-1 mb-3"></i>
      <h5 className="fw-bold mb-2">No Auctions Won Yet</h5>
      <p className="text-muted mb-3">
        You have not won any auctions yet. Explore available auctions and place your bids.
      </p>
      <button className="btn btn-orange px-4 py-2 rounded-pill" onClick={()=>navigate("/user/dashboard")}>
        Browse Auctions
      </button>
    </div>
  </div>
</div>

  );
}



export default MyPayments;
