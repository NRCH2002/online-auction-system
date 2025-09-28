import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { UserType } from "../types/UserType";
import { useAuth } from "../context/AuthContext";
import { generateId } from "../services/generateId";

const Signup = () => {
  const { signup, user } = useAuth();
  
  let id = generateId("user_");

  const navigate = useNavigate();
  const [form, setForm] = useState<UserType>({
    userId : id,
    name: "",
    email: "",
    password: "",
    contact: "",
    gender: "male",
    role: "user",
    address: {
      addressline: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
    bids: [],
    payments: [],
    reviews: [],
  });

  const [registerMessage, setRegisterMessage] = useState<string>("Register");
  let [errorMsg, setErrorMsg] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    contactError: "",
    genderError: "",
  });

 const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  if (["city", "state", "country", "pincode", "addressline"].includes(name)) {
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
};


  const handleErrors = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let contactError = "";
    let genderError = "";
    // let addressError: []
    if (!form.name.trim()) {
      nameError = "Name is Required";
    }
    if (!form.email.trim()) {
      emailError = "Email is Required";
    }
    if (!form.password.trim()) {
      passwordError = "Password is Required";
    }
    if (!form.contact.trim()) {
      contactError = "Contact is Required";
    }
    if (!form.gender.trim()) {
      genderError = "Game is Required";
    }
    // if(!form.name.trim()){ nameError="Name is Required"}

    setErrorMsg({
      nameError,
      emailError,
      passwordError,
      contactError,
      genderError,
    });

    return (
      nameError || emailError || passwordError || contactError || genderError
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = handleErrors();
    if (hasErrors) return;

    setRegisterMessage("Registering...");

    let { success, message } = await signup(form);
    if (success) {
      alert("User registered successfully!");
      navigate("/user/dashboard");
      console.log(user, "register");
    } else {
      alert(message || "registeration failed");
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
      <h2 className="text-center mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Full Name */}
          <div className="form-floating mb-3 col-md-6">
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            <label className="ps-4">Full Name:</label>
            {errorMsg.nameError !== "" && (
              <span className="text-danger">{errorMsg.nameError}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-floating mb-3 col-md-6">
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            <label className="ps-4">Email:</label>
            {errorMsg.emailError !== "" && (
              <span className="text-danger">{errorMsg.emailError}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-floating mb-3 col-md-6">
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <label className="ps-4">Password:</label>
            {errorMsg.passwordError !== "" && (
              <span className="text-danger">{errorMsg.passwordError}</span>
            )}
          </div>

          {/* Contact */}
          <div className="mb-3 form-floating col-md-6">
            <input
              type="tel"
              name="contact"
              id="contact"
              className="form-control"
              value={form.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
            />
            <label htmlFor="contact" className="ps-4">
              Contact
            </label>
            {errorMsg.contactError !== "" && (
              <span className="text-danger">{errorMsg.contactError}</span>
            )}
          </div>

          {/* Gender */}
          <div className="mb-3 col-md-6">
            <label>Gender:</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={form.gender === "male"}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label htmlFor="male" className="form-check-label">
                  Male
                </label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={form.gender === "female"}
                  onChange={handleChange}
                  className="form-check-input"
                  required
                />
                <label htmlFor="female" className="form-check-label">
                  Female
                </label>
                {errorMsg.genderError !== "" && (
                  <span className="text-danger">{errorMsg.genderError}</span>
                )}
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  checked={form.gender === "other"}
                  onChange={handleChange}
                  className="form-check-input"
                  required
                />
                <label htmlFor="other" className="form-check-label">
                  Other
                </label>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="">
            <label className="form ">Address:</label>
            <div className="w-100 mb-2">
              <input
                type="text"
                name="addressline"
                className="form-control"
                value={form.address.addressline}
                onChange={handleChange}
                placeholder="addressline"
              />
            </div>
            <div className="d-flex gap-3 mb-2">
              <div className="w-50">
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={form.address.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
              <div className="w-50">
                <input
                  type="number"
                  name="pincode"
                  className="form-control"
                  value={form.address.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  pattern="^[1-9][0-9]{5}$"
                  min={100000}
                  max={999999}
                />
              </div>
            </div>
            <div className="d-flex gap-3 mb-2">
              <select
                className="form-select"
                name="country"
                value={form.address.country}
                onChange={handleChange}
              >
                <option value="" hidden>
                  Select Country
                </option>
                <option value="india">India</option>
                <option value="usa">Usa</option>
              </select>
              <select
                className="form-select"
                name="state"
                value={form.address.state}
                onChange={handleChange}
              >
                <option value="" hidden>
                  Select State
                </option>
                <option value="andra">Andra Pradesh</option>
                <option value="telangana">Telangana</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-orange col-md-6 col-12">
              {registerMessage}
            </button>
          </div>

          {/* Navigate to Login */}
          <p className="grey-text mt-2 text-center">
            Already have an account?
            <button
              type="button"
              style={{ background: "white", color: "var(--orange)" }}
              className="btn p-0 mb-1 ms-2 fw-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
