import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const apiURL = new URL(process.env.REACT_APP_API_BASE_URL || "http://localhost/");

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home apiURL={apiURL} />} />
        <Route path="/login" element={<Login apiURL={apiURL} />} />
      </Routes>
    </Router>
  );
}
