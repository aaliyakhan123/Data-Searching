import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    designation: "",
    department: "",
    status: "",
    salary: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(formData);
    localStorage.setItem("employees", JSON.stringify(employees));
    navigate("/view");
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Add Employee</h3>

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="employeeId" placeholder="Employee ID" onChange={handleChange} required />
          <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} required />
          <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control mb-2" name="designation" placeholder="Designation" onChange={handleChange} />

          <select className="form-select mb-2" name="department" onChange={handleChange}>
            <option value="">Select Department</option>
            <option>HR</option>
            <option>IT</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>

          <select className="form-select mb-2" name="status" onChange={handleChange}>
            <option value="">Select Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <input className="form-control mb-2" type="number" name="salary" placeholder="Salary" onChange={handleChange} />
          <input className="form-control mb-3" type="file" onChange={handleImageChange} />

          <div className="text-center">
            <button className="btn btn-success px-4">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;

