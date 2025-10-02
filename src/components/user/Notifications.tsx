
function Notifications() {

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-center">Notifications</h2>
        <div
          className="d-flex justify-content-center align-items-center flex-column text-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="card shadow-sm p-4 border-0" style={{ maxWidth: "500px" }}>
            <div className="card-body">
              <i className="bi bi-bell text-orange fs-1 mb-3"></i>
              <h5 className="fw-bold mb-2">No Notifications Yet</h5>
              <p className="text-muted mb-3">
                You don't have any notifications at the moment. Stay tuned!
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Notifications;
