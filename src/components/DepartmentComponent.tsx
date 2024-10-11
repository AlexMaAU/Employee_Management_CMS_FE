import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { REST_BASE_API_DEPARTMENT } from "../constants/constants";
import axios from "axios";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const [errors, setErrors] = useState({
    departmentName: "",
    departmentDescription: "",
  });

  const navigator = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    try {
      if (id) {
        async function getDepartmentById() {
          const response = await axios.get(`${REST_BASE_API_DEPARTMENT}/${id}`);
          const department = response.data;
          setDepartmentName(department.departmentName);
          setDepartmentDescription(department.departmentDescription);
        }
        getDepartmentById();
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  function handleDepartmentName(e: React.ChangeEvent<HTMLInputElement>) {
    setDepartmentName(e.target.value);
  }

  function handleDepartmentDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDepartmentDescription(e.target.value);
  }

  async function saveDepartment(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (validateForm()) {
      if (id) {
        await axios.put(`${REST_BASE_API_DEPARTMENT}/${id}`, {
          departmentName,
          departmentDescription,
        });
      } else {
        await axios.post(REST_BASE_API_DEPARTMENT, {
          departmentName,
          departmentDescription,
        });
      }

      navigator("/departments");
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (departmentName.trim()) {
      errorsCopy.departmentName = "";
    } else {
      errorsCopy.departmentName = "Department name is required";
      valid = false;
    }

    if (departmentDescription.trim()) {
      errorsCopy.departmentDescription = "";
    } else {
      errorsCopy.departmentDescription = "Department description is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card">
          <h2 className="text-center mt-3">
            {id ? "Edit Employee" : "Add Employee"}
          </h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Department Name: </label>
                <input
                  type="text"
                  placeholder="Enter department name"
                  name="departmentName"
                  value={departmentName}
                  className={`form-control ${
                    errors.departmentName ? "is-invalid" : ""
                  }`}
                  onChange={handleDepartmentName}
                ></input>
                {errors.departmentName && (
                  <div className="invalid-feedback">
                    {errors.departmentName}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Department Description: </label>
                <input
                  type="text"
                  placeholder="Enter employee last name"
                  name="departmentDescription"
                  value={departmentDescription}
                  className={`form-control ${
                    errors.departmentDescription ? "is-invalid" : ""
                  }`}
                  onChange={handleDepartmentDescription}
                ></input>
                {errors.departmentDescription && (
                  <div className="invalid-feedback">
                    {errors.departmentDescription}
                  </div>
                )}
              </div>

              <button className="btn btn-success mt-3" onClick={saveDepartment}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;

