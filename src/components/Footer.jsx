import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";

export default function Footer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in on component mount
    useEffect(() => {
        // Here you would typically check for a token in localStorage
        // or use your authentication context
        const userToken = localStorage.getItem('userToken');
        setIsLoggedIn(!!userToken);

        // For demo purposes, you can simulate a logged in user by uncommenting:
        // setIsLoggedIn(true);
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        // Redirect to home page or login page as needed
        // history.push('/login');
    };
    return (
        <motion.footer
            className="text-white py-5"
            style={{
                background: "linear-gradient(to right, #3050A4, #70A4FF)",
                marginTop: "auto",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="container">
                {isLoggedIn && (<><div className="row">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                            <div
                                className="me-3 d-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                                    color: "white"
                                }}
                            >
                                <span className="fw-bold">C</span>
                            </div>
                            <span className="fs-4 fw-bold">CRAB.AI</span>
                        </div>
                        <p className="mt-3 text-center text-md-start opacity-75">
                            AI-powered academic paper reviews that streamline the review process and provide comprehensive feedback.
                        </p>
                    </div>

                    <div className="col-md-6 text-center text-md-end">
                        <h5 className="mb-3 fw-bold">Connect With Us</h5>
                        <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-3">
                            <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} className="text-white fs-4">
                                <FaTwitter />
                            </motion.a>
                            <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} className="text-white fs-4">
                                <FaLinkedin />
                            </motion.a>
                            <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} className="text-white fs-4">
                                <FaGithub />
                            </motion.a>
                        </div>
                        <p className="mt-3 opacity-75">
                            Contact us at: <a href="mailto:info@crab.ai" className="text-white">info@crab.ai</a>
                        </p>
                    </div>
                </div>
                    <div className="border-top border-white">
                    </div>
                </>)}

                <div className="mt-4  pt-4 opacity-75 text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} CRAB.AI - Critical Review and Analysis for Brilliant Papers. All Rights Reserved.</p>
                    <p className="small mt-2">
                        Powered by LLMs
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}