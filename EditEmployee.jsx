import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(employees[id]);
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    employees[id] = formData;
    localStorage.setItem("employees", JSON.stringify(employees));
    navigate("/view");
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Edit Employee</h3>

        <form onSubmit={handleUpdate}>
          <input className="form-control mb-2" value={formData?.employeeId || ""} readOnly />
          <input className="form-control mb-2" value={formData?.name || ""} readOnly />
          <input className="form-control mb-2" name="email" value={formData?.email || ""} onChange={handleChange} />
          <input className="form-control mb-2" name="designation" value={formData?.designation || ""} onChange={handleChange} />
          <input className="form-control mb-2" name="salary" value={formData?.salary || ""} onChange={handleChange} />

          <div className="text-center">
            <button className="btn btn-primary me-2">Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/view")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
