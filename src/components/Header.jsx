import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);



    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        setIsLoggedIn(userToken);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        navigate('/'); // Navigate to home page after logout
    };

    // Check if current page is home page
    const isHomePage = location.pathname === '/';

    return (
        <motion.nav
            className="navbar navbar-expand-lg navbar-light fixed-top"
            style={{
                background: "linear-gradient(to right, #1e3c72, #2a5298)", // Darker blue gradient
                padding: "15px 0",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="container">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="d-flex align-items-center"
                >
                    <Link to={isLoggedIn && localStorage.hasOwnProperty('role') ? (localStorage.getItem('role') == "student" ? "/student-dashboard" : (localStorage.getItem('role') == "reviewer" ? "/reviewer-dashboard" : "/")) : "/"} className="navbar-brand fw-bold fs-4 d-flex align-items-center">
                        <div
                            className="me-2 d-flex align-items-center justify-content-center rounded-circle"
                            style={{
                                width: "36px",
                                height: "36px",
                                backgroundColor: "#4361ee",
                                color: "white"
                            }}
                        >
                            <span className="fw-bold">C</span>
                        </div>
                        <span>
                            <span style={{ color: "white" }}>CRAB</span>
                            <span style={{ color: "#f0f7ff" }}>.AI</span>
                        </span>
                    </Link>
                </motion.div>

                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={() => setIsNavbarOpen(!isNavbarOpen)}
                    style={{ border: 'none', outline: 'none', color: 'white' }} // Remove default border
                >
                    <span className="navbar-toggler-icon" style={{
                        filter: 'invert(1)',  // Makes icon white
                        WebkitFilter: 'invert(1)', // Safari compatibility
                    }} ></span>
                </button>

                <div className={`collapse navbar-collapse justify-content-end ${isNavbarOpen ? "show" : ""}`} id="navbarNav">


                    {/* <div className="collapse navbar-collapse justify-content-end" id="navbarNav"> */}
                    <ul className="navbar-nav align-items-center">
                        {/* Only show Home and Upload Paper when logged in */}
                        {isLoggedIn && (
                            <>
                                {localStorage.hasOwnProperty('role') && localStorage.getItem('role') == "student" && <motion.li className="nav-item mx-2" whileHover={{ scale: 1.1 }}>
                                    <Link to="/student-dashboard" className="nav-link text-white fw-medium">Dashboard</Link>
                                </motion.li>}
                                {localStorage.hasOwnProperty('role') && localStorage.getItem('role') == "reviewer" && <><motion.li className="nav-item mx-2" whileHover={{ scale: 1.1 }}>
                                    <Link to="/reviewer-dashboard" className="nav-link text-white fw-medium">Dashboard</Link>
                                </motion.li>
                                    <motion.li className="nav-item mx-2" whileHover={{ scale: 1.1 }}>
                                        <Link to="/reviewer-analytics" className="nav-link text-white fw-medium">Analytics</Link>
                                    </motion.li>

                                </>}


                            </>
                        )}

                        {/* Conditional rendering based on auth state and page */}
                        {!isLoggedIn ? (
                            isHomePage && (
                                <>
                                    <motion.li className="nav-item mx-2" whileHover={{ scale: 1.1 }}>
                                        <Link to="/login" className="nav-link text-white fw-medium">Login</Link>
                                    </motion.li>
                                    <motion.li className="nav-item ms-3" whileHover={{ scale: 1.05 }}>
                                        <Link
                                            to="/signup"
                                            className="btn px-4 py-2 text-white rounded-pill shadow-sm"
                                            style={{
                                                background: "linear-gradient(to right, #4361ee, #3a0ca3)",
                                                transition: "all 0.3s ease",
                                                border: "2px solid white", // Added white border
                                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" // Enhanced shadow
                                            }}
                                        >
                                            Get Started
                                        </Link>
                                    </motion.li>
                                </>
                            )
                        ) : (
                            <motion.li className="nav-item ms-3" whileHover={{ scale: 1.05 }}>
                                <button
                                    onClick={handleLogout}
                                    className="btn px-4 py-2 text-white rounded-pill shadow-sm"
                                    style={{
                                        background: "linear-gradient(to right, #4361ee, #3a0ca3)",
                                        transition: "all 0.3s ease",
                                        border: "2px solid white", // Added white border
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" // Enhanced shadow
                                    }}
                                >
                                    Logout
                                </button>
                            </motion.li>
                        )}
                    </ul>
                </div>
            </div>
        </motion.nav>
    );
}