import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { patchUser } from "../services/patchUser";
import type { UserType } from "../types/UserType";
import {  useState, type ChangeEvent, type FormEvent } from "react";
import type { ProfileType } from "../types/ProfileType";
import { useAuctionContext } from "../context/AuctionContext";
import type { BidType } from "../types/BidType";
import type { AuctionType } from "../types/AuctionType";


 
const Profile = () => {
  const { user, setUser, logout } = useAuth();
  let {auctionItems} = useAuctionContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
 
    const [form, setForm] = useState<ProfileType>({
    name: user?.name || "",
    contact: user?.contact || "",
    gender:user?.gender||"",
    address: {
      addressline: user?.address.addressline || "",
      city: user?.address.city || "",
      state: user?.address.state || "",
      pincode: user?.address.pincode || "",
      country: user?.address.country || "",
    }
  });
  
  const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
      if (name in form.address) {
    setForm({
      ...form,
      address: {
        ...form.address,
        [name]: value,
      },
    });
  } else {
    setForm({ ...form, [name]: value });
  }
  
    
  }
 
  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    const updated = await patchUser(user as UserType, null, form); // auction is optional
    if (updated) {
      setIsEditing(false);
      setUser(updated);
    } else {
      alert("Failed to update profile.");
    }
  };


let activity ={
  auctions:auctionItems.filter((auction:AuctionType)=>auction.userId===user?.userId).length,
  bids:user?.bids.length,
  wonBids:user?.bids.filter((bid:BidType)=>bid.status==="won").length,
  discardedBids:user?.bids.filter((bid:BidType)=>bid.status==="discarded").length

}
 
  return (
    <div>
 
      <form onSubmit={handleEdit}>
        <div className="offcanvas offcanvas-end" data-bs-scroll="true"  data-bs-backdrop="false"  tabIndex={-1} id="profileOffcanvas" aria-labelledby="offcanvasScrollingLabel"
        >
          
 
          <div className="offcanvas-body">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
            <div className=" w-100">
              {/* Profile Pic */}
              <div className="d-flex flex-column gap-2  align-items-center mb-3">
                <div
                  className="rounded-circle bg-orange text-white d-flex justify-content-center align-items-center"
                  style={{
                    width: "90px",
                    height: "90px",
                    fontSize: "50px",
                    fontWeight: "bold",
                  }}
                >
                  <i className="bi bi-person"></i>
                </div>
                <div className="ms-1 text-center">
                  {isEditing ? (<input type="text" className="form-control" value={form.name} name="name" onChange={handleInputChange} />) : (<h5 className="mb-0 fw-bold">{user?.name}</h5>)}
                  <span className="badge bg-warning text-white ">{user?.role}</span>
                </div>
              </div>
 
              {/* Contact Info */}
              <div className="mb-3">
                <p className="mb-1">
                  <strong>Email: </strong> {user?.email}</p>
                <p className="mb-1">
                  <strong>Phone: </strong>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={form.contact}
                      onChange={handleInputChange}
                      name="contact"
                    />
                  ) : (
                    user?.contact
                  )}
                </p>
                <p className="mb-1">
                  <strong>Gender: </strong>
                  {isEditing ? (
                    <select
                      className="form-select"
                      value={form.gender}
                      onChange={handleInputChange}
                      name="gender"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    user?.gender
                  )}
                </p>
              </div>
 
              {/* Rating */}
              <div className="mb-3">
                <strong>Rating:</strong>
                <div className="text-warning">
                  ★★★★☆ <span className="ms-2 text-dark">4.5/5</span>
                </div>
              </div>
 
              {/* Address Info */}
              <div className="mb-3">
                <h6>Address</h6>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Address Line"
                      value={form.address.addressline}
                      onChange={handleInputChange}
                      name="addressline"
                      
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="City"
                      value={form.address.city}
                      onChange={handleInputChange}
                      name="city"
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="State"
                      value={form.address.state}
                      onChange={handleInputChange}
                      name="state"
                      
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Pincode"
                      value={form.address.pincode}
                      onChange={handleInputChange}
                      name="pincode"
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Country"
                      value={form.address.country}
                      onChange={handleInputChange}
                      name="country"
                    />
                  </>
                ) : (
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Addressline </span>
                    <span>{user?.address.addressline}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>City</span>
                    <span>{user?.address.city}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Pincode</span>
                    <span>{user?.address.pincode}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>State</span>
                    <span>{user?.address.state}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Country</span>
                    <span>{user?.address.country}</span>
                  </li>
                  
                </ul>
                )}
              </div>
 
              {/* Activity Stats */}
              {user?.role==="user"&&<div className="mb-3">
                <h6>Activity</h6>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Auctions Created</span>
                    <span>{activity.auctions}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Bids Placed</span>
                    <span>{activity.bids}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between text-success">
                    <span>Won Bids</span>
                    <span>{activity.wonBids}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between text-danger">
                    <span>Discarded Bids</span>
                    <span>{activity.discardedBids}</span>
                  </li>
                </ul>
              </div>}
 
              {/* Edit / Save / Cancel Buttons */}
              <div className="text-center d-flex justify-content-between">
                {isEditing ? (
                  <>
                    <button type="submit" className="btn btn-success">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={() => {
                        setUser(user as UserType);
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
 
export default Profile;


