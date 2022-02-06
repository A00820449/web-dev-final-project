import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFound from './pages/NotFound';

const apiURL = new URL(process.env.REACT_APP_API_BASE_URL || "http://localhost/");

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home apiURL={apiURL} />} />
        <Route path="/index.html" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login apiURL={apiURL} />} />
        <Route path="/register" element={<Register apiURL={apiURL} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
