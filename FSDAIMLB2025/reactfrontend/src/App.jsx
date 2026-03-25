import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import Register from "./component/Register";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./component/Main";
import Dashboard from "./component/Dashboard";
import FetchData from "./component/FetchData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} /> {/* default page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fetchdata" element={<FetchData />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
