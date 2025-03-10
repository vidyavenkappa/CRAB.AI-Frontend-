import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import { motion } from "framer-motion";
import "aos/dist/aos.css";

export default function Signup() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("student");
    const [conference, setConference] = useState("");
    const [conferences, setConferences] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // useEffect(() => {
    //     AOS.init({ duration: 800 });
    //     document.title = "Sign Up - CRAB.AI";
    // }, []);
    useEffect(() => {
        AOS.init({ duration: 800 });
        document.title = "Sign Up - CRAB.AI";

        // Fetch conferences from API
        axios.get(`${process.env.REACT_APP_API_URL}/conference/get-list`)
            .then(response => {
                setConferences(response.data);
            })
            .catch(error => {
                console.error("Error fetching conferences:", error);
            });
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validation
        if (!name || !username || !password || !confirmPassword) {
            setError("Please fill in all required fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (role === "reviewer" && !conference) {
            setError("Please select a conference");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const payload = {
                name: name.trim(),
                username: username.trim(),
                password: password,
                role: role, // Ensure this matches exactly with backend enum
                conference: role === "reviewer" ? conference : null
            };

            console.log("Signup Payload:", payload); // Log payload for debugging

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            navigate("/login", {
                state: {
                    message: "Account created successfully! Please log in.",
                    type: "success"
                }
            });
        } catch (error) {
            const errorMessage = error.response?.data?.detail ||
                error.response?.data?.message ||
                "Sign up failed. Please try again.";

            console.error("Full Error Response:", error.response);
            setError(errorMessage);
        } finally {
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
                    <div className="col-lg-6 col-md-8 col-sm-10">
                        <div className="card border-0 shadow-lg overflow-hidden"
                            data-aos="fade-up"
                            style={{ borderRadius: "16px" }}>

                            {/* Card header with gradient - Updated to blue theme */}
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
                                <h2 className="mb-0 mt-2">Create Account</h2>
                                <p className="opacity-75 mb-0">Join CRAB.AI and review papers with AI</p>
                            </div>

                            {/* Card body */}
                            <div className="card-body p-4 p-lg-5">
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSignup}>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="form-label text-muted small fw-bold">NAME</label>
                                        <motion.input
                                            whileFocus={{ scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            type="text"
                                            id="name"
                                            className="form-control form-control-lg bg-light border-0"
                                            style={{ borderRadius: "10px" }}
                                            placeholder="Enter your Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="form-label text-muted small fw-bold">USERNAME</label>
                                        <motion.input
                                            whileFocus={{ scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            type="text"
                                            id="username"
                                            className="form-control form-control-lg bg-light border-0"
                                            style={{ borderRadius: "10px" }}
                                            placeholder="Choose a username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label text-muted small fw-bold">PASSWORD</label>
                                        <motion.input
                                            whileFocus={{ scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            type="password"
                                            id="password"
                                            className="form-control form-control-lg bg-light border-0"
                                            style={{ borderRadius: "10px" }}
                                            placeholder="Create a password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <small className="text-muted">Must be at least 6 characters long</small>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="confirm-password" className="form-label text-muted small fw-bold">CONFIRM PASSWORD</label>
                                        <motion.input
                                            whileFocus={{ scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            type="password"
                                            id="confirm-password"
                                            className="form-control form-control-lg bg-light border-0"
                                            style={{ borderRadius: "10px" }}
                                            placeholder="Confirm your password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="role" className="form-label text-muted small fw-bold">I AM A</label>
                                        <motion.select
                                            whileFocus={{ scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            id="role"
                                            className="form-select form-select-lg bg-light border-0"
                                            style={{ borderRadius: "10px" }}
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="student">Student / Author</option>
                                            <option value="reviewer">Reviewer</option>
                                        </motion.select>
                                    </div>

                                    {role === "reviewer" && (
                                        <motion.div
                                            className="mb-4"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <label htmlFor="conference" className="form-label text-muted small fw-bold">CONFERENCE</label>
                                            <motion.select
                                                whileFocus={{ scale: 1.01 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                id="conference"
                                                className="form-select form-select-lg bg-light border-0"
                                                style={{ borderRadius: "10px" }}
                                                value={conference}
                                                onChange={(e) => setConference(e.target.value)}
                                                required={role === "reviewer"}
                                            >
                                                <option value="">Select Conference</option>
                                                {conferences.map(conf => (
                                                    <option key={conf.value} value={conf.value}>
                                                        {conf.label}
                                                    </option>
                                                ))}
                                            </motion.select>
                                        </motion.div>
                                    )}

                                    <div className="mb-4">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="terms" required />
                                            <label className="form-check-label text-muted" htmlFor="terms">
                                                I agree to the <a href="#" style={{ color: "#3050A4" }}>Terms of Service</a> and <a href="#" style={{ color: "#3050A4" }}>Privacy Policy</a>
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
                                                Creating Account...
                                            </div>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </motion.button>
                                </form>

                                <div className="text-center">
                                    <p className="mb-0 text-muted">
                                        Already have an account? <Link to="/login" style={{ color: "#3050A4", textDecoration: "none", fontWeight: "500" }}>Sign in</Link>
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