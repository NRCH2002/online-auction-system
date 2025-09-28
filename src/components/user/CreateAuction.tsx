import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { AuctionType } from "../../types/AuctionType";
import { useAuctionContext } from "../../context/AuctionContext";
import { generateId } from "../../services/generateId";

const CreateAuction = () => {
  const { user } = useAuth();
  const { createNewAuction } = useAuctionContext();
  let id = generateId("auction_");

  const navigate = useNavigate();
  const [auctionForm, setAuctionForm] = useState<AuctionType>({
    auctionId: id,
    userId: user?.userId ? user.userId : "",
    imageUrl:
      "https://images.unsplash.com/photo-1648564585735-19491888545c?...",
    title: "",
    category: "",
    description: "",
    startingPrice: "",
    currentBid: 0,
    bidCount: 0,
    productQuality: "excellent",
    duration: "",
    status: "active",
    createdAt: new Date().toLocaleTimeString(),
  });

  const [submitMessage, setSubmitMessage] = useState<string>("Create");
  const [errorMsg, setErrorMsg] = useState({
    titleError: "",
    imageUrlError: "",
    startingPriceError: "",
    durationError: "",
    categoryError: "",
    productQualityError: "",
    descriptionError: "",
  });

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;

    setAuctionForm({ ...auctionForm, [name]: value });

    setErrorMsg({ ...errorMsg, [`${name}Error`]: "" });
  };

  const handleErrors = () => {
    let titleError = "";
    let imageUrlError = "";
    let startingPriceError = "";
    let durationError = "";
    let categoryError = "";
    let productQualityError = "";
    let descriptionError = "";

    if (!auctionForm.title.trim()) titleError = "Title is required";
    if (!auctionForm.imageUrl.trim()) imageUrlError = "Image URL is required";
    if (!auctionForm.startingPrice.trim())
      startingPriceError = "Starting price is required";
    if (!auctionForm.duration.trim()) durationError = "Time Duration is required";
    if (!auctionForm.category.trim()) categoryError = "Category is required";
    if (!auctionForm.productQuality.trim())
      productQualityError = "Product quality is required";
    if (!auctionForm.description.trim())
      descriptionError = "Description is required";

    setErrorMsg({
      titleError,
      imageUrlError,
      startingPriceError,
      durationError,
      categoryError,
      productQualityError,
      descriptionError,
    });

    return !!(
      titleError ||
      imageUrlError ||
      startingPriceError ||
      durationError ||
      categoryError ||
      productQualityError ||
      descriptionError
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = handleErrors();
    if (hasErrors) return;

    setSubmitMessage("Creating Auction...");

    let { status, message } = await createNewAuction(auctionForm);
    if (status) {
      alert(message);
      navigate("/user/myauction");
    } else {
      alert(message);
    }
  };

  return (
    <div
      style={{
        minWidth: "400px",
        maxWidth: "80vw",
        margin: "1rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 className="text-center mb-4">Create Auction</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Product Name / Title */}
          <div className="form-floating mb-3 col-md-6">
            <input
              type="text"
              name="title"
              className="form-control"
              value={auctionForm.title}
              onChange={handleInput}
              placeholder="Product Name"
            />
            <label className="ps-4">Product Name/Title</label>
            {errorMsg.titleError !== "" && (
              <span className="text-danger">{errorMsg.titleError}</span>
            )}
          </div>

          {/* Image */}
          <div className="form-floating mb-3 col-md-6">
            <input
              type="text"
              name="imageUrl"
              className="form-control"
              value={auctionForm.imageUrl}
              onChange={handleInput}
              placeholder="Product Image"
            />
            <label className="ps-4">Product Image:</label>
            {errorMsg.imageUrlError !== "" && (
              <span className="text-danger">{errorMsg.imageUrlError}</span>
            )}
          </div>

          {/* Starting Price */}
          <div className="form-floating mb-3 col-md-6">
            <input
              type="number"
              name="startingPrice"
              className="form-control"
              value={auctionForm.startingPrice}
              onChange={handleInput}
              placeholder="Enter your password"
              min={1000}
            />
            <label className="ps-4">Starting Price:</label>
            {errorMsg.startingPriceError !== "" && (
              <span className="text-danger">{errorMsg.startingPriceError}</span>
            )}
          </div>

          {/* Time */}
          <div className="mb-3 form-floating col-md-6">
            <input
              type="number"
              name="duration"
              id="time"
              className="form-control"
              value={auctionForm.duration}
              onChange={handleInput}
              placeholder="Time"
              min={10}
              max={48}
            />
            <label htmlFor="contact" className="ps-4">
              Duration:
            </label>
            {errorMsg.durationError !== "" && (
              <span className="text-danger">{errorMsg.durationError}</span>
            )}
          </div>

          {/* Product Quailty */}
          <div className="mb-3 col-md-6">
            <label>Product Quality:</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  type="radio"
                  id="excellent"
                  name="productQuality"
                  value="excellent"
                  checked={auctionForm.productQuality === "excellent"}
                  onChange={handleInput}
                  className="form-check-input"
                />
                <label htmlFor="excellent" className="form-check-label">
                  Excellent
                </label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  id="good"
                  name="productQuality"
                  value="good"
                  checked={auctionForm.productQuality === "good"}
                  onChange={handleInput}
                  className="form-check-input"
                />
                <label htmlFor="good" className="form-check-label">
                  Good
                </label>
              </div>
            </div>
            {errorMsg.productQualityError !== "" && (
              <span className="text-danger">
                {errorMsg.productQualityError}
              </span>
            )}
          </div>

          <div className=" mb-3 col-md-6">
            <label className="form-label">Category:</label>
            <select
              className="form-select"
              name="category"
              value={auctionForm.category}
              onChange={handleInput}
            >
              <option hidden>Select Category</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Watches">Watches</option>
              <option value="Art & Collectibles">Art & Collectibles</option>
              <option value="Fashion & Accessories">
                Fashion & Accessories
              </option>
              <option value="Electronics & Gadgets">
                Electronics & Gadgets
              </option>
              <option value="Home & Furniture">Home & Furniture</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Luxury Items">Luxury Items</option>
            </select>
            {errorMsg.categoryError !== "" && (
              <span className="text-danger">{errorMsg.categoryError}</span>
            )}
          </div>

          <div className=" mb-3 col-md-12">
            <label className="">Description:</label>
            <textarea
              name="description"
              id="description"
              value={auctionForm.description}
              className="form-control"
              cols={30}
              rows={5}
              onChange={handleInput}
            ></textarea>
            {errorMsg.descriptionError !== "" && (
              <span className="text-danger">{errorMsg.descriptionError}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-orange col-md-6 col-12">
              {submitMessage}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAuction;
