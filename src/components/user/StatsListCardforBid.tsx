import { useAuctionContext } from "../../context/AuctionContext";
import { useAuth } from "../../context/AuthContext";
import { deleteBid } from "../../services/deleteBid";
import { useCountDown } from "../../services/useCountDown";
import "../../styles/statsCardList.css";
import type { AuctionType } from "../../types/AuctionType";
import type { BidType } from "../../types/BidType";
import { useNavigate } from "react-router-dom";

type StatsCardListProps = {
  auctionItem: AuctionType;
  bid: BidType;
};

function StatsListCardForBids({ auctionItem, bid }: StatsCardListProps) {
  const { auctionItems, setAuctionItems } = useAuctionContext();
  const { user, setUser } = useAuth();
  const timeLeft = useCountDown(auctionItem.endTime)
  const navigate = useNavigate();

  const deleteBid1 = async () => {
    if (!user) return;

    const res = await deleteBid(user, bid);
    if (res) {
      const { updatedUser, updatedAuction } = res;

      setUser(updatedUser);

      const updatedAuctions = auctionItems.map((auction: AuctionType) =>
        auction.id === updatedAuction.id ? updatedAuction : auction
      );

      setAuctionItems(updatedAuctions);
    }
  };

  return (
    <div>
      <div
        className="card border-1 rounded-4 shadow-sm overflow-hidden mx-auto"
        style={{ maxWidth: "24rem",minHeight:"540px" }}
      >
        <div className="position-relative" style={{ height: "12rem" }}>
          <img
            src={auctionItem.imageUrl}
            alt={auctionItem.title}
            className="card-img-top w-100 h-100 object-fit-cover"
          />
          <span
            className={`badge position-absolute top-0 start-0 m-3 rounded-pill px-2 py-1 fw-semibold ${
              bid.status.toLowerCase() === "ongoing"
                ? "bg-warning"
                : bid.status.toLowerCase() === "won"
                ? "bg-success"
                : "bg-danger"
            }`}
            style={{ fontSize: "0.75rem" }}
          >
            {bid.status}
          </span>
          <span
            className="badge bg-orange text-white position-absolute top-0 end-0 m-3 rounded-pill px-2 py-1 fw-semibold"
            style={{ fontSize: "0.75rem" }}
          >
            {auctionItem.category}
          </span>
        </div>

        <div className="card-body p-4">
          <h3 className="card-title fw-semibold fs-5 text-dark mb-3 lh-base text-truncate-2">
            {auctionItem.title}
          </h3>

          <p className="card-text text-muted mb-3 small">
            {auctionItem.description}
          </p>

          {bid.status !== "won" && (
            <div className="d-flex align-items-center justify-content-evenly mb-3 text-muted small">
              <div className="d-flex align-items-center me-4">
                <i className="bi bi-people-fill me-2"></i>
                <span>{auctionItem.bidCount} bids</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-clock-fill me-2"></i>
                <span>{timeLeft}</span>
              </div>
            </div>
          )}

          {bid.status !== "won" && (
            <div className="row mb-4">
              <div className="col-6">
                <p
                  className="text-muted text-uppercase fw-medium mb-1"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                >
                  CURRENT BID
                </p>
                <p className="fs-4 fw-bold text-success mb-0">
                  ${auctionItem.currentBid.toLocaleString()}
                </p>
              </div>
              <div className="col-6">
                <p
                  className="text-muted text-uppercase fw-medium mb-1"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                >
                  Your Bidding
                </p>
                <p className="fs-4 fw-bold text-dark mb-0">
                  ${bid.bidAmount.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {bid.status === "discarded" && (
            <div className="d-flex gap-2">
              <button
                onClick={deleteBid1}
                className="btn btn-outline-danger flex-fill fw-semibold border-2 rounded-3 py-2 px-3"
              >
                <i className="bi bi-trash me-2"></i>
                Delete
              </button>
            </div>
          )}

          {bid.status == "won" && (
            <div className="row mb-4">
              <div className="col-6">
                <p
                  className="text-muted text-uppercase fw-medium mb-1"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                >
                  <i className="bi bi-trophy text-warning fs-1"></i>
                </p>
              </div>
              <div className="col-6">
                <p
                  className="text-muted text-uppercase fw-medium mb-1"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                >
                  Your Bidding
                </p>
                <p className="fs-4 fw-bold text-dark mb-0">
                  ${bid.bidAmount.toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {bid.status == "won" && (
            <p className=" fw-bold text-warning mb-2 text-center">
              Congrats!, You Won Make Payment
            </p>
          )}

          {bid.status == "won" && (
            <div className="">
              <button
                onClick={() => navigate("/user/mypayments")}
                className="btn btn-outline-success w-100 flex-fill fw-semibold border-2 rounded-3 py-2 px-3"
              >
                <i className="bi bi-currency-dollar"></i>
                Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatsListCardForBids;
