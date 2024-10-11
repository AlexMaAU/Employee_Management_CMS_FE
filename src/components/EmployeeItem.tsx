import { useNavigate } from "react-router-dom";
import EmployeeType from "../interface/EmployeeType";
import axios from "axios";
import { REST_BASE_API_EMPLOYEE } from "../constants/constants";
import { Dispatch, SetStateAction } from "react";

interface EmployeeItemProp {
  employee: EmployeeType;
  employees: EmployeeType[];
  setEmployees: Dispatch<SetStateAction<EmployeeType[]>>;
}

const EmployeeItem = ({
  employee,
  employees,
  setEmployees,
}: EmployeeItemProp) => {
  const navigator = useNavigate();

  function updateEmployee(id: number) {
    navigator(`/edit-employee/${id}`);
  }

  function deleteEmployee(id: number) {
    try {
      async function deleteEmployeeById() {
        await axios.delete(`${REST_BASE_API_EMPLOYEE}/${id}`);
      }
      deleteEmployeeById();

      const updateEmployees = employees.filter(
        (employee) => employee.id !== id
      );
      setEmployees(updateEmployees);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <tr>
      <td>{employee.id}</td>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.email}</td>
      <td>
        <button
          className="btn btn-info"
          onClick={() => updateEmployee(employee.id)}
        >
          Update
        </button>
        <button
          className="btn btn-danger ms-2"
          onClick={() => deleteEmployee(employee.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeItem;

