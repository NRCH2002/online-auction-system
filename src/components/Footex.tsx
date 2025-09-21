import { NavLink } from "react-router-dom";
import '../styles/footer.css'

function Footer() {
  return (
    <footer className="bg-dark border-top mt-auto">
      <div className="container py-5">
        <div className="row gy-4">
          {/* Brand + About */}
          <div className="col-12 col-md-6 col-lg-3">
            <h3 className="fs-large fw-bold text-orange">AuctionHub</h3>
            <p className="text-grey fs-small">
              The premier destination for online auctions. Discover unique items,
              place bids, and find treasures from around the world.
            </p>
            <div className="d-flex gap-3 mt-3 footer-social">
              <NavLink to="/"><i className="bi bi-facebook fs-5"></i></NavLink>
              <NavLink to="/"><i className="bi bi-twitter fs-5"></i></NavLink>
              <NavLink to="/"><i className="bi bi-instagram fs-5"></i></NavLink>
              <NavLink to="/"><i className="bi bi-linkedin fs-5"></i></NavLink>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-lg-3">
            <h5 className="fw-medium mb-3 text-white">Quick Links</h5>
            <ul className="list-unstyled fs-small">
              <li><NavLink to="/user/auction" className="text-grey text-decoration-none">Create Auctions</NavLink></li>
              <li><NavLink to="/user/myauction" className="text-grey text-decoration-none">My Auctions</NavLink></li>
              <li><NavLink to="/user/mybids" className="text-grey text-decoration-none">My Bids</NavLink></li>
              <li><NavLink to="/user/mypayments" className="text-grey text-decoration-none">Payments</NavLink></li>
              <li><NavLink to="/user/profile" className="text-grey text-decoration-none">Profile</NavLink></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-lg-3">
            <h5 className="fw-medium mb-3 text-white">Support</h5>
            <ul className="list-unstyled fs-small">
              <li><NavLink to="/" className="text-grey text-decoration-none">Help Center</NavLink></li>
              <li><NavLink to="/" className="text-grey text-decoration-none">Contact Us</NavLink></li>
              <li><NavLink to="/" className="text-grey text-decoration-none">Live Chat</NavLink></li>
              <li><NavLink to="/" className="text-grey text-decoration-none">Shipping Info</NavLink></li>
              <li><NavLink to="/" className="text-grey text-decoration-none">Returns & Refunds</NavLink></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-lg-3">
            <h5 className="fw-medium mb-3 text-white">Stay Updated</h5>
            <p className="text-grey fs-small">Subscribe for auction alerts and exclusive deals.</p>
            <form className="d-flex flex-column gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control fs-small"
              />
              <button className="btn btn-orange w-100">Subscribe</button>
            </form>
            <div className="mt-3 fs-small text-grey">
              <p>📧 support@auctionhub.com</p>
              <p>📞 1-800-AUCTION</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-top py-3">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-grey fs-small mb-2 mb-md-0">
            © {new Date().getFullYear()} AuctionHub. All rights reserved.
          </p>
          <div className="d-flex gap-3 fs-small">
            <NavLink to="/privacy" className="text-grey text-decoration-none">Privacy Policy</NavLink>
            <NavLink to="/terms" className="text-grey text-decoration-none">Terms of Service</NavLink>
            <NavLink to="/cookies" className="text-grey text-decoration-none">Cookie Policy</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
