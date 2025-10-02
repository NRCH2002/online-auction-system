import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center"
         style={{ minHeight: "80vh", padding: "2rem" }}>
      <h1 className="display-1 text-orange mb-3">404</h1>
      <h3 className="mb-3">Oops! Page Not Found</h3>
      <p className="text-muted mb-4">
        The page you are looking for doesn't exist.
      </p>
      <button
        className="btn btn-orange px-4 py-2 rounded-pill"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
