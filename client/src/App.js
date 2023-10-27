import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YearSelection from "./component/YearSelection";
import MonthSelection from "./component/MonthSelection";
import DataEntry from "./component/DataEntry";
import AllData from "./component/AllData";
import Home from "./component/Home";
import EditStaff from "./component/EditStaff";
import Staff from "./component/Staff";
import AdminDash from "./component/AdminDash";
import ViewData from "./component/ViewData";
import Register from "./component/Register";
import SignIn from "./component/SignIn";
import StaffDash from "./component/StaffDash";
import StaffSalary from "./component/StaffSalary";
const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/admin/:year/:month" element={<AdminDash/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/year" element={<YearSelection/>} />
        <Route path="/staffDash/:id" element={<StaffDash/>} />
        <Route path="/staffSalary/staffDash/:id" element={<StaffSalary/>} />
        <Route path="/all/admin/:year/:month" element={<AllData/>} />
        <Route path="/searchStaff/admin/:year/:month" element={<Staff/>} />
        <Route path="/edit/:id/:year/:month" element={<EditStaff/>} />
        <Route path="/months/:year" element={<MonthSelection />} />
        <Route path="/data-entry/admin/:year/:month" element={<DataEntry />} />
        <Route path="/ViewData/:id/:year/:month" element={<ViewData/>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
