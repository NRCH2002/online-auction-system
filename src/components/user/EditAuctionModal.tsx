import type { AuctionType } from "../../types/AuctionType";

type EditAuctionModalProps = {
  auctionItem: AuctionType;
  modalId: string;            
};

function EditAuctionModal({ auctionItem, modalId }: EditAuctionModalProps) {
  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex={-1}
      aria-labelledby={`${modalId}-label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${modalId}-label`}>
              Edit Auction
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Example form fields */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                defaultValue={auctionItem.title}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                defaultValue={auctionItem.description}
                className="form-control"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAuctionModal;
