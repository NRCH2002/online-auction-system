import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { UserInputType } from "../types/UserInputType";

function Login() {
  let navigate = useNavigate();
  let { login, user } = useAuth(); //stores user after validate

  let [userInput, setUserInput] = useState<UserInputType>({
    role: "user",
    email: "",
    password: "",
  });
  let [errorMsg, setErrorMsg] = useState({ emailError: "", passwordError: "" });

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    setErrorMsg({ ...errorMsg, [`${name}Error`]: "" });

  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let emailError = "";
    let passwordError = "";
    if (!userInput.email.trim())  emailError = "Email is required";
    if (!userInput.password.trim()) passwordError = "Password is required";
     
    setErrorMsg({ emailError, passwordError });
 
    if (emailError || passwordError) return;
   
    let { success } = await login(userInput);
    if (success) {
      if (user?.role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } else {
      alert(`Invalid credentials`);
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
      <h2 className="text-center mb-5">Login to Continue</h2>
      <form onSubmit={handleLogin}>
        <div className="">
          <label>Select your Role:</label>
          <div className="d-flex ms-2 gap-2 mb-2">
            <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="user"
              value="user"
              onChange={handleInput}
              checked={userInput.role === "user"}
            />
            <label className="form-check-label" htmlFor="user">
              User
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="admin"
              value="admin"
              onChange={handleInput}
              checked={userInput.role === "admin"}
            />
            <label className="form-check-label" htmlFor="admin">
              Admin
            </label>
          </div>
          </div>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="email"
            className="form-control form-control-sm"
            value={userInput.email}
            onChange={handleInput}
            placeholder="Enter your email"
          />
          <label>Enter your email</label>
          {errorMsg.emailError !== "" && (
            <span className="text-danger">{errorMsg.emailError}</span>
          )}
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            value={userInput.password}
            onChange={handleInput}
            placeholder="Enter your password"
          />
          <label>Enter your password</label>
          {errorMsg.passwordError !== "" && (
            <span className="text-danger">{errorMsg.passwordError}</span>
          )}
        </div>

        <button type="submit" className="btn btn-orange w-100">
          Login
        </button>

        {/* Navigate to Login */}
        <p className="grey-text mt-2 text-center">
          Don't have an account?
          <button
            type="button"
            style={{ background: "white", color: "var(--orange)" }}
            className="btn p-0 mb-1 ms-2 fw-bold"
            onClick={() => navigate("/signup")}
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
