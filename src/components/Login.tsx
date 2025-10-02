import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { UserInputType } from "../types/UserInputType";

function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [userInput, setUserInput] = useState<UserInputType>({
    role: "user",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    emailError: "",
    passwordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginMsg, setLoginMsg] = useState<null | string>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
    setErrorMsg({ ...errorMsg, [`${name}Error`]: "" });
    setLoginMsg(null);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let emailError = "";
    let passwordError = "";

    if (!userInput.email.trim()) emailError = "Email is required";
    if (!userInput.password.trim()) passwordError = "Password is required";

    setErrorMsg({ emailError, passwordError });

    if (emailError || passwordError) return;

    const { success } = await login(userInput);
    if (success) {
      setLoginMsg("Login successful!");
      setTimeout(() => {
        if (user?.role === "user") {
        navigate("/user/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
        setLoginMsg(null);

      }, 1000);
      
    } else {
      setLoginMsg("Login failed. Please check your credentials.");
    }
  };

  console.log("login...")

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem",
        background: "white",
        borderRadius: "8px",
      }}
      className="shadow"
    >
      <h4 className="text-center mb-5 fw-bold">Login to Continue</h4>

      <form onSubmit={handleLogin}>
        {/* <div className="mb-3">
          <label>Select your Role:</label>
          <div className="d-flex ms-2 gap-2">
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
        </div> */}

        <div className="form-floating mb-3">
          <input
            type="text"
            name="email"
            className="form-control form-control-sm"
            value={userInput.email}
            onChange={handleInput}
            placeholder="Enter your email"
          />
          <label htmlFor="email">Enter your email</label>
          {errorMsg.emailError && (
            <span className="text-danger">{errorMsg.emailError}</span>
          )}
        </div>

        <div className="form-floating mb-3 position-relative">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            name="password"
            value={userInput.password}
            onChange={handleInput}
            placeholder="Enter your password"
          />
          <label htmlFor="password">Enter your password</label>
          <div
            className="position-absolute"
            style={{
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
          </div>
          {errorMsg.passwordError && (
            <span className="text-danger">{errorMsg.passwordError}</span>
          )}
        </div>

        {loginMsg && (
        <p
          className={`text-center fw-bold ${
            loginMsg.includes("successful") ? "text-success" : "text-danger"
          }`}
        >
          {loginMsg.includes("successful") ? `Welcome Back! ${user?.name}`: loginMsg}
        </p>
        
      )}
      

        <button type="submit" className="btn btn-orange w-100">
          Login
        </button>

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
