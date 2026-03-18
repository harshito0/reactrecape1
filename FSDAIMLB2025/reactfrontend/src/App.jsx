import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./component/Login";
import Register from "./component/Register";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* default page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
