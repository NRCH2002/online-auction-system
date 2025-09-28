import "../styles/statsCardList.css";
import type { AuctionType } from "../types/AuctionType";

type StatsCardListProps = {
  auctionItem: AuctionType;
};

function StatsCardList({ auctionItem }: StatsCardListProps) {
  return (
    <div className="card shadow-sm border-0 mb-4 me-3" style={{ borderRadius: "1rem", overflow: "hidden", maxWidth: "90vw", margin: "auto" }}>
      <div className="row g-0 d-flex">
        {/* Image Section */}
        <div className="col-md-2 d-md-flex d-none position-relative">
          <img
            src={auctionItem.imageUrl}
            alt="Vintage Leica Camera"
            className="w-100 h-100"
            // style={{ objectFit: "cover", width:"", height: "" }}
          />
          <span className="badge label">{auctionItem.category}</span>
        </div>

        {/* Content Section */}
        <div className="col-md-8">
          <div className="card-body p-4 d-flex flex-column">
            {/* Header */}
            <div className="row mb-4">
              <div className="col-6 border-end pe-3">
                <h3 className="card-title mb-2">{auctionItem.title}</h3>
                <p className="card-text mb-0 text-muted">{auctionItem.description}</p>
              </div>
              <div className="col-6 ps-3">
                <p className="card-text mb-0 text-muted">Current Bid</p>
                <h5 className="mb-0 fw-bold" style={{ color: "#198754" }}>
                  ${auctionItem.currentBid}
                </h5>
              </div>
            </div>

            {/* Price Section */}
            <div className="row mb-1">
              <div className="col-6 border-end pe-3">
                <div className="row text-muted" style={{ fontSize: "0.9rem" }}>
                  <div className="col-6 d-flex align-items-center">
                    <i className="bi bi-people-fill me-2" style={{ fontSize: "1rem" }}></i>
                    <span>{auctionItem.bidCount}</span>
                  </div>
                  <div className="col-6 d-flex align-items-center">
                    <i className="bi bi-clock-fill me-2" style={{ fontSize: "1rem" }}></i>
                    <span>{auctionItem.time}</span>
                  </div>
                </div>
              </div>
              <div className="col-6 ps-3">
                <p className="card-text mb-0 text-muted">Starting Price</p>
                <h5 className="mb-0 fw-bold" style={{ color: "#495057" }}>
                  ${auctionItem.startingPrice}
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="col-md-2 d-flex flex-column align-items-center justify-content-center">
          <button
            className="btn btn-outline-primary ps-3 pe-5 py-2 d-flex align-items-center justify-content-center mb-2"
            style={{
              borderRadius: "8px",
              borderWidth: "2px",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            <i className="bi bi-pencil-square me-2"></i>Edit
          </button>
          <button
            className="btn btn-outline-danger px-4 py-2 d-flex align-items-center justify-content-center"
            style={{
              borderRadius: "8px",
              borderWidth: "2px",
              fontWeight: "600",
              fontSize: "0.9rem",
            }}
          >
            <i className="bi bi-trash me-2"></i>Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatsCardList;
