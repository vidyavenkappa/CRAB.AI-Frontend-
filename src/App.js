import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import UploadPaper from "./pages/UploadPaper";
import OrganizerDashboard from "./pages/OrganizerDashboard"

export default function App() {
  return (
    <Router>
      <Header />
      <div className="flex-grow-1 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/reviewer-dashboard" element={<ReviewerDashboard />} />
          <Route path="/upload-paper" element={<UploadPaper />} />
          <Route path="/reviewer-analytics" element={<OrganizerDashboard/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
