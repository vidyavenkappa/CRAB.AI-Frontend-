import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, description, icon, color, delay = 0 }) => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="card h-100 border-0 shadow-sm"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, delay }}
            variants={fadeInUp}
        >
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{title}</h5>
                    <div
                        className="icon-bg rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: `rgba(${color === "primary" ? "67, 97, 238" :
                                color === "success" ? "40, 167, 69" :
                                    color === "warning" ? "255, 193, 7" :
                                        color === "danger" ? "220, 53, 69" :
                                            "67, 97, 238"
                                }, 0.1)`
                        }}
                    >
                        <i className={`fas ${icon} ${color === "primary" ? "text-primary" :
                            color === "success" ? "text-success" :
                                color === "warning" ? "text-warning" :
                                    color === "danger" ? "text-danger" :
                                        "text-primary"
                            }`}></i>
                    </div>
                </div>
                <h2 className="display-6 fw-bold mb-0">{value}</h2>
                <p className="text-muted mb-0">{description}</p>
            </div>
        </motion.div>
    );
};

export default StatCard;