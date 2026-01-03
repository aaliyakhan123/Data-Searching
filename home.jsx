function Home() {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Employee Dashboard</h3>

      <div className="row">
        {employees.length === 0 && (
          <p className="text-center text-muted">
            No employees added yet
          </p>
        )}

        {employees.map((emp, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <div className="card shadow-sm h-100">
              {emp.image && (
                <img
                  src={emp.image}
                  className="card-img-top"
                  style={{ height: "160px", objectFit: "cover" }}
                />
              )}
              <div className="card-body text-center">
                <h6 className="fw-bold">{emp.name}</h6>
                <p className="mb-1">{emp.designation}</p>
                <span className="badge bg-success">{emp.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
