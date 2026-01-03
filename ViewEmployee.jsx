import { Link } from "react-router-dom";
import { useState } from "react";

function ViewEmployee() {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];


  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const deleteEmployee = (index) => {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    window.location.reload();
  };

  let newEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "az") {
    newEmployees.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "za") {
    newEmployees.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">Employee List</h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="az">Name A–Z</option>
            <option value="za">Name Z–A</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-secondary">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {newEmployees.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No employee found
              </td>
            </tr>
          )}

          {newEmployees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.employeeId}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>
                <Link
                  to={`/edit/${index}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteEmployee(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEmployee;

