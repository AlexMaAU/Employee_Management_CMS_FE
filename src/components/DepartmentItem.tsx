import { useNavigate } from "react-router-dom";
import DepartmentType from "../interface/DepartmentType";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { REST_BASE_API_DEPARTMENT } from "../constants/constants";

interface DepartmentItemProp {
  department: DepartmentType;
  departments: DepartmentType[];
  setDepartments: Dispatch<SetStateAction<DepartmentType[]>>;
}

const DepartmentItem = ({
  department,
  departments,
  setDepartments,
}: DepartmentItemProp) => {
  const navigator = useNavigate();

  function updateDepartment(id: number) {
    navigator(`/edit-department/${id}`);
  }

  async function deleteDepartment(id: number) {
    await axios.delete(`${REST_BASE_API_DEPARTMENT}/${id}`);
    const updatedDepartments = departments.filter(
      (department) => department.id !== id
    );
    setDepartments(updatedDepartments);
  }

  return (
    <tr>
      <td>{department.id}</td>
      <td>{department.departmentName}</td>
      <td>{department.departmentDescription}</td>
      <td>
        <button
          className="btn btn-info"
          onClick={() => updateDepartment(department.id)}
        >
          Update
        </button>
        <button
          className="btn btn-danger ms-2"
          onClick={() => deleteDepartment(department.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DepartmentItem;

