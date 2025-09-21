import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { UserType } from "../../types/UserType";
import { getUsers } from "../../api/getUsers";
import { postUsers } from "../../api/postUsers";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<UserType>({
    name: "",
    email: "",
    password: "",
    contact: "",
    gender: "",
    dob: "",
    role: "user",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  let signup = "Register";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signup = "Signing Up...";

    let users = (await getUsers()) || [];
    const nameExists = users.some((u: UserType) => u.email === form.email);

    if (nameExists)
      alert(`hey! ${form.name} Your Email already registered. Please login`);
    else {
      const postUser = await postUsers(form);
      if (postUser) {
        alert("User registered successfully!");
        navigate("/login");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 className="text-center mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-3">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Contact */}
        <div className="mb-3">
          <label>Contact:</label>
          <input
            type="tel"
            name="contact"
            className="form-control"
            value={form.contact}
            onChange={handleChange}
            placeholder="Enter your contact number"
            required
          />
        </div>

       <div className="d-flex justify-content-between">
         {/* Gender */}
        <div className="mb-3">
          <label>Gender:</label>
          <div className="form-check">
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={form.gender === "Male"}
              onChange={handleChange}
              className="form-check-input"
              required
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
              value="Female"
              checked={form.gender === "Female"}
              onChange={handleChange}
              className="form-check-input"
              required
            />
            <label htmlFor="female" className="form-check-label">
              Female
            </label>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={form.dob}
            onChange={handleChange}
            required
          />
        </div>
       </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-orange w-100">
          {signup}
        </button>

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

      </form>
    </div>
  );
};

export default Signup;
