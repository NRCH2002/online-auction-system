
import "../../styles/statsCardList.css";
import type { AuctionType } from "../../types/AuctionType";
import { useState, type ChangeEvent } from "react";
import type { PaymentType } from "../../types/PaymentType";

type StatsCardListProps = {
  auctionItem: AuctionType;
  payment: PaymentType;
};

function StatsCardListForPayments({ auctionItem, payment }: StatsCardListProps) {

  const [showModal, setShowModal] = useState(false);

  const [paymentData, setPaymentData] = useState({
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    walletId: "",
    upiId: "",
  });

  // Platform charge (5% of bid amount)
  const platformChargeRate = 0.01;
  const platformCharge = Number(payment.amount) * platformChargeRate;
  const totalPayable = Number(payment.amount) + platformCharge;

  const inputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const confirmPayment = async () => {
    setShowModal(false);
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
              payment.status.toLowerCase() === "pending"
                ? "bg-warning"
                : payment.status.toLowerCase() === "completed"
                ? "bg-success"
                : "bg-danger"
            }`}
            style={{ fontSize: "0.75rem" }}
          >
            {payment.status}
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

          {payment.status === "pending" && (
            <>
              <div className="row mb-4">
                <div className="col-6 text-center">
                  <i className="bi bi-trophy text-warning fs-1"></i>
                </div>
                <div className="col-6">
                  <p
                    className="text-muted text-uppercase fw-medium mb-1"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                  >
                    Your Bidding
                  </p>
                  <p className="fs-4 fw-bold text-dark mb-0">
                    ${payment.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="fw-bold text-warning mb-2 text-center">
                Congrats! You Won 🎉 Make Payment
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="btn btn-outline-success w-100 fw-semibold border-2 rounded-3 py-2 px-3"
              >
                <i className="bi bi-currency-dollar"></i> Payment
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Make Payment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                {/* Payment Summary */}
                <div className="mb-3">
                  <h6>Payment Summary</h6>
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Bid Amount:</span>
                      <strong>${payment.amount.toLocaleString()}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Platform Charges (1%):</span>
                      <strong >${platformCharge.toFixed(2)}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Total Payable:</span>
                      <strong className="text-orange">${totalPayable.toFixed(2)}</strong>
                    </li>
                  </ul>
                </div>

                {/* Payment Methods */}
                <div className="mb-3">
                  <label className="form-label">Payment Method</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentData.paymentMethod === "card"}
                        onChange={inputHandle}
                      />
                      <label className="form-check-label">
                        <i className="bi bi-credit-card"></i> Card
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value="wallet"
                        checked={paymentData.paymentMethod === "wallet"}
                        onChange={inputHandle}
                      />
                      <label className="form-check-label">
                        <i className="bi bi-wallet2"></i> Wallet
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentData.paymentMethod === "upi"}
                        onChange={inputHandle}
                      />
                      <label className="form-check-label">
                        <i className="bi bi-currency-exchange"></i> UPI
                      </label>
                    </div>
                  </div>
                </div>

                {/* Conditionally Render Fields */}
                {paymentData.paymentMethod === "card" && (
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      className="form-control"
                      placeholder="Enter card number"
                      value={paymentData.cardNumber}
                      onChange={inputHandle}
                    />
                    <label className="form-label mt-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiry"
                      className="form-control"
                      placeholder="MM/YY"
                      value={paymentData.expiry}
                      onChange={inputHandle}
                    />
                  </div>
                )}

                {paymentData.paymentMethod === "wallet" && (
                  <div className="mb-3">
                    <label className="form-label">Wallet ID / Email</label>
                    <input
                      type="text"
                      name="walletId"
                      className="form-control"
                      placeholder="Enter wallet ID"
                      value={paymentData.walletId}
                      onChange={inputHandle}
                    />
                  </div>
                )}

                {paymentData.paymentMethod === "upi" && (
                  <div className="mb-3">
                    <label className="form-label">UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      className="form-control"
                      placeholder="example@upi"
                      value={paymentData.upiId}
                      onChange={inputHandle}
                    />
                  </div>
                )}
              </div>

              {/* Footer with only Confirm Payment */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-orange"
                  onClick={confirmPayment}
                >
                  Confirm Payment
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

export default StatsCardListForPayments;
