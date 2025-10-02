import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { UserType } from "../types/UserType";
import { useAuth } from "../context/AuthContext";
import { generateId } from "../services/generateId";
import { country } from "../data/country";

const Signup = () => {
  const { signup, user } = useAuth();

  let id = generateId("user_");

  const navigate = useNavigate();
  const [form, setForm] = useState<UserType>({
    userId: id,
    name: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
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
    addressError: {
      addressline: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  let [selectedCountryStates, setSelectedCountryStates] = useState<string[]>([]);

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
    if (name === "country") {
      if (value === "india") {
        setSelectedCountryStates(country[0].states);
      } else if (value === "usa") {
        setSelectedCountryStates(country[1].states);
      } else {
        setSelectedCountryStates([]);
      }
    }

    // Clear error message for the field being edited

    if (["addressline", "city", "state", "pincode", "country"].includes(name)) {
      setErrorMsg({
        ...errorMsg,
        addressError: { ...errorMsg.addressError, [`${name}`]: "" },
      });
    } 
    else{setErrorMsg({ ...errorMsg, [`${name}Error`]: "" });}
    
  };

  const handleErrors = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let contactError = "";
    let genderError = "";
    let addressError: {
      addressline: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    } = { addressline: "", city: "", state: "", pincode: "", country: "" };
    if (!form.name.trim()) {
      nameError = "Name is Required";
    } else if (form.name.trim() && form.name.trim().length < 4) {
      nameError = "Name must be at least 4 characters long";
    }

    if (!form.email.trim()) {
      emailError = "Email is Required";
    } else if (
      form.email.trim() &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    ) {
      emailError = "Invalid email address format";
    }

    if (!form.password.trim()) {
      passwordError = "Password is Required";
    } else if (form.password.trim() && form.password.trim().length < 6) {
      passwordError = "Password must be at least 6 characters long";
    }

    if (!form.contact.trim()) {
      contactError = "Contact is Required";
    } else if (
      (form.contact.trim() && form.contact.trim().length < 10) ||
      form.contact.trim().length > 10
    ) {
      contactError = "Contact must be 10 digits long";
    }

    if (!form.address.addressline.trim()) {
      addressError.addressline = "Address line is Required";
    }
    if (!form.address.city.trim()) {
      addressError.city = "City is Required";
    }
    if (!form.address.state.trim()) {
      addressError.state = "State is Required";
    }
    if (!form.address.pincode) {
      addressError.pincode = "Pincode is Required";
    } else if (
      form.address.pincode &&
      (Number(form.address.pincode) < 100000 ||
        Number(form.address.pincode) > 999999)
    ) {
      addressError.pincode = "Pincode must be 6 digits long";
    }
    if (!form.address.country.trim()) {
      addressError.country = "Country is Required";
    }
    if (!form.gender.trim()) {
      genderError = "Gender is Required";
    }

    setErrorMsg({
      nameError,
      emailError,
      passwordError,
      contactError,
      genderError,
      addressError,
    });

    return (
      nameError ||
      emailError ||
      passwordError ||
      contactError ||
      genderError ||
      addressError.addressline ||
      addressError.city ||
      addressError.state ||
      addressError.pincode ||
      addressError.country
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

        borderRadius: "8px",
      }}
      className="bg-white shadow"
    >
      <h4 className="text-center mb-4 fw-bold">Create an Account</h4>
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
              // value={form.email}
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
                  
                />
                <label htmlFor="female" className="form-check-label">
                  Female
                </label>
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
                  
                />
                <label htmlFor="other" className="form-check-label">
                  Other
                </label>
              </div>

            </div>
            {errorMsg.genderError !== "" && (
                  <span className="text-danger">{errorMsg.genderError}</span>
                )}
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
              {errorMsg.addressError.addressline !== "" && (
                <span className="text-danger">
                  {errorMsg.addressError.addressline}
                </span>
              )}
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
                {errorMsg.addressError.city !== "" && (
                  <span className="text-danger">
                    {errorMsg.addressError.city}
                  </span>
                )}
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
                {errorMsg.addressError.pincode !== "" && (
                  <span className="text-danger">
                    {errorMsg.addressError.pincode}
                  </span>
                )}
              </div>
            </div>

            <div className="d-flex gap-3 mb-2">
              <div className="w-50">
                <select
                  className="form-select"
                  name="country"
                  value={form.address.country}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    Select Country
                  </option>
                  {country.map((c) => (
                  <option
                    key={c.country}
                    value={c.country.toLowerCase().replace(" ", "")}
                  >
                    {c.country}
                  </option>
                  ))}
                </select>
                {errorMsg.addressError.country !== "" && (
                  <span className="text-danger">
                    {errorMsg.addressError.country}
                  </span>
                )}
              </div>

              <div className="w-50">
                <select
                  className="form-select"
                  name="state"
                  value={form.address.state}
                  onChange={handleChange}
                >
                  <option value="" hidden>
                    Select State
                  </option>
                  {selectedCountryStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errorMsg.addressError.state !== "" && (
                  <span className="text-danger">
                    {errorMsg.addressError.state}
                  </span>
                )}
              </div>
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
