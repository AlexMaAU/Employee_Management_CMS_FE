import { useEffect, useState } from "react";
import DepartmentType from "../interface/DepartmentType";
import axios from "axios";
import { REST_BASE_API_DEPARTMENT } from "../constants/constants";
import DepartmentItem from "./DepartmentItem";
import { useNavigate } from "react-router-dom";

const DepartmentList = () => {
  const [departments, setDepartments] = useState<DepartmentType[]>([]);

  const navigator = useNavigate();

  useEffect(() => {
    try {
      async function getAllDepartments() {
        const response = await axios.get(REST_BASE_API_DEPARTMENT);
        setDepartments(response.data.departmentDTOList);
      }
      getAllDepartments();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function addNewDepartment() {
    navigator("/add-department");
  }

  return (
    <div className="container">
      <h2 className="text-center mt-4">List of Departments</h2>
      <button className="btn btn-primary mb-2" onClick={addNewDepartment}>
        Add Department
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department: DepartmentType) => (
            <DepartmentItem
              key={department.id}
              department={department}
              departments={departments}
              setDepartments={setDepartments}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;

