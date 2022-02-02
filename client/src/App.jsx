import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const apiURL = new URL(process.env.REACT_APP_API_BASE_URL || "http://localhost/");

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home apiURL={apiURL} />} />
      </Routes>
    </Router>
  );
}
