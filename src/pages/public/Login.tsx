import { useState, type ChangeEvent, type FormEvent } from "react";
import type { UserType } from "../../types/UserType";
import { getUsers } from "../../api/getUsers";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type InputUserType = { email: string; password: string };

function Login() {
  let navigate = useNavigate();
  let { login, user } = useAuth();

  let [inputUser, setInputUser] = useState<InputUserType>({
    email: "",
    password: "",
  });

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputUser({ ...inputUser, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let users = await getUsers();
    const validUser = users.find(
      (u: UserType) =>
        u.email === inputUser.email && u.password === inputUser.password
    );

    if (validUser) {
      login(validUser);
      alert(`Welcome ${validUser.name}`);
      console.log(user);
      if (validUser.role === "user") {
        navigate("/user/dashboard");
      } else if (validUser.role === "admin") navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
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
      <h2 className="text-center">Login to Continue</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email Address:</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={inputUser.email}
            onChange={handleInput}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={inputUser.password}
            onChange={handleInput}
            placeholder="Enter your password"
            required
          />
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
