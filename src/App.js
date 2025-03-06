import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import ReviewerDashboard from "./pages/ReviewerDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard"

export default function App() {
  return (
    <Router>
      <Header />
      <div className="flex-grow-1 pt-5">
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Student-specific Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Route>

        {/* Reviewer-specific Routes */}
        <Route element={<ProtectedRoute allowedRoles={['reviewer']} />}>
          <Route path="/reviewer-dashboard" element={<ReviewerDashboard />} />
          <Route path="/reviewer-analytics" element={<OrganizerDashboard/>} />
        </Route>
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  );
}
