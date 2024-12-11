import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import Header from "./pages/Header/Header";
import FrontPage from "./pages/FrontPage/frontpage";
import Signup from "./pages/Register/Signup";
import Login from "./pages/Register/Login";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import CreateProducts from "./pages/AdminDashboard/CreateProducts";
import UpdateProducts from "./pages/AdminDashboard/UpdateProducts ";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin" element={<AdminDashboard />}></Route>
          <Route path="/create" element={<CreateProducts />}></Route>
          <Route path="/update/:id" element={<UpdateProducts />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
