import DepartmentComponent from "./components/DepartmentComponent";
import DepartmentList from "./components/DepartmentList";
import EmployeeComponent from "./components/EmployeeComponent";
import EmployeeList from "./components/EmployeeList";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<EmployeeComponent />} />
          <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/add-department" element={<DepartmentComponent />} />
          <Route
            path="/edit-department/:id"
            element={<DepartmentComponent />}
          />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;

