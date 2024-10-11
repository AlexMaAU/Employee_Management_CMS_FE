import { useEffect, useState } from "react";
import EmployeeItem from "./EmployeeItem";
import axios from "axios";
import { REST_BASE_API_EMPLOYEE } from "../constants/constants";
import EmployeeType from "../interface/EmployeeType";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  const navigator = useNavigate();

  useEffect(() => {
    try {
      async function getAllEmployees() {
        const response = await axios.get(REST_BASE_API_EMPLOYEE);
        setEmployees(response.data.employeeDTOList);
      }
      getAllEmployees();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function addNewEmployee() {
    navigator("/add-employee");
  }

  return (
    <div className="container">
      <h2 className="text-center mt-4">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: EmployeeType) => (
            <EmployeeItem
              key={employee.id}
              employee={employee}
              employees={employees}
              setEmployees={setEmployees}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

