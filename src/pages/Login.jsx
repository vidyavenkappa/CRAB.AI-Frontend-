import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import { motion } from "framer-motion";
import "aos/dist/aos.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 800 });
        document.title = "Login - CRAB.AI";
    }, []);


    const handleLogin = async (e) => {
        e.preventDefault();

        // Trim and validate input
        const trimmedUsername = username.trim();

        // Comprehensive input validation
        if (!trimmedUsername) {
            setError("Username cannot be empty");
            return;
        }

        if (!password) {
            setError("Password cannot be empty");
            return;
        }

        // Reset previous errors and set loading state
        setError("");
        setIsLoading(true);

        try {
            // Detailed axios configuration
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/users/login`,
                {
                    username: trimmedUsername,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                }
            );

            // Store authentication details
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("userToken", response.data.access_token);
            localStorage.setItem("username", response.data.username);

            // Navigate based on user role
            switch (response.data.role) {
                case "student":
                    navigate("/student-dashboard");
                    break;
                case "reviewer":
                    navigate("/reviewer-dashboard");
                    break;
                default:
                    setError("Unknown user role");
            }
        } catch (error) {
            // Comprehensive error handling
            if (error.response) {
                // The request was made and the server responded with a status code
                setError(
                    error.response.data.detail ||
                    error.response.data.message ||
                    "Invalid credentials. Please try again."
                );
            } else if (error.request) {
                // The request was made but no response was received
                setError("No response from server. Please check your connection.");
            } else {
                // Something happened in setting up the request
                setError("An unexpected error occurred. Please try again.");
            }

            // Optional: log error for debugging
            console.error("Login error:", error);
        } finally {
            // Always reset loading state
            setIsLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center py-5"
            style={{
                background: "linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%)",
                backgroundSize: "cover"
            }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7 col-sm-9">
                        <div className="card border-0 shadow-lg overflow-hidden"
                            data-aos="fade-up"
                            style={{ borderRadius: "16px" }}>

                            {/* Card header with gradient */}
                            <div className="text-center text-white py-4"
                                style={{
                                    background: "linear-gradient(to right, #3050A4, #70A4FF)",
                                    borderTopLeftRadius: "16px",
                                    borderTopRightRadius: "16px"
                                }}>
                                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: "rgba(255, 255, 255, 0.2)"
                                    }}>
                                    <span className="fs-2 fw-bold">C</span>
                                </div>
                                <h2 className="mb-0 mt-2">Welcome Back</h2>
                                <p className="opacity-75 mb-0">Sign in to your account</p>
                            </div>

                            {/* Card body */}
                            <div className="card-body p-4 p-lg-5">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleLogin}>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="form-label text-muted small fw-bold">USERNAME</label>
                                        <motion.input
                                            whileFocus={{ scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            type="text"
                                            id="username"
                                            className="form-control form-control-lg bg-light border-0"
                                            style={{ borderRadius: "10px" }}
                                            placeholder="Enter your username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between">
                                            <label htmlFor="password" className="form-label text-muted small fw-bold">PASSWORD</label>
                                            <Link to="/forgot-password" className="small text-decoration-none" style={{ color: "#3050A4" }}>
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <motion.input
                                            whileFocus={{ scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            type="password"
                                            id="password"
                                            className="form-control form-control-lg bg-light border-0"
                                            style={{ borderRadius: "10px" }}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-me" />
                                            <label className="form-check-label text-muted" htmlFor="remember-me">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        type="submit"
                                        className="btn btn-lg w-100 text-white mb-4"
                                        style={{
                                            background: "linear-gradient(to right, #3050A4, #70A4FF)",
                                            borderRadius: "10px",
                                            boxShadow: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)"
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="d-flex align-items-center justify-content-center">
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Signing in...
                                            </div>
                                        ) : (
                                            "Sign In"
                                        )}
                                    </motion.button>
                                </form>

                                <div className="text-center">
                                    <p className="mb-0 text-muted">
                                        Don't have an account? <Link to="/signup" style={{ color: "#3050A4", textDecoration: "none", fontWeight: "500" }}>Sign up</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}