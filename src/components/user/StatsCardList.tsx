import "../../styles/statsCardList.css";
import type { AuctionType } from "../../types/AuctionType";
import { deleteAuction } from "../../services/deleteAuction";
import { useAuctionContext } from "../../context/AuctionContext";
import { useAuth } from "../../context/AuthContext";
import { useState, type ChangeEvent } from "react";
import { patchAuction } from "../../services/patchAuction";

type StatsCardListProps = {
  auctionItem: AuctionType;
};

function StatsCardList({ auctionItem }: StatsCardListProps) {
  const { auctionItems, setAuctionItems } = useAuctionContext();
  const { user, setUser } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    description: auctionItem.description,
    startingPrice: auctionItem.startingPrice,
    duration: auctionItem.duration,
  });

  const deleteAuction1 = async () => {
    const res = await deleteAuction(auctionItem);
    if (res) {
      setAuctionItems(
        auctionItems.filter((a) => a.auctionId !== auctionItem.auctionId)
      );
      if (user) {
        const filteredBid = user.bids.filter(
          (b) => b.auctionId !== auctionItem.auctionId
        );
        setUser({ ...user, bids: filteredBid });
      }
    } else {
      alert("Failed to delete auction");
    }
  };

  
  const inputHandle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
     setEditData(prev => ({
    ...prev,
    [name]: name === "description" ? value : Number(value)
  }));
  };

  const saveChanges = async () => {
    const updatedItem = { ...auctionItem, ...editData };
    let res = await patchAuction(updatedItem)
    if(res){
      let updatedAuctions = auctionItems.map((a) =>a.auctionId === auctionItem.auctionId ? updatedItem : a)
    setAuctionItems(updatedAuctions);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div
        className="card border-1 rounded-4 shadow-sm overflow-hidden mx-auto"
        style={{ maxWidth: "24rem" }}
      >
        <div className="position-relative" style={{ height: "12rem" }}>
          <img
            src={auctionItem.imageUrl}
            alt={auctionItem.title}
            className="card-img-top w-100 h-100 object-fit-cover"
          />
          <span
            className={`badge position-absolute top-0 start-0 m-3 rounded-pill px-2 py-1 fw-semibold ${
              auctionItem.status.toLowerCase() === "sold"
                ? "bg-success":auctionItem.status.toLowerCase() === "unsold"
                ? "bg-danger"
                : "bg-warning"
            }`}
            style={{ fontSize: "0.75rem" }}
          >
            {auctionItem.status}
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

          <div className="d-flex align-items-center mb-3 text-muted small">
            <div className="d-flex align-items-center me-4">
              <i className="bi bi-people-fill me-2"></i>
              <span>{auctionItem.bidCount} bids</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-clock-fill me-2"></i>
              <span>{auctionItem.duration}h remaining</span>
            </div>
          </div>

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
                STARTING PRICE
              </p>
              <p className="fs-4 fw-bold text-dark mb-0">
                ${auctionItem.startingPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {auctionItem.status!=="sold"&&<div className="d-flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-outline-primary flex-fill fw-semibold border-2 rounded-3 py-2 px-3"
            >
              <i className="bi bi-pencil-square me-2"></i>
              Edit
            </button>
            <button
              onClick={deleteAuction1}
              className="btn btn-outline-danger flex-fill fw-semibold border-2 rounded-3 py-2 px-3"
            >
              <i className="bi bi-trash me-2"></i>
              Delete
            </button>
          </div>}
          {auctionItem.status==="sold"&&<div className="d-flex gap-2">
            <button
              onClick={()=>{alert("Payment Request sent to Bidder ")}}
              className="btn btn-outline-warning flex-fill fw-semibold border-2 rounded-3 py-2 px-3"
            >
              <i className="bi bi-wallet2 pe-1"></i>  
               Make Payment Request
            </button>
          </div>}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Auction</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={editData.description}
                    onChange={inputHandle}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Starting Price</label>
                  <input
                    type="number"
                    name="startingPrice"
                    className="form-control"
                    value={editData.startingPrice}
                    onChange={inputHandle}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration (hours)</label>
                  <input
                    type="number"
                    name="duration"
                    className="form-control"
                    value={editData.duration}
                    onChange={inputHandle}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveChanges}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default StatsCardList;
